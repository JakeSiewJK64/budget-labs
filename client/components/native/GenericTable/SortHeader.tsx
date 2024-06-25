import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const SortHeader = ({ headerId }: { headerId: string }) => {
  const param = useSearchParams();
  const sortByDate = param.get("sortBy") === headerId;
  const ascending = param.get("order") === "0";
  const newURL = new URLSearchParams(param.toString());
  const sortButton = () => {
    if (sortByDate) {
      if (ascending) {
        newURL.set("order", "1");
        return [<ArrowUp className="ml-2 h-4 w-4" />, newURL];
      }

      newURL.set("order", "0");
      return [<ArrowDown className="ml-2 h-4 w-4" />, newURL];
    }

    newURL.set("sortBy", headerId);
    return [<ArrowUpDown className="ml-2 h-4 w-4" />, newURL];
  };

  const [icon, url] = sortButton();

  return (
    <Link href={`?${url}`} className="flex flex-row gap-2 align-baseline">
      <p>{`${headerId.charAt(0).toUpperCase()}${headerId.substring(1)}`}</p>
      {icon}
    </Link>
  );
};
