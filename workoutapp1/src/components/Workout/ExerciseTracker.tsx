import { RestTimer } from './RestTimer';
import { SetTracker } from './SetTracker';
import type { Exercise, SetRecord } from '../../types/workout';
import './ExerciseTracker.css';

interface ExerciseTrackerProps {
  exercise: Exercise;
  setRecords: SetRecord[];
  currentSetIndex: number;
  onSetComplete: (setRecord: SetRecord) => void;
  onSetUpdate: (setRecordId: string, reps: number, weight?: number) => void;
  onExerciseComplete: () => void;
  showRestTimer: boolean;
  autoStartRest?: boolean;
}

export function ExerciseTracker({
  exercise,
  setRecords,
  currentSetIndex,
  onSetComplete,
  onSetUpdate,
  onExerciseComplete,
  showRestTimer,
  autoStartRest = false,
}: ExerciseTrackerProps) {
  const exerciseRecords = setRecords.filter(sr => sr.exerciseId === exercise.id);
  const completedSets = exerciseRecords.length;
  const allSetsComplete = completedSets >= exercise.sets;

  return (
    <div className="exercise-tracker">
      <SetTracker
        exercise={exercise}
        setRecords={setRecords}
        onSetComplete={onSetComplete}
        onSetUpdate={onSetUpdate}
        currentSetIndex={currentSetIndex}
      />

      <div className="exercise-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(completedSets / exercise.sets) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {completedSets} / {exercise.sets} sets completed
        </span>
      </div>

      {showRestTimer && !allSetsComplete && (
        <RestTimer
          restSeconds={exercise.restSeconds}
          autoStart={autoStartRest}
        />
      )}

      {allSetsComplete && (
        <div className="exercise-complete">
          <p>✓ All sets completed for {exercise.name}!</p>
          <button className="btn-success" onClick={onExerciseComplete}>
            Next Exercise
          </button>
        </div>
      )}
    </div>
  );
}

