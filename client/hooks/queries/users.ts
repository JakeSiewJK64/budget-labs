import getAxiosInstance from "@/utils/axiosInstance";

export async function useGetAllUsers() {
  const axios = getAxiosInstance();
  const res = await axios.get("/users").catch((err) => {
    return {
      data: null,
      statusText: "Error",
    };
  });
  const data = res.data;
  const status = res.statusText;

  return { data, status };
}
