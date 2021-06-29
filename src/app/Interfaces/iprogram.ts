import { IExercise } from './IExercise';

export interface IProgram {
    Id: number,
    UserId: number,
    Name: string,
    Description: string,
    Exercises: IExercise[]
}
