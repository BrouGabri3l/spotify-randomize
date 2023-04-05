import { TEither, left, right } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";
import { IAuthenticationRepository } from "@/domain/repositories/authenticationRepository";
import { IAuthenticationService } from "@/services/IAuthenticationService";
import { IHttpClient } from "@/services/http";

export class AuthenticationRepository implements IAuthenticationRepository {
  private readonly _httpClient: IHttpClient;
  private readonly _authenticationService: IAuthenticationService;
  constructor(
    httpClient: IHttpClient,
    authenticationService: IAuthenticationService
  ) {
    this._httpClient = httpClient;
    this._authenticationService = authenticationService;
  }

  async requestAuthenticationToken(): Promise<
    TEither<TApplicationError, void>
  > {
    try {
    } catch (error) {}
  }

  async requestUserAuthentication(): Promise<TEither<TApplicationError, void>> {
    try {
      const requestAuthURl =
        await this._authenticationService.requestUserAuthURL();
      (window as Window).location = requestAuthURl;
      return right(undefined);
    } catch (error) {
      return left(new Error("Error"));
    }
  }
}
