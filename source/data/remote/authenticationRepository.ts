import { TEither, left, right } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";
import { IAuthenticationRepository } from "@/domain/repositories/authenticationRepository";
import { IAuthenticationService } from "@/services/IAuthenticationService";
import { ICookieService } from "@/services/ICookieService";
import { HttpMethod, IHttpClient } from "@/services/http";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

interface IRequestAuthenticationTokenResponse {
  access_token: string;
}

export class AuthenticationRepository implements IAuthenticationRepository {
  private readonly _httpClient: IHttpClient;
  private readonly _authenticationService: IAuthenticationService;
  private readonly _cookieService: ICookieService;
  constructor(
    httpClient: IHttpClient,
    authenticationService: IAuthenticationService,
    cookieService: ICookieService
  ) {
    this._httpClient = httpClient;
    this._authenticationService = authenticationService;
    this._cookieService = cookieService;
  }

  async requestAuthenticationToken(): Promise<
    TEither<TApplicationError, void>
  > {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const codeVerifier = this._cookieService.getCookieByName("code-verifier");
      const payload = new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: REDIRECT_URI as string,
        client_id: CLIENT_ID as string,
        code_verifier: codeVerifier as string,
      });
      const {
        body: { access_token },
      } = await this._httpClient.request<
        IRequestAuthenticationTokenResponse,
        URLSearchParams
      >({
        method: HttpMethod.POST,
        url: "https://accounts.spotify.com/api/token",
        payload,
      });
      this._cookieService.setCookie("access-token", access_token);

      return right(undefined);
    } catch (error) {
      return left(error);
    }
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
