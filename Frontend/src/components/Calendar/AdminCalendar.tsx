import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { fetchGymSchedule } from '../../api/scheduleApi';

const localizer = momentLocalizer(moment);

interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    trainer_name: string;
    client_name: string;
}

const AdminCalendar: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const loadSchedule = async () => {
            const schedule = await fetchGymSchedule();
            const formattedEvents = schedule.map((item: any) => ({
                id: item.id,
                title: `${item.client_name} with ${item.trainer_name}`,
                start: new Date(item.start_time),
                end: new Date(item.end_time),
            }));
            setEvents(formattedEvents);
        };

        loadSchedule();
    }, []);

    return (
        <div>
            <h2>Gym Schedule</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
            />
        </div>
    );
};

export default AdminCalendar;
