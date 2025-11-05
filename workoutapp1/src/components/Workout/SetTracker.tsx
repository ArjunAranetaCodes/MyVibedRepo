import { useState } from 'react';
import type { Exercise, SetRecord } from '../../types/workout';
import './SetTracker.css';

interface SetTrackerProps {
  exercise: Exercise;
  setRecords: SetRecord[];
  onSetComplete: (setRecord: SetRecord) => void;
  onSetUpdate: (setRecordId: string, reps: number, weight?: number) => void;
  currentSetIndex: number;
}

export function SetTracker({
  exercise,
  setRecords,
  onSetComplete,
  onSetUpdate,
  currentSetIndex,
}: SetTrackerProps) {
  const [editingSetId, setEditingSetId] = useState<string | null>(null);
  const [editReps, setEditReps] = useState<string>('');
  const [editWeight, setEditWeight] = useState<string>('');

  const getSetRecord = (setNumber: number): SetRecord | undefined => {
    const exerciseRecords = setRecords
      .filter(sr => sr.exerciseId === exercise.id)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    // Return the record at the setNumber index (1-based to 0-based)
    if (setNumber <= exerciseRecords.length) {
      return exerciseRecords[setNumber - 1];
    }
    return undefined;
  };

  const handleSetClick = (setNumber: number) => {
    const existingRecord = getSetRecord(setNumber);

    if (existingRecord) {
      // Edit existing record
      setEditingSetId(existingRecord.id);
      setEditReps(existingRecord.reps.toString());
      setEditWeight(existingRecord.weight?.toString() || '');
    } else {
      // Create new record
      const newRecord: SetRecord = {
        id: `set-${exercise.id}-${setNumber}-${Date.now()}`,
        exerciseId: exercise.id,
        reps: exercise.reps,
        weight: exercise.weight,
        completed: true,
        timestamp: new Date(),
      };
      onSetComplete(newRecord);
    }
  };

  const handleSaveEdit = (setRecordId: string) => {
    const reps = parseInt(editReps) || exercise.reps;
    const weight = editWeight ? parseFloat(editWeight) : undefined;
    onSetUpdate(setRecordId, reps, weight);
    setEditingSetId(null);
    setEditReps('');
    setEditWeight('');
  };

  const handleCancelEdit = () => {
    setEditingSetId(null);
    setEditReps('');
    setEditWeight('');
  };

  const isSetComplete = (setNumber: number): boolean => {
    return getSetRecord(setNumber)?.completed || false;
  };

  return (
    <div className="set-tracker">
      <div className="set-tracker-header">
        <h4>{exercise.name}</h4>
        <div className="set-tracker-info">
          Target: {exercise.sets} sets × {exercise.reps} reps
          {exercise.weight && ` @ ${exercise.weight}lbs`}
        </div>
      </div>

      <div className="sets-grid">
        {Array.from({ length: exercise.sets }, (_, i) => {
          const setNumber = i + 1;
          const setRecord = getSetRecord(setNumber);
          const completed = isSetComplete(setNumber);
          const isCurrent = setNumber === currentSetIndex + 1;
          const isEditing = editingSetId === setRecord?.id;

          return (
            <div
              key={setNumber}
              className={`set-box ${completed ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="set-number">Set {setNumber}</div>
              
              {isEditing ? (
                <div className="set-edit-form">
                  <input
                    type="number"
                    min="1"
                    value={editReps}
                    onChange={(e) => setEditReps(e.target.value)}
                    placeholder="Reps"
                    className="set-edit-input"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    placeholder="Weight"
                    className="set-edit-input"
                  />
                  <div className="set-edit-actions">
                    <button
                      className="btn-success btn-small"
                      onClick={() => setRecord && handleSaveEdit(setRecord.id)}
                    >
                      ✓
                    </button>
                    <button
                      className="btn-secondary btn-small"
                      onClick={handleCancelEdit}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {setRecord ? (
                    <div className="set-record">
                      <div className="set-record-reps">{setRecord.reps} reps</div>
                      {setRecord.weight !== undefined && (
                        <div className="set-record-weight">{setRecord.weight}lbs</div>
                      )}
                      <button
                        className="btn-secondary btn-small"
                        onClick={() => handleSetClick(setNumber)}
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-primary btn-small"
                      onClick={() => handleSetClick(setNumber)}
                    >
                      Log Set
                    </button>
                  )}
                  {completed && <div className="set-checkmark">✓</div>}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

