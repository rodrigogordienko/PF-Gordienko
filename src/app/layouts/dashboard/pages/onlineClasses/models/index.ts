import { ICourse } from "../../courses/models";

export interface IClass {
    id: number;
    teacher: string;
    course: string;
    hour: Date;
}