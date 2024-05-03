export interface ICourse {
    id: number;
    name: string;
    teacher: string;
    startDate: Date;
}

export interface CreateCoursePayload {
    name: string| null;
    teacher: string | null;
    startDate: Date | null;
  }