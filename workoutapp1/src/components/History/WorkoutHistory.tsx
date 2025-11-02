import { useState, useEffect } from 'react';
import { getWorkoutSessions } from '../../utils/storage';
import { WorkoutStats } from './WorkoutStats';
import { ProgressChart } from './ProgressChart';
import type { WorkoutSession } from '../../types/workout';
import './WorkoutHistory.css';

export function WorkoutHistory() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const loadedSessions = getWorkoutSessions();
    // Sort by date, newest first
    const sorted = loadedSessions.sort(
      (a, b) => b.startTime.getTime() - a.startTime.getTime()
    );
    setSessions(sorted);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const calculateVolume = (session: WorkoutSession): number => {
    return session.setRecords.reduce((total, record) => {
      const weight = record.weight || 0;
      return total + (record.reps * weight);
    }, 0);
  };

  return (
    <div className="workout-history">
      <div className="page-header">
        <div>
          <h1>Workout History</h1>
          <p>Track your progress and view past workouts</p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="empty-state">
          <h3>No workout history yet</h3>
          <p>Complete a workout to see it here!</p>
        </div>
      ) : (
        <>
          <WorkoutStats sessions={sessions} />
          <ProgressChart sessions={sessions} />

          <div className="history-section">
            <h2>Past Workouts ({sessions.length})</h2>
            <div className="sessions-list">
              {sessions.map(session => (
                <div
                  key={session.id}
                  className={`card session-card ${selectedSession?.id === session.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSession(
                    selectedSession?.id === session.id ? null : session
                  )}
                >
                  <div className="session-header">
                    <div>
                      <h3>{session.routineName || 'Workout'}</h3>
                      <p className="session-date">{formatDate(session.startTime)}</p>
                    </div>
                    <div className="session-summary">
                      <div className="session-stat">
                        <span className="stat-value">{session.exercises.length}</span>
                        <span className="stat-label">Exercises</span>
                      </div>
                      <div className="session-stat">
                        <span className="stat-value">{session.setRecords.length}</span>
                        <span className="stat-label">Sets</span>
                      </div>
                      <div className="session-stat">
                        <span className="stat-value">{formatDuration(session.duration)}</span>
                        <span className="stat-label">Duration</span>
                      </div>
                    </div>
                  </div>

                  {selectedSession?.id === session.id && (
                    <div className="session-details">
                      <h4>Exercises:</h4>
                      <div className="exercise-list">
                        {session.exercises.map(exercise => {
                          const exerciseSets = session.setRecords.filter(
                            sr => sr.exerciseId === exercise.id
                          );
                          const totalVolume = exerciseSets.reduce(
                            (sum, set) => sum + (set.reps * (set.weight || 0)),
                            0
                          );

                          return (
                            <div key={exercise.id} className="exercise-detail">
                              <div className="exercise-detail-header">
                                <strong>{exercise.name}</strong>
                                <span>{exerciseSets.length} sets</span>
                              </div>
                              <div className="exercise-detail-sets">
                                {exerciseSets.map((set, idx) => (
                                  <span key={idx} className="set-badge">
                                    {set.reps}×{set.weight || 'BW'}
                                  </span>
                                ))}
                              </div>
                              {totalVolume > 0 && (
                                <div className="exercise-volume">
                                  Volume: {totalVolume} lbs
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="session-total-volume">
                        Total Volume: {calculateVolume(session).toLocaleString()} lbs
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

