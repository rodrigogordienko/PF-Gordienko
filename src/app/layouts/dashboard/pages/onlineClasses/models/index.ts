import { ICourse } from "../../courses/models";

export interface IClass {
    id: number;
    teacher: string;
    course: string;
    hour: Date;
}

export interface CreateClassPayload {
    teacher: string | null;
    course: string | null;
    hour: Date | null;
  }