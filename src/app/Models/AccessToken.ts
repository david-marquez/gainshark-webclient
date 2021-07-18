import { IAccessToken } from "../Interfaces/IAccessToken";

export class AccessToken implements IAccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
}