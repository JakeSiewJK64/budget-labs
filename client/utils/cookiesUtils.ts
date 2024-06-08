import { cookies } from "next/headers";

export function setCookie({ key, value }: { key: string; value: string }) {
  cookies().set(key, value);
}

export function getCookie(key: string) {
  return cookies().get(key);
}

export function removeCookie(key: string) {
  return cookies().delete(key);
}
