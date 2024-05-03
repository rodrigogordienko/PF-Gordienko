import { ICourse } from "../../courses/models";

export interface IStudent {
    id: number;
    firstname: string;
    secondname: string;
    email: string;
    //course: string;
    createdAt: Date;
    phone: number;
    address: string;
}

export interface CreateStudentPayload {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    //course: string | null;
    createdAt: Date | null;
    phone: number | null;
    address: string | null;
  }