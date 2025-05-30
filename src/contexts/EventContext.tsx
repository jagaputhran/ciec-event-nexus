
import React, { createContext, useContext, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  budget: number;
  status: string;
  planner: string;
  type: string;
  description?: string;
  priority?: string;
  leader?: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Q4 Leadership Review",
      date: "2024-06-15",
      time: "09:00 AM",
      location: "Main Conference Room",
      attendees: 25,
      budget: 50000,
      status: "upcoming",
      planner: "Elite Events Co.",
      type: "executive"
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      date: "2024-06-20",
      time: "10:00 AM",
      location: "Auditorium A",
      attendees: 150,
      budget: 200000,
      status: "planning",
      planner: "Corporate Events Plus",
      type: "conference"
    },
    {
      id: 3,
      title: "Team Building Workshop",
      date: "2024-06-25",
      time: "02:00 PM",
      location: "Training Center",
      attendees: 50,
      budget: 75000,
      status: "completed",
      planner: "Team Dynamics Ltd.",
      type: "workshop"
    }
  ]);

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
    };
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
