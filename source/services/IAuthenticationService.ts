export interface IAuthenticationService {
  requestUserAuthURL: () => Promise<string>;
}
