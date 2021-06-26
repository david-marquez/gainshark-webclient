import { IRole } from './irole';
import { IProgram } from './iprogram';

export interface Iuser {
    Id: number,
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
    Role: IRole
    Programs: IProgram[]
}
