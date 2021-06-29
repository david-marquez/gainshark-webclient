import { IMuscleGroup } from './IMuscleGroup';

export interface IExercise {
    Id: number,
    Name: string,
    Description: string,
    Image: Blob,
    Position: number,
    Reps: number,
    Sets: number,
    Duration: number,
    Weight: number,
    MuscleGroups: IMuscleGroup[]
}
