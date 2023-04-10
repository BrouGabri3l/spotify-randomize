import Cookies from "js-cookie";
import { ICookieService } from "./../services/ICookieService";
export class CookieJsCookieService implements ICookieService {
  setCookie(
    name: string,
    value: string | object,
    options?: Cookies.CookieAttributes | undefined
  ): string | undefined {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    return Cookies.set(name, value, options);
  }

  getCookieByName(name: string): string | object | undefined {
    const cookie = Cookies.get(name);
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (err) {
        if (err instanceof SyntaxError) return cookie;
      }
    }
    return undefined;
  }

  removeCookie(
    name: string,
    options?: Cookies.CookieAttributes | undefined
  ): void {
    Cookies.remove(name, options);
  }
}
