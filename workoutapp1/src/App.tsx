import { useState, useEffect } from 'react';
import { Navbar } from './components/Layout/Navbar';
import { RoutineList } from './components/Routines/RoutineList';
import { ActiveWorkout } from './components/Workout/ActiveWorkout';
import { WorkoutHistory } from './components/History/WorkoutHistory';
import { getActiveSession } from './utils/storage';
import type { WorkoutSession, WorkoutRoutine } from './types/workout';
import './App.css';

export type Page = 'home' | 'active-workout' | 'history';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    // Check for active session on mount
    const session = getActiveSession();
    if (session) {
      setActiveSession(session);
      setCurrentPage('active-workout');
    }
  }, []);

  const handleStartWorkout = (routine?: WorkoutRoutine) => {
    setCurrentPage('active-workout');
    // The ActiveWorkout component will handle starting the workout with the routine
    // We can store the selected routine in sessionStorage temporarily if needed
    if (routine) {
      sessionStorage.setItem('selectedRoutineId', routine.id);
    }
  };

  const handleFinishWorkout = () => {
    setActiveSession(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'active-workout':
        return (
          <ActiveWorkout
            session={activeSession}
            onFinish={handleFinishWorkout}
          />
        );
      case 'history':
        return <WorkoutHistory />;
      default:
        return <RoutineList onStartWorkout={handleStartWorkout} />;
    }
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        hasActiveSession={!!activeSession}
      />
      <div className="app-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;

