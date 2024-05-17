export type UserRole = 'ADMIN' | 'TEACHER' | 'USER';

export interface IUser {
    id: number;
    firstname: string;
    secondname: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    phone: number;
    address: string;
}

export interface CreateUserPayload {
    firstname: string | null;
    secondname: string | null;
    email: string | null;
    role: UserRole | null;
    createdAt: Date | null;
    phone: number;
    address: string;
  }