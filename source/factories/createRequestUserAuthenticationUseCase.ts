import { TFactory } from "@/core/Factory";
import { AuthenticationRepository } from "@/data/remote/authenticationRepository";
import { RequestUserAuthenticationUseCase } from "@/domain/usecases/requestUserAuthentication";
import { CookieJsCookieService } from "@/infra/CookieJsCookieService";
import { HttpClientAxios } from "@/infra/HttpClientAxios";
import { SpotifyAuthenticationService } from "@/infra/SpotifyAuthenticationService";

export const createRequestUserAuthenticationUseCase: TFactory<RequestUserAuthenticationUseCase> =
  () => {
    const _axiosHttpClient = new HttpClientAxios();
    const _spotifyAuthenticationService = new SpotifyAuthenticationService();
    const cookieJsCookieService = new CookieJsCookieService();
    const _authenticationRepository = new AuthenticationRepository(
      _axiosHttpClient,
      _spotifyAuthenticationService,
      cookieJsCookieService
    );
    return new RequestUserAuthenticationUseCase(_authenticationRepository);
  };
