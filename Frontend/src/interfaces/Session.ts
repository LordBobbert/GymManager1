export interface Session {
    id: number;
    clientId?: number; // clientId can now be undefined
    sessionName: string;
    date: string;
    duration: string;
    trainerId: number;
    status: string;
  }
  