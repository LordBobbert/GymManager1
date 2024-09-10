import React, { createContext, useContext, useState } from 'react';
import { fetchClientSchedule } from '../api/scheduleApi';

interface Schedule {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

interface ScheduleContextProps {
    schedules: Schedule[];
    loadClientSchedule: (clientId: number) => Promise<void>;
}

export const ScheduleContext = createContext<any>(null);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    const loadClientSchedule = async (clientId: number) => {
        const data = await fetchClientSchedule(clientId);
        setSchedules(data);
    };

    return (
        <ScheduleContext.Provider value={{ schedules, loadClientSchedule }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error('useSchedule must be used within a ScheduleProvider');
    }
    return context;
};
