import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { workoutRoutineSchema, exerciseSchema } from '../../types/workout';
import { ExerciseForm } from './ExerciseForm';
import { getExercises, saveExercises } from '../../utils/storage';
import type { WorkoutRoutine, Exercise } from '../../types/workout';
import './RoutineForm.css';

interface RoutineFormProps {
  routine: WorkoutRoutine | null;
  onSave: (routine: WorkoutRoutine) => void;
  onCancel: () => void;
}

export function RoutineForm({ routine, onSave, onCancel }: RoutineFormProps) {
  const [name, setName] = useState(routine?.name || '');
  const [description, setDescription] = useState(routine?.description || '');
  const [exercises, setExercises] = useState<Exercise[]>(routine?.exercises || []);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
  const [exerciseLibrary, setExerciseLibrary] = useState<Exercise[]>([]);

  useEffect(() => {
    const loaded = getExercises();
    setExerciseLibrary(loaded);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const routineData = workoutRoutineSchema.parse({
        id: routine?.id || uuidv4(),
        name,
        description: description || undefined,
        exercises,
        createdAt: routine?.createdAt || new Date(),
      });
      
      onSave(routineData);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    if (editingExerciseIndex !== null) {
      const updated = [...exercises];
      updated[editingExerciseIndex] = exercise;
      setExercises(updated);
      setEditingExerciseIndex(null);
    } else {
      setExercises([...exercises, exercise]);
    }
    setShowExerciseForm(false);
  };

  const handleEditExercise = (index: number) => {
    setEditingExerciseIndex(index);
    setShowExerciseForm(true);
  };

  const handleDeleteExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleMoveExercise = (index: number, direction: 'up' | 'down') => {
    const newExercises = [...exercises];
    if (direction === 'up' && index > 0) {
      [newExercises[index - 1], newExercises[index]] = [newExercises[index], newExercises[index - 1]];
      setExercises(newExercises);
    } else if (direction === 'down' && index < exercises.length - 1) {
      [newExercises[index], newExercises[index + 1]] = [newExercises[index + 1], newExercises[index]];
      setExercises(newExercises);
    }
  };

  const handleAddFromLibrary = (exercise: Exercise) => {
    // Create a copy with new ID for this routine
    const exerciseCopy = {
      ...exercise,
      id: uuidv4(),
    };
    setExercises([...exercises, exerciseCopy]);
  };

  const handleSaveToLibrary = (exercise: Exercise) => {
    // Check if exercise already exists
    const exists = exerciseLibrary.find(ex => ex.name.toLowerCase() === exercise.name.toLowerCase());
    if (!exists) {
      const updatedLibrary = [...exerciseLibrary, exercise];
      setExerciseLibrary(updatedLibrary);
      saveExercises(updatedLibrary);
    }
  };

  return (
    <div className="routine-form-overlay">
      <div className="routine-form-container">
        <h2>{routine ? 'Edit Routine' : 'New Routine'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="routine-name">Routine Name *</label>
            <input
              id="routine-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Upper Body, Push Day"
            />
          </div>

          <div className="form-group">
            <label htmlFor="routine-description">Description</label>
            <textarea
              id="routine-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description of this routine"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label>Exercises ({exercises.length})</label>
              <button
                type="button"
                className="btn-primary btn-small"
                onClick={() => {
                  setEditingExerciseIndex(null);
                  setShowExerciseForm(true);
                }}
              >
                + Add Exercise
              </button>
            </div>

            {exercises.length === 0 ? (
              <div className="empty-state" style={{ padding: '1rem' }}>
                <p>No exercises yet. Add your first exercise!</p>
              </div>
            ) : (
              <div className="exercise-list">
                {exercises.map((exercise, index) => (
                  <div key={exercise.id} className="exercise-item">
                    <div className="exercise-item-content">
                      <div>
                        <strong>{exercise.name}</strong>
                        <div className="exercise-item-details">
                          {exercise.sets} sets × {exercise.reps} reps
                          {exercise.weight && ` @ ${exercise.weight}${typeof exercise.weight === 'number' ? 'lbs' : ''}`}
                          {exercise.restSeconds > 0 && ` • ${exercise.restSeconds}s rest`}
                        </div>
                        <div className="muscle-groups">
                          {exercise.muscleGroups.map(mg => (
                            <span key={mg} className={`muscle-group-tag muscle-group-${mg}`}>
                              {mg}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="exercise-item-actions">
                        <button
                          type="button"
                          className="btn-secondary btn-small"
                          onClick={() => handleMoveExercise(index, 'up')}
                          disabled={index === 0}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="btn-secondary btn-small"
                          onClick={() => handleMoveExercise(index, 'down')}
                          disabled={index === exercises.length - 1}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="btn-secondary btn-small"
                          onClick={() => handleEditExercise(index)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-danger btn-small"
                          onClick={() => handleDeleteExercise(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Routine
            </button>
          </div>
        </form>

        {showExerciseForm && (
          <ExerciseForm
            exercise={editingExerciseIndex !== null ? exercises[editingExerciseIndex] : null}
            onSave={(exercise) => {
              handleAddExercise(exercise);
              // Optionally save to library
              if (confirm('Save this exercise to your library for future use?')) {
                handleSaveToLibrary(exercise);
              }
            }}
            onCancel={() => {
              setShowExerciseForm(false);
              setEditingExerciseIndex(null);
            }}
            exerciseLibrary={exerciseLibrary}
            onAddFromLibrary={handleAddFromLibrary}
          />
        )}
      </div>
    </div>
  );
}

