import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Session } from '../interfaces/Session';
import { fetchClientSessions } from '../api/sessionApi';

interface SessionContextProps {
  sessions: Session[];
  loadClientSessions: (clientId: number) => Promise<void>;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const loadClientSessions = async (clientId: number) => {
    const data = await fetchClientSessions(clientId);

    // Ensure clientId is properly typed
    const updatedSessions = data.map((session: Session) => ({
      ...session,
      clientId: session.clientId || 0, // Handle cases where clientId is undefined
    }));

    setSessions(updatedSessions);
  };

  return (
    <SessionContext.Provider value={{ sessions, loadClientSessions }}>
      {children}
    </SessionContext.Provider>
  );
};

// Ensure the export of SessionContext
export { SessionContext };

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
