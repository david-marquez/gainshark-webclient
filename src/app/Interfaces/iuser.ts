import { IRole } from './IRole';
import { IProgram } from './IProgram';

export interface IUser {
    Id: number,
    FirstName: string,
    LastName: string,
    UserName: string,
    Email: string,
    Password: string,
    Role: IRole
    Programs: IProgram[]
}
