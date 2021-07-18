import { ITokenRequest } from "../Interfaces/ITokenRequest";

export class TokenRequest implements ITokenRequest {
    Username: string;
    Password: string;
    Grant_Type: string;
}