import { IExercise } from "../Interfaces/IExercise";
import { IMuscleGroup } from "../Interfaces/IMuscleGroup";

export class Exercise implements IExercise {
    Id: number;
    Name: string;
    Description: string;
    Image: Blob;
    Position: number;
    Reps: number;
    Sets: number;
    Duration: number;
    Weight: number;
    MuscleGroups: IMuscleGroup[];
}