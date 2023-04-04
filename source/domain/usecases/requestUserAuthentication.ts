import { TEither } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";
import { IUsecase } from "@/core/Usecase";
import { IAuthenticationRepository } from "../repositories/authenticationRepository";

export class requestUserAuthenticationUseCase implements IUsecase {
  constructor(
    private readonly _authenticationRepository: IAuthenticationRepository
  ) {}

  async execute(): Promise<TEither<TApplicationError, void>> {
    return await this._authenticationRepository.requestUserAuthentication();
  }
}
