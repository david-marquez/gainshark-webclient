import { IRole } from './IRole';
import { IProgram } from './IProgram';

export interface IUser {
    Id: number,
    FirstName: string,
    LastName: string,
    Username: string,
    Email: string,
    Password: string,
    Role: IRole
    Programs: IProgram[]
}
