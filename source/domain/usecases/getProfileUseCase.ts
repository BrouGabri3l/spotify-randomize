import { IUsecase } from "@/core/Usecase";
import { IUserRepository } from "../repositories/userRepository";
import { TEither } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";

export class GetProfileUseCase implements IUsecase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(): Promise<TEither<TApplicationError, void>> {
    return await this._userRepository.getProfile();
  }
}
