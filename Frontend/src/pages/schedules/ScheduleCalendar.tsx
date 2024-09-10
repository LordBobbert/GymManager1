import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface ScheduleCalendarProps {
    events: Array<{
        title: string;
        start: Date;
        end: Date;
    }>;
}

const localizer = momentLocalizer(moment);

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ events }) => {
    return (
        <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default ScheduleCalendar;
