import { TEither } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";

export interface IUserRepository {
  getProfile: () => Promise<TEither<TApplicationError, void>>;
}
