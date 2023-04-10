import { TFactory } from "@/core/Factory";
import { UserRepository } from "@/data/remote/UserRepository";
import { GetProfileUseCase } from "@/domain/usecases/getProfileUseCase";
import { HttpClientAxios } from "@/infra/HttpClientAxios";

export const createGetProfileUseCase: TFactory<GetProfileUseCase> = () => {
  const axiosHttpClient = new HttpClientAxios();
  const userRepository = new UserRepository(axiosHttpClient);

  return new GetProfileUseCase(userRepository);
};
