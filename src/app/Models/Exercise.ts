import { IExercise } from "../Interfaces/IExercise";
import { IMuscleGroup } from "../Interfaces/IMuscleGroup";
import { MuscleGroup } from "./MuscleGroup";

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
    MuscleGroups: IMuscleGroup[] = new Array<MuscleGroup>();
}