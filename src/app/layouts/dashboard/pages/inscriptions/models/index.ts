export interface IInscription {
    id: number;
    user: number;
    course: number;
    student: number;
    hour: Date;
}

export interface CreateInscriptionPayload {
    user: number | null;
    course: number | null;
    student: number | null;
    //hour: Date | null;
  }