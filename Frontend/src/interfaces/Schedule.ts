export interface Schedule {
    id: number;
    title: string;
    start: Date;
    end: Date;
    clientId?: number;
    trainerId?: number;
    description?: string;
}
