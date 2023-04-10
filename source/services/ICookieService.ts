import { cookies } from "js-cookie";
export interface ICookieService {
  setCookie: (
    name: string,
    value: string | object,
    options?: cookies.CookieAttributes | undefined
  ) => string | undefined;
  getCookieByName: (name: string) => string | object | undefined;
  removeCookie: (
    name: string,
    options?: cookies.CookieAttributes | undefined
  ) => void;
}
