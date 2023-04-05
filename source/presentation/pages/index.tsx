import { createRequestUserAuthenticationUseCase } from "@/factories/createRequestUserAuthenticationUseCase";

export default function Home(): JSX.Element {
  const requestUserAuth = createRequestUserAuthenticationUseCase();
  const handleClick = async (): Promise<void> => {
    await requestUserAuth.execute();
  };
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#0f1923] flex-col">
      <button onClick={handleClick}>Login com Spotify</button>
    </div>
  );
}
