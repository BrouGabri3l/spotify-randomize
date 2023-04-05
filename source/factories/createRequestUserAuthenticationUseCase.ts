import { TFactory } from "@/core/Factory";
import { AuthenticationRepository } from "@/data/remote/authenticationRepository";
import { RequestUserAuthenticationUseCase } from "@/domain/usecases/requestUserAuthentication";
import { HttpClientAxios } from "@/infra/HttpClientAxios";
import { SpotifyAuthenticationService } from "@/infra/SpotifyAuthenticationService";

export const createRequestUserAuthenticationUseCase: TFactory<RequestUserAuthenticationUseCase> =
  () => {
    const _axiosHttpClient = new HttpClientAxios();
    const _spotifyAuthenticationService = new SpotifyAuthenticationService();
    const _authenticationRepository = new AuthenticationRepository(
      _axiosHttpClient,
      _spotifyAuthenticationService
    );
    return new RequestUserAuthenticationUseCase(_authenticationRepository);
  };
