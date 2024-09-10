export interface Assessment {
    id: number;
    type: string; // e.g., "Posture Assessment", "Health Assessment"
    status: string; // e.g., "Completed", "Pending"
    date: string;
    clientId: number;
    trainerId: number;
    notes?: string;
}
