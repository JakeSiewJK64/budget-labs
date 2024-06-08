import axios from "axios";
import { getCookie } from "./cookiesUtils";

export default function getAxiosInstance() {
  const bearerToken = getCookie("token");
  const baseURL = process.env["API_URL"];

  return axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
      ...(bearerToken && { Authorization: `Bearer ${bearerToken?.value}` }),
    },
  });
}
