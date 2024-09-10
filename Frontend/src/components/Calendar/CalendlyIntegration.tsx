import React from 'react';

const CalendlyIntegration: React.FC = () => {
    return (
        <div>
            <h2>Schedule with Calendly</h2>
            <iframe
                src="https://calendly.com/your-calendly-url"
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
};

export default CalendlyIntegration;
