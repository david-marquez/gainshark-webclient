import { IProgram } from "../Interfaces/IProgram";
import { IRole } from "../Interfaces/IRole";
import { IUser } from "../Interfaces/IUser";

export class User implements IUser {
    Id: number;
    FirstName: string;
    LastName: string;
    Username: string;
    Email: string;
    Password: string;
    Role: IRole;
    Programs: IProgram[];
}