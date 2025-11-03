import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { exerciseSchema, muscleGroupSchema } from '../../types/workout';
import type { Exercise, MuscleGroup } from '../../types/workout';
import './ExerciseForm.css';

interface ExerciseFormProps {
  exercise: Exercise | null;
  onSave: (exercise: Exercise) => void;
  onCancel: () => void;
  exerciseLibrary?: Exercise[];
  onAddFromLibrary?: (exercise: Exercise) => void;
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  'chest',
  'back',
  'shoulders',
  'arms',
  'legs',
  'core',
  'cardio',
  'full-body',
];

export function ExerciseForm({
  exercise,
  onSave,
  onCancel,
  exerciseLibrary = [],
  onAddFromLibrary,
}: ExerciseFormProps) {
  const [name, setName] = useState(exercise?.name || '');
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>(
    exercise?.muscleGroups || []
  );
  const [sets, setSets] = useState(exercise?.sets || 3);
  const [reps, setReps] = useState(exercise?.reps || 10);
  const [weight, setWeight] = useState(exercise?.weight?.toString() || '');
  const [restSeconds, setRestSeconds] = useState(exercise?.restSeconds || 60);
  const [notes, setNotes] = useState(exercise?.notes || '');
  const [showLibrary, setShowLibrary] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const exerciseData = exerciseSchema.parse({
        id: exercise?.id || uuidv4(),
        name,
        muscleGroups,
        sets,
        reps,
        weight: weight ? parseFloat(weight) : undefined,
        restSeconds,
        notes: notes || undefined,
        createdAt: exercise?.createdAt || new Date(),
      });

      onSave(exerciseData);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const toggleMuscleGroup = (mg: MuscleGroup) => {
    setMuscleGroups(prev =>
      prev.includes(mg)
        ? prev.filter(m => m !== mg)
        : [...prev, mg]
    );
  };

  const handleAddFromLibrary = (libExercise: Exercise) => {
    if (onAddFromLibrary) {
      onAddFromLibrary(libExercise);
    }
    onCancel();
  };

  return (
    <div className="exercise-form-overlay">
      <div className="exercise-form-container">
        <h3>{exercise ? 'Edit Exercise' : 'New Exercise'}</h3>

        {exerciseLibrary.length > 0 && !exercise && (
          <div className="library-toggle">
            <button
              type="button"
              className="btn-secondary btn-small"
              onClick={() => setShowLibrary(!showLibrary)}
            >
              {showLibrary ? 'Hide' : 'Show'} Exercise Library ({exerciseLibrary.length})
            </button>
          </div>
        )}

        {showLibrary && exerciseLibrary.length > 0 && (
          <div className="exercise-library">
            <h4>Exercise Library</h4>
            <div className="library-list">
              {exerciseLibrary.map(libExercise => (
                <div key={libExercise.id} className="library-item">
                  <div>
                    <strong>{libExercise.name}</strong>
                    <div className="library-item-details">
                      {libExercise.sets} sets × {libExercise.reps} reps
                      {libExercise.weight && ` @ ${libExercise.weight}lbs`}
                    </div>
                    <div className="muscle-groups">
                      {libExercise.muscleGroups.map(mg => (
                        <span key={mg} className={`muscle-group-tag muscle-group-${mg}`}>
                          {mg}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-primary btn-small"
                    onClick={() => handleAddFromLibrary(libExercise)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exercise-name">Exercise Name *</label>
            <input
              id="exercise-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Bench Press, Squat"
            />
          </div>

          <div className="form-group">
            <label>Muscle Groups *</label>
            <div className="muscle-group-selector">
              {MUSCLE_GROUPS.map(mg => (
                <button
                  key={mg}
                  type="button"
                  className={`muscle-group-btn ${muscleGroups.includes(mg) ? 'active' : ''}`}
                  onClick={() => toggleMuscleGroup(mg)}
                >
                  {mg}
                </button>
              ))}
            </div>
            {muscleGroups.length === 0 && (
              <p className="error-text">Please select at least one muscle group</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="exercise-sets">Sets *</label>
              <input
                id="exercise-sets"
                type="number"
                min="1"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exercise-reps">Reps *</label>
              <input
                id="exercise-reps"
                type="number"
                min="1"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exercise-weight">Weight (lbs)</label>
              <input
                id="exercise-weight"
                type="number"
                min="0"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Optional"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exercise-rest">Rest (seconds)</label>
              <input
                id="exercise-rest"
                type="number"
                min="0"
                value={restSeconds}
                onChange={(e) => setRestSeconds(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exercise-notes">Notes</label>
            <textarea
              id="exercise-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes about form, technique, etc."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={muscleGroups.length === 0}>
              Save Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

