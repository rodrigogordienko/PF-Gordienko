export interface ICourse {
    id: number;
    name: string;
    teacher: string;
    startDate: Date;
    hours: number;
    classes: number;
}

export interface CreateCoursePayload {
    name: string| null;
    teacher: string | null;
    startDate: Date | null;
    hours: number | null;
    classes: number | null;
  }