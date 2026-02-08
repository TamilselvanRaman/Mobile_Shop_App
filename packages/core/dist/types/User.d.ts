export type UserRole = "admin" | "manager" | "technician" | "customer";
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    createdAt: Date;
}
