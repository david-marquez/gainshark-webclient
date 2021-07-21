import { IExercise } from "../Interfaces/IExercise";
import { IProgram } from "../Interfaces/IProgram";
import { Exercise } from "./Exercise";

export class Program implements IProgram {
    Id: number;
    UserId: number;
    Name: string;
    Description: string;
    Exercises: IExercise[] = new Array<Exercise>();
    DateCreated: string;
}