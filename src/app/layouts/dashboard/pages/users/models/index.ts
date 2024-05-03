export type UserRole = 'ADMIN' | 'TEACHER';

export interface IUser {
    id: number;
    firstname: string;
    secondname: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}

export interface CreateUserPayload {
    firstName: string | null;
    secondname: string | null;
    email: string | null;
    role: UserRole | null;
    createdAt: Date | null;
  }