export interface Service {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    estimatedDuration: number;
    category: "repair" | "maintenance" | "consultation";
    isActive: boolean;
}
export interface ServiceBooking {
    id: string;
    serviceId: string;
    userId: string;
    date: Date;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    deviceModel: string;
    issueDescription: string;
    createdAt: Date;
}
