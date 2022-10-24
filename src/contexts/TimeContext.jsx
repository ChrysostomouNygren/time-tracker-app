import { createContext, useContext, useState, useEffect } from "react";

// creates context:
export const TimeContext = createContext();

// exports provider:
export function TimeProvider({ children }) {
  const [time, setTime] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([])

  return (
    <TimeContext.Provider value={{ time, setTime, projects, setProjects, tasks, setTasks }}>
      {children}
    </TimeContext.Provider>
  );
}

// useContext-hook
export function useTimeContext() {
  const context = useContext(TimeContext);

  if (!context) {
    throw new Error("useTimeContext is outside of TimeProvider");
  }

  return context;
}
