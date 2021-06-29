import { IMuscleGroup } from "../Interfaces/IMuscleGroup";

export class MuscleGroup implements IMuscleGroup {
    Id: number;
    Name: string;
    Description: string;
    Image: Blob;
}