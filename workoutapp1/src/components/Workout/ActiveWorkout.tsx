import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { workoutSessionSchema } from '../../types/workout';
import { ExerciseTracker } from './ExerciseTracker';
import { Timer } from '../Shared/Timer';
import {
  getRoutines,
  saveActiveSession,
  saveWorkoutSessions,
  getWorkoutSessions,
  clearActiveSession,
} from '../../utils/storage';
import type { WorkoutRoutine, WorkoutSession, Exercise, SetRecord } from '../../types/workout';
import './ActiveWorkout.css';

interface ActiveWorkoutProps {
  session: WorkoutSession | null;
  onFinish: () => void;
}

export function ActiveWorkout({ session: existingSession, onFinish }: ActiveWorkoutProps) {
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(existingSession);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [setRecords, setSetRecords] = useState<SetRecord[]>(existingSession?.setRecords || []);
  const [workoutStartTime] = useState<Date>(existingSession?.startTime || new Date());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize session from existing session if available
    if (existingSession && !currentSession) {
      setCurrentSession(existingSession);
      setSetRecords(existingSession.setRecords || []);
    }

    // Save session periodically when setRecords change
    if (currentSession) {
      const updatedSession: WorkoutSession = {
        ...currentSession,
        setRecords,
      };
      saveActiveSession(updatedSession);
    }
  }, [setRecords, currentSession, existingSession]);

  // Workout timer
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const elapsed = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [workoutStartTime]);

  const handleStartWorkout = useCallback((routine: WorkoutRoutine) => {
    const newSession: WorkoutSession = {
      id: uuidv4(),
      routineId: routine.id,
      routineName: routine.name,
      startTime: new Date(),
      exercises: routine.exercises,
      setRecords: [],
    };

    setCurrentSession(newSession);
    setSetRecords([]);
    setCurrentExerciseIndex(0);
    setCurrentSetIndex(0);
    saveActiveSession(newSession);
    // Clear the selected routine from sessionStorage
    sessionStorage.removeItem('selectedRoutineId');
  }, []);

  const handleSetComplete = (setRecord: SetRecord) => {
    const newRecords = [...setRecords, setRecord];
    setSetRecords(newRecords);
    
    // Show rest timer after logging a set (if not last set of exercise)
    const currentExercise = currentSession?.exercises[currentExerciseIndex];
    if (currentExercise) {
      const exerciseSets = newRecords.filter(sr => sr.exerciseId === currentExercise.id);
      if (exerciseSets.length < currentExercise.sets) {
        setShowRestTimer(true);
      }
    }
  };

  const handleSetUpdate = (setRecordId: string, reps: number, weight?: number) => {
    setSetRecords(prev =>
      prev.map(record =>
        record.id === setRecordId
          ? { ...record, reps, weight }
          : record
      )
    );
  };

  const handleExerciseComplete = () => {
    setShowRestTimer(false);
    if (currentSession && currentExerciseIndex < currentSession.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
    }
  };

  const handleFinishWorkout = () => {
    if (!currentSession) return;

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - currentSession.startTime.getTime()) / 1000);

    const completedSession: WorkoutSession = {
      ...currentSession,
      endTime,
      duration,
      setRecords,
    };

    try {
      workoutSessionSchema.parse(completedSession);
      
      // Save to history
      const sessions = getWorkoutSessions();
      saveWorkoutSessions([...sessions, completedSession]);
      
      // Clear active session
      clearActiveSession();
      
      onFinish();
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error finishing workout: ${error.message}`);
      }
    }
  };

  const handleCancelWorkout = () => {
    if (confirm('Are you sure you want to cancel this workout? Progress will be lost.')) {
      clearActiveSession();
      onFinish();
    }
  };

  // Check for selected routine from sessionStorage on mount
  useEffect(() => {
    if (!currentSession && !existingSession) {
      const selectedRoutineId = sessionStorage.getItem('selectedRoutineId');
      if (selectedRoutineId) {
        const routines = getRoutines();
        const selectedRoutine = routines.find(r => r.id === selectedRoutineId);
        if (selectedRoutine && selectedRoutine.exercises.length > 0) {
          handleStartWorkout(selectedRoutine);
        }
      }
    }
  }, [currentSession, existingSession, handleStartWorkout]);

  // If no active session, show routine selection
  if (!currentSession) {
    const routines = getRoutines();
    const routinesWithExercises = routines.filter(r => r.exercises.length > 0);

    if (routinesWithExercises.length === 0) {
      return (
        <div className="active-workout">
          <div className="page-header">
            <h1>Start Workout</h1>
          </div>
          <div className="empty-state">
            <h3>No routines available</h3>
            <p>Create a routine with exercises to start a workout.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="active-workout">
        <div className="page-header">
          <h1>Start Workout</h1>
        </div>
        <div className="routine-selection">
          <h2>Select a routine to start:</h2>
          <div className="routine-selection-list">
            {routinesWithExercises.map(routine => (
              <div key={routine.id} className="card">
                <h3>{routine.name}</h3>
                {routine.description && <p>{routine.description}</p>}
                <p>{routine.exercises.length} exercises</p>
                <button
                  className="btn-primary"
                  onClick={() => handleStartWorkout(routine)}
                >
                  Start Workout
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentExercise = currentSession.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === currentSession.exercises.length - 1;
  const allExercisesComplete = currentSession.exercises.every((exercise) => {
    const exerciseSets = setRecords.filter(sr => sr.exerciseId === exercise.id);
    return exerciseSets.length >= exercise.sets;
  });

  return (
    <div className="active-workout">
      <div className="active-workout-header">
        <div>
          <h1>{currentSession.routineName || 'Active Workout'}</h1>
          <div className="workout-info">
            Exercise {currentExerciseIndex + 1} of {currentSession.exercises.length}
          </div>
        </div>
        <Timer seconds={elapsedSeconds} label="Workout Time" variant="primary" />
      </div>

      <div className="exercise-navigation">
        {currentSession.exercises.map((exercise, idx) => {
          const exerciseSets = setRecords.filter(sr => sr.exerciseId === exercise.id);
          const isComplete = exerciseSets.length >= exercise.sets;
          const isCurrent = idx === currentExerciseIndex;

          return (
            <button
              key={exercise.id}
              className={`exercise-nav-btn ${isCurrent ? 'current' : ''} ${isComplete ? 'complete' : ''}`}
              onClick={() => {
                setCurrentExerciseIndex(idx);
                setShowRestTimer(false);
              }}
            >
              {idx + 1}. {exercise.name}
              {isComplete && ' ✓'}
            </button>
          );
        })}
      </div>

      {currentExercise && (
        <div className="current-exercise">
          <ExerciseTracker
            exercise={currentExercise}
            setRecords={setRecords}
            currentSetIndex={currentSetIndex}
            onSetComplete={handleSetComplete}
            onSetUpdate={handleSetUpdate}
            onExerciseComplete={() => {
              if (isLastExercise) {
                // All exercises complete
              } else {
                handleExerciseComplete();
              }
            }}
            showRestTimer={showRestTimer}
            autoStartRest={false}
          />
        </div>
      )}

      {allExercisesComplete && (
        <div className="workout-complete">
          <h2>🎉 Workout Complete!</h2>
          <p>Great job completing all exercises!</p>
          <div className="workout-stats">
            <div className="stat">
              <span className="stat-value">{currentSession.exercises.length}</span>
              <span className="stat-label">Exercises</span>
            </div>
            <div className="stat">
              <span className="stat-value">{setRecords.length}</span>
              <span className="stat-label">Sets Completed</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
              </span>
              <span className="stat-label">Duration</span>
            </div>
          </div>
          <button className="btn-success" onClick={handleFinishWorkout}>
            Finish & Save Workout
          </button>
        </div>
      )}

      <div className="workout-actions">
        <button className="btn-danger" onClick={handleCancelWorkout}>
          Cancel Workout
        </button>
        {allExercisesComplete && (
          <button className="btn-primary" onClick={handleFinishWorkout}>
            Finish Workout
          </button>
        )}
      </div>
    </div>
  );
}

