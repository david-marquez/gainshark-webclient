import { IProgram } from "../Interfaces/IProgram";
import { IRole } from "../Interfaces/IRole";
import { IUser } from "../Interfaces/IUser";
import { Program } from "./Program";
import { Role } from "./Role";

export class User implements IUser {
    Id: number;
    FirstName: string;
    LastName: string;
    UserName: string;
    Email: string;
    Password: string;
    Role: IRole = new Role();
    Programs: IProgram[] = new Array<Program>();
}