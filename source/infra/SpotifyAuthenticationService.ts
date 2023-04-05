import { IAuthenticationService } from "@/services/IAuthenticationService";
import { generateCodeChallenge } from "@/utils/generateCodeChallenge";
import { generateRandomString } from "@/utils/generateRandomString";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const SCOPE = process.env.NEXT_PUBLIC_SPOTIFY_SCOPE;

const codeVerifier = generateRandomString(128);

export class SpotifyAuthenticationService implements IAuthenticationService {
  async requestUserAuthURL(): Promise<string> {
    const url = generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = generateRandomString(16);
      localStorage.setItem("code-verifier", codeVerifier);
      const params = {
        response_type: "code",
        client_id: CLIENT_ID as string,
        scope: SCOPE as string,
        redirect_uri: REDIRECT_URI as string,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      };
      const searchParams = new URLSearchParams(params);

      return `https://accounts.spotify.com/authorize?${searchParams.toString()}`;
    });
    return await Promise.resolve(url);
  }
}
