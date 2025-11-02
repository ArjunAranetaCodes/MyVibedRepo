import { useMemo } from 'react';
import type { WorkoutSession } from '../../types/workout';
import './ProgressChart.css';

interface ProgressChartProps {
  sessions: WorkoutSession[];
}

export function ProgressChart({ sessions }: ProgressChartProps) {
  // Prepare data for volume chart (last 10 workouts)
  const volumeData = useMemo(() => {
    const recentSessions = sessions.slice(0, 10).reverse();
    return recentSessions.map(session => {
      const volume = session.setRecords.reduce((sum, record) => {
        return sum + (record.reps * (record.weight || 0));
      }, 0);
      return {
        date: session.startTime,
        volume,
        label: session.startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
    });
  }, [sessions]);

  // Prepare data for workout frequency (last 30 days)
  const frequencyData = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSessions = sessions.filter(s => s.startTime >= thirtyDaysAgo);
    const dayCounts: Record<string, number> = {};
    
    recentSessions.forEach(session => {
      const dateKey = session.startTime.toLocaleDateString('en-US');
      dayCounts[dateKey] = (dayCounts[dateKey] || 0) + 1;
    });

    return Object.entries(dayCounts).map(([date, count]) => ({
      date,
      count,
    })).slice(-14); // Last 14 days
  }, [sessions]);

  const maxVolume = Math.max(...volumeData.map(d => d.volume), 1);

  if (volumeData.length === 0) {
    return null;
  }

  return (
    <div className="progress-charts">
      <div className="chart-container">
        <h3>Volume Progression (Last 10 Workouts)</h3>
        <div className="volume-chart">
          {volumeData.map((data, index) => {
            const heightPercent = (data.volume / maxVolume) * 100;
            return (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{ height: `${heightPercent}%` }}
                    title={`${data.label}: ${data.volume.toLocaleString()} lbs`}
                  />
                </div>
                <div className="chart-label">{data.label}</div>
                <div className="chart-value">{data.volume > 0 ? Math.round(data.volume / 100) / 10 + 'k' : '0'}</div>
              </div>
            );
          })}
        </div>
      </div>

      {frequencyData.length > 0 && (
        <div className="chart-container">
          <h3>Workout Frequency (Last 14 Days)</h3>
          <div className="frequency-chart">
            {frequencyData.map((data, index) => {
              const maxCount = Math.max(...frequencyData.map(d => d.count), 1);
              const heightPercent = (data.count / maxCount) * 100;
              const date = new Date(data.date);
              const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              return (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar-wrapper">
                    <div
                      className="chart-bar frequency-bar"
                      style={{ height: `${heightPercent}%` }}
                      title={`${label}: ${data.count} workout${data.count > 1 ? 's' : ''}`}
                    />
                  </div>
                  <div className="chart-label">{label}</div>
                  <div className="chart-value">{data.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

