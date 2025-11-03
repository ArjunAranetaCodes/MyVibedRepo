import type { WorkoutRoutine } from '../../types/workout';
import './RoutineCard.css';

interface RoutineCardProps {
  routine: WorkoutRoutine;
  onEdit: (routine: WorkoutRoutine) => void;
  onDelete: (id: string) => void;
  onStart: (routine: WorkoutRoutine) => void;
}

export function RoutineCard({ routine, onEdit, onDelete, onStart }: RoutineCardProps) {
  const exerciseCount = routine.exercises.length;
  const totalSets = routine.exercises.reduce((sum, ex) => sum + ex.sets, 0);

  return (
    <div className="card routine-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{routine.name}</h3>
          {routine.description && (
            <p className="card-description">{routine.description}</p>
          )}
        </div>
      </div>

      <div className="routine-stats">
        <div className="stat">
          <span className="stat-value">{exerciseCount}</span>
          <span className="stat-label">Exercises</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalSets}</span>
          <span className="stat-label">Total Sets</span>
        </div>
      </div>

      {routine.exercises.length > 0 && (
        <div className="routine-exercises-preview">
          <strong>Exercises:</strong>
          <ul>
            {routine.exercises.slice(0, 3).map((exercise, idx) => (
              <li key={idx}>{exercise.name}</li>
            ))}
            {routine.exercises.length > 3 && (
              <li>+{routine.exercises.length - 3} more</li>
            )}
          </ul>
        </div>
      )}

      <div className="card-actions">
        <button
          className="btn-primary btn-small"
          onClick={() => onStart(routine)}
          disabled={routine.exercises.length === 0}
        >
          Start Workout
        </button>
        <button
          className="btn-secondary btn-small"
          onClick={() => onEdit(routine)}
        >
          Edit
        </button>
        <button
          className="btn-danger btn-small"
          onClick={() => onDelete(routine.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

