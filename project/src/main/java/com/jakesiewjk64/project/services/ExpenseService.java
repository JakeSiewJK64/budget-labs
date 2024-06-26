package com.jakesiewjk64.project.services;

import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.project.dto.ExpenseDto;
import com.jakesiewjk64.project.dto.ExpenseStatsDto;
import com.jakesiewjk64.project.dto.TinyExpenseDto;
import com.jakesiewjk64.project.models.Expense;
import com.jakesiewjk64.project.models.User;
import com.jakesiewjk64.project.repositories.IExpenseRepository;
import com.jakesiewjk64.project.repositories.IUserRepository;
import com.jakesiewjk64.project.specifications.ExpenseSpecification;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {

  private final IExpenseRepository expenseRepository;
  private final IUserRepository userRepository;
  private final ModelMapper modelMapper;

  /**
   * 
   * @param user_id
   * @param target_date
   * @param recall_month number of months to recall back to generate past reports
   * @return
   * @throws Exception
   */
  public Map<String, ExpenseStatsDto> getExpenseStats(int userId, LocalDate startDate, LocalDate endDate)
      throws Exception {
    try {
      Specification<Expense> specs = Specification.where(ExpenseSpecification.equalsUserId(userId))
          .and(ExpenseSpecification.withinDateRange(startDate, endDate));

      // Query for expenses
      List<Expense> expenses = expenseRepository.findAll(specs, Sort.by(Sort.Direction.ASC, "date"));

      // Create and process expenses map
      Map<String, ExpenseStatsDto> expenseStatsMap = expenses.stream()
          .collect(Collectors.toMap(
              e -> String.valueOf(e.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue()),
              e -> createExpenseStatsDto(e),
              this::mergeExpenseStats));

      return expenseStatsMap;
    } catch (Exception e) {
      throw new Exception("There was a problem generating statistics. If this error persists please contact support.");
    }
  }

  public void exportExpenseToCSV(int userId, LocalDate startDate, LocalDate endDate, HttpServletResponse response)
      throws Exception {
    try {
      PrintWriter writer = response.getWriter();
      // initialize csv writer
      CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.RFC4180);
      csvPrinter.printRecord("ID", "Description", "Amount", "Date");

      // fetch for expenses
      Specification<Expense> specs = Specification.where(null);
      specs = specs.and(ExpenseSpecification.equalsUserId(Integer.valueOf(userId)));
      specs = specs.and(ExpenseSpecification.withinDateRange(startDate, endDate));

      List<Expense> expenseList = expenseRepository.findAll(specs, Sort.by(Sort.Direction.DESC, "date"));

      // iterate and append expense into csv
      for (Expense e : expenseList) {
        List<String> data = Arrays.asList(
            e.getId().toString(),
            e.getDescription(),
            String.valueOf(e.getAmount()),
            String.valueOf(e.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()));
        csvPrinter.printRecord(data);
      }

      csvPrinter.flush();
      writer.flush();
      csvPrinter.close();
      writer.close();
    } catch (Exception e) {
      throw e;
    }
  }

  public Page<ExpenseDto> getAllExpenseByUserId(Pageable pageable, Map<String, Object> condition) throws Exception {
    try {
      Specification<Expense> specs = Specification.where(null);

      String user_id = String.valueOf(condition.get("user_id"));
      LocalDate start_date = (LocalDate) condition.get("start_date");
      LocalDate end_date = (LocalDate) condition.get("end_date");

      specs = specs.and(ExpenseSpecification.equalsUserId(Integer.valueOf(user_id)));
      specs = specs.and(ExpenseSpecification.withinDateRange(start_date, end_date));

      Page<Expense> expensePage = expenseRepository.findAll(specs, pageable);

      return expensePage.map(expense -> modelMapper.map(expense, ExpenseDto.class));
    } catch (Exception e) {
      throw new Exception("Could not query for expenses. If this error persists please contact support.");
    }
  }

  public Expense postExpense(Expense expense) throws Exception {
    try {
      Optional<User> user = userRepository.findById(expense.getUser_id());

      if (!user.isPresent()) {
        throw new Exception("User with this id not found.");
      }

      return expenseRepository
          .save(Expense
              .builder()
              .id(expense.getId())
              .amount(expense.getAmount())
              .date(expense.getDate())
              .user_id(user.get().getId())
              .description(expense.getDescription())
              .build());
    } catch (Exception e) {
      throw new Exception("Could not save expenses. If this error persists please contact support.");
    }
  }

  public String deleteExpense(String expense_id, int user_id) throws Exception {
    try {
      int affectedRows = expenseRepository.deleteById(UUID.fromString(expense_id), user_id);

      if (affectedRows == 0) {
        throw new NoSuchElementException("Expense with that id does not exist.");
      }

      return expense_id;
    } catch (NoSuchElementException e) {
      throw new Exception("Expense with that id does not exist.");
    } catch (Exception e) {
      throw new Exception("Could not delete expense. If this error persists please contact support.");
    }
  }

  public Expense getExpenseById(String expense_id, int user_id) throws Exception {
    try {
      return expenseRepository.findOne(ExpenseSpecification.getExpenseById(expense_id, user_id)).orElseThrow();
    } catch (NoSuchElementException e) {
      throw new Exception("Expense with that id does not exist.");
    } catch (Exception e) {
      throw new Exception("There was a problem getting the expense. If this error persists please contact support.");
    }
  }

  private ExpenseStatsDto mergeExpenseStats(ExpenseStatsDto dto1, ExpenseStatsDto dto2) {

    List<TinyExpenseDto> expenseArr = new ArrayList<>(dto1.getExpense_arr());
    expenseArr.addAll(dto2.getExpense_arr());

    List<TinyExpenseDto> finalExpenseArr = expenseArr
        .stream()
        .collect(
            Collectors.groupingBy(
                TinyExpenseDto::getDate, // group by date
                Collectors.summingDouble(TinyExpenseDto::getAmount)))
        .entrySet()
        .stream()
        .map(e -> TinyExpenseDto.builder()
            .date(e.getKey())
            .amount(e.getValue()).build())
        .sorted(Comparator.comparing(TinyExpenseDto::getDate))
        .collect(Collectors.toList());

    return ExpenseStatsDto.builder()
        .total_expense(dto1.getTotal_expense() + dto2.getTotal_expense())
        .current_month_highest(Math.max(dto1.getCurrent_month_highest(), dto2.getCurrent_month_highest()))
        .current_day_total(dto1.getCurrent_day_total() + dto2.getCurrent_day_total())
        .current_day_highest(Math.max(dto1.getCurrent_day_highest(), dto2.getCurrent_day_highest()))
        .expense_arr(finalExpenseArr)
        .build();
  }

  private ExpenseStatsDto createExpenseStatsDto(Expense expense) {
    LocalDate systemCurrentDate = LocalDate.now();
    LocalDate expenseDate = expense.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    int currentMonth = systemCurrentDate.getMonthValue();
    int month = expenseDate.getMonthValue();
    List<TinyExpenseDto> expenseList = List.of(
        TinyExpenseDto.builder()
            .date(expenseDate)
            .amount(expense.getAmount())
            .build());
    ExpenseStatsDto.ExpenseStatsDtoBuilder builder = ExpenseStatsDto.builder()
        .total_expense(expense.getAmount())
        .current_month_highest(expense.getAmount())
        .expense_arr(expenseList);

    if (month == currentMonth) {

      if (expenseDate.isEqual(systemCurrentDate)) {
        builder.current_day_total(expense.getAmount())
            .current_day_highest(expense.getAmount());
      }

    } else {
      builder.current_day_total(0)
          .current_day_highest(0);
    }

    return builder.build();
  }
}