import { z } from 'zod';

// Muscle groups
export const muscleGroupSchema = z.enum([
  'chest',
  'back',
  'shoulders',
  'arms',
  'legs',
  'core',
  'cardio',
  'full-body',
]);

export type MuscleGroup = z.infer<typeof muscleGroupSchema>;

// Exercise schema
export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Exercise name cannot be empty'),
  muscleGroups: z.array(muscleGroupSchema).min(1, 'At least one muscle group required'),
  sets: z.number().int().positive('Sets must be a positive number'),
  reps: z.number().int().positive('Reps must be a positive number'),
  weight: z.number().nonnegative('Weight cannot be negative').optional(),
  restSeconds: z.number().int().nonnegative('Rest time cannot be negative').default(60),
  notes: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

export type Exercise = z.infer<typeof exerciseSchema>;

// Set record schema (for tracking completed sets)
export const setRecordSchema = z.object({
  id: z.string(),
  exerciseId: z.string(),
  reps: z.number().int().positive(),
  weight: z.number().nonnegative().optional(),
  completed: z.boolean().default(true),
  timestamp: z.date().default(() => new Date()),
});

export type SetRecord = z.infer<typeof setRecordSchema>;

// Workout routine schema
export const workoutRoutineSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Routine name cannot be empty'),
  description: z.string().optional(),
  exercises: z.array(exerciseSchema),
  createdAt: z.date().default(() => new Date()),
});

export type WorkoutRoutine = z.infer<typeof workoutRoutineSchema>;

// Workout session schema
export const workoutSessionSchema = z.object({
  id: z.string(),
  routineId: z.string().optional(),
  routineName: z.string().optional(),
  startTime: z.date(),
  endTime: z.date().optional(),
  exercises: z.array(exerciseSchema),
  setRecords: z.array(setRecordSchema),
  duration: z.number().optional(), // in seconds
});

export type WorkoutSession = z.infer<typeof workoutSessionSchema>;

