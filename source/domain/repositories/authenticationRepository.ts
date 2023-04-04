import { TEither } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";

export interface IAuthenticationRepository {
  requestAuthenticationToken: () => Promise<TEither<TApplicationError, void>>;
  requestUserAuthentication: () => Promise<TEither<TApplicationError, void>>;
}
