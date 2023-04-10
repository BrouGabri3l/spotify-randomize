import { TEither, left, right } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";
import { IUserRepository } from "@/domain/repositories/userRepository";
import { HttpMethod, IHttpClient } from "@/services/http";

export class UserRepository implements IUserRepository {
  private readonly _httpClient: IHttpClient;
  constructor(private readonly httpClient) {
    this._httpClient = httpClient;
  }

  async getProfile(): Promise<TEither<TApplicationError, void>> {
    try {
      const res = await this._httpClient.request({
        method: HttpMethod.GET,
        url: "https://api.spotify.com/v1/me",
      });
      console.log(res);

      return right(undefined);
    } catch (error) {
      return left(error);
    }
  }
}
