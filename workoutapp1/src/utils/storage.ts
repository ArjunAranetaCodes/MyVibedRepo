import type { WorkoutRoutine, Exercise, WorkoutSession } from '../types/workout';

const STORAGE_KEYS = {
  ROUTINES: 'workout_app_routines',
  EXERCISES: 'workout_app_exercises',
  SESSIONS: 'workout_app_sessions',
  ACTIVE_SESSION: 'workout_app_active_session',
} as const;

// Helper to safely parse JSON from localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    // Convert date strings back to Date objects
    return parseDates(parsed) as T;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

// Helper to recursively convert date strings to Date objects
function parseDates(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(parseDates);
  }
  
  const parsed: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'startTime' || key === 'endTime' || key === 'createdAt' || key === 'timestamp') {
      parsed[key] = value ? new Date(value as string) : undefined;
    } else if (typeof value === 'object' && value !== null) {
      parsed[key] = parseDates(value);
    } else {
      parsed[key] = value;
    }
  }
  
  return parsed;
}

// Helper to save to localStorage
function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

// Routines
export function getRoutines(): WorkoutRoutine[] {
  return getFromStorage<WorkoutRoutine[]>(STORAGE_KEYS.ROUTINES, []);
}

export function saveRoutines(routines: WorkoutRoutine[]): void {
  saveToStorage(STORAGE_KEYS.ROUTINES, routines);
}

// Exercises
export function getExercises(): Exercise[] {
  return getFromStorage<Exercise[]>(STORAGE_KEYS.EXERCISES, []);
}

export function saveExercises(exercises: Exercise[]): void {
  saveToStorage(STORAGE_KEYS.EXERCISES, exercises);
}

// Workout Sessions
export function getWorkoutSessions(): WorkoutSession[] {
  return getFromStorage<WorkoutSession[]>(STORAGE_KEYS.SESSIONS, []);
}

export function saveWorkoutSessions(sessions: WorkoutSession[]): void {
  saveToStorage(STORAGE_KEYS.SESSIONS, sessions);
}

// Active Session
export function getActiveSession(): WorkoutSession | null {
  return getFromStorage<WorkoutSession | null>(STORAGE_KEYS.ACTIVE_SESSION, null);
}

export function saveActiveSession(session: WorkoutSession | null): void {
  saveToStorage(STORAGE_KEYS.ACTIVE_SESSION, session);
}

export function clearActiveSession(): void {
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
}

