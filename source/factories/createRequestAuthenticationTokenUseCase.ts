import { TFactory } from "@/core/Factory";
import { AuthenticationRepository } from "@/data/remote/authenticationRepository";
import { RequestAuthenticationTokenUseCase } from "@/domain/usecases/requestAuthenticationTokenUseCase";
import { CookieJsCookieService } from "@/infra/CookieJsCookieService";
import { HttpClientAxios } from "@/infra/HttpClientAxios";
import { SpotifyAuthenticationService } from "@/infra/SpotifyAuthenticationService";
export const createRequestAuthenticationTokenUseCase: TFactory<RequestAuthenticationTokenUseCase> =
  () => {
    const axiosHttpClient = new HttpClientAxios();
    const spotifyAuthenticationService = new SpotifyAuthenticationService();
    const cookieJsCookieService = new CookieJsCookieService();
    const authenticationRepository = new AuthenticationRepository(
      axiosHttpClient,
      spotifyAuthenticationService,
      cookieJsCookieService
    );
    return new RequestAuthenticationTokenUseCase(authenticationRepository);
  };
