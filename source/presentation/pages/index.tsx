import { createGetProfileUseCase } from "@/factories/createGetProfileUseCase";
import { createRequestAuthenticationTokenUseCase } from "@/factories/createRequestAuthenticationTokenUseCase";
import { createRequestUserAuthenticationUseCase } from "@/factories/createRequestUserAuthenticationUseCase";

export default function Home(): JSX.Element {
  const requestUserAuth = createRequestUserAuthenticationUseCase();
  const requestAuthenticationToken = createRequestAuthenticationTokenUseCase();
  const getProfile = createGetProfileUseCase();
  const handleClick = async (): Promise<void> => {
    await requestUserAuth.execute();
  };
  const handleToken = async (): Promise<void> => {
    await requestAuthenticationToken.execute();
  };
  const handleProfile = async (): Promise<void> => {
    await getProfile.execute();
  };
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#0f1923] flex-col">
      <button onClick={handleClick}>Login com Spotify</button>
      <button onClick={handleToken}>get Token</button>
      <button onClick={handleProfile}>get Profile</button>
    </div>
  );
}
