import { ICourse } from "../../courses/models";

export interface IStudent {
    id: number;
    firstname: string;
    secondname: string;
    email: string;
    course: string;
    createdAt: Date;
}