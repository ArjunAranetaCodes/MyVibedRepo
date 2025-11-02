import type { WorkoutSession } from '../../types/workout';
import './WorkoutStats.css';

interface WorkoutStatsProps {
  sessions: WorkoutSession[];
}

export function WorkoutStats({ sessions }: WorkoutStatsProps) {
  const totalWorkouts = sessions.length;
  const totalSets = sessions.reduce((sum, s) => sum + s.setRecords.length, 0);
  const totalExercises = sessions.reduce((sum, s) => sum + s.exercises.length, 0);
  
  const totalDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const avgDuration = totalWorkouts > 0 ? Math.floor(totalDuration / totalWorkouts) : 0;

  const totalVolume = sessions.reduce((sum, session) => {
    return sum + session.setRecords.reduce((vol, record) => {
      return vol + (record.reps * (record.weight || 0));
    }, 0);
  }, 0);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Calculate personal records (max weight per exercise)
  const exercisePRs: Record<string, number> = {};
  sessions.forEach(session => {
    session.setRecords.forEach(record => {
      if (record.weight) {
        const exerciseName = session.exercises.find(ex => ex.id === record.exerciseId)?.name || 'Unknown';
        if (!exercisePRs[exerciseName] || record.weight > exercisePRs[exerciseName]) {
          exercisePRs[exerciseName] = record.weight;
        }
      }
    });
  });

  const prEntries = Object.entries(exercisePRs).sort((a, b) => b[1] - a[1]);

  return (
    <div className="workout-stats-container">
      <h2>Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{totalWorkouts}</div>
          <div className="stat-label">Total Workouts</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-value">{totalExercises}</div>
          <div className="stat-label">Total Exercises</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-value">{totalSets}</div>
          <div className="stat-label">Total Sets</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{formatDuration(avgDuration)}</div>
          <div className="stat-label">Avg Duration</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">{totalVolume.toLocaleString()}</div>
          <div className="stat-label">Total Volume (lbs)</div>
        </div>
      </div>

      {prEntries.length > 0 && (
        <div className="pr-section">
          <h3>Personal Records</h3>
          <div className="pr-list">
            {prEntries.slice(0, 10).map(([exercise, weight]) => (
              <div key={exercise} className="pr-item">
                <span className="pr-exercise">{exercise}</span>
                <span className="pr-weight">{weight} lbs</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

