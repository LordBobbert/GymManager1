export interface Payment {
    id: number;
    clientId: number;
    amount: number;
    date: string;
    status: 'Paid' | 'Pending' | 'Failed';
}

export interface FinancialSummary {
    monthly_total: number;
    yearly_total: number;
}
