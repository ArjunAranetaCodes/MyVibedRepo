import { useState, useEffect } from 'react';
import { RoutineCard } from './RoutineCard';
import { RoutineForm } from './RoutineForm';
import { getRoutines, saveRoutines } from '../../utils/storage';
import type { WorkoutRoutine } from '../../types/workout';
import './RoutineList.css';

interface RoutineListProps {
  onStartWorkout: (routine?: WorkoutRoutine) => void;
}

export function RoutineList({ onStartWorkout }: RoutineListProps) {
  const [routines, setRoutines] = useState<WorkoutRoutine[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<WorkoutRoutine | null>(null);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = () => {
    const loadedRoutines = getRoutines();
    setRoutines(loadedRoutines);
  };

  const handleSaveRoutine = (routine: WorkoutRoutine) => {
    const updatedRoutines = editingRoutine
      ? routines.map(r => r.id === routine.id ? routine : r)
      : [...routines, routine];
    
    setRoutines(updatedRoutines);
    saveRoutines(updatedRoutines);
    setShowForm(false);
    setEditingRoutine(null);
  };

  const handleDeleteRoutine = (id: string) => {
    if (confirm('Are you sure you want to delete this routine?')) {
      const updatedRoutines = routines.filter(r => r.id !== id);
      setRoutines(updatedRoutines);
      saveRoutines(updatedRoutines);
    }
  };

  const handleEditRoutine = (routine: WorkoutRoutine) => {
    setEditingRoutine(routine);
    setShowForm(true);
  };

  const handleStartWorkoutFromRoutine = (routine: WorkoutRoutine) => {
    onStartWorkout(routine);
  };

  return (
    <div className="routine-list">
      <div className="page-header">
        <div>
          <h1>Workout Routines</h1>
          <p>Manage your workout routines and exercises</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingRoutine(null);
            setShowForm(true);
          }}
        >
          + New Routine
        </button>
      </div>

      {showForm && (
        <RoutineForm
          routine={editingRoutine}
          onSave={handleSaveRoutine}
          onCancel={() => {
            setShowForm(false);
            setEditingRoutine(null);
          }}
        />
      )}

      {routines.length === 0 ? (
        <div className="empty-state">
          <h3>No routines yet</h3>
          <p>Create your first workout routine to get started!</p>
        </div>
      ) : (
        <div className="routine-grid">
          {routines.map(routine => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onEdit={handleEditRoutine}
              onDelete={handleDeleteRoutine}
              onStart={handleStartWorkoutFromRoutine}
            />
          ))}
        </div>
      )}
    </div>
  );
}

