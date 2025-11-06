import { useState, useEffect, useRef } from 'react';
import { Timer } from '../Shared/Timer';
import './RestTimer.css';

interface RestTimerProps {
  restSeconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function RestTimer({ restSeconds, onComplete, autoStart = false }: RestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(restSeconds);
  const [isActive, setIsActive] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoStart && restSeconds > 0) {
      setIsActive(true);
    }
  }, [autoStart, restSeconds]);

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsComplete(true);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeRemaining, onComplete]);

  const handleStart = () => {
    setIsActive(true);
    setIsComplete(false);
    setTimeRemaining(restSeconds);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsComplete(false);
    setTimeRemaining(restSeconds);
  };

  if (restSeconds === 0) {
    return null;
  }

  return (
    <div className={`rest-timer ${isComplete ? 'complete' : ''}`}>
      <div className="rest-timer-header">
        <strong>Rest Timer</strong>
        {isComplete && <span className="complete-indicator">✓ Rest Complete!</span>}
      </div>
      <Timer
        seconds={timeRemaining}
        variant={timeRemaining <= 10 ? 'danger' : timeRemaining <= 30 ? 'warning' : 'primary'}
      />
      <div className="rest-timer-controls">
        {!isActive && timeRemaining === restSeconds && (
          <button className="btn-primary btn-small" onClick={handleStart}>
            Start Rest
          </button>
        )}
        {isActive && (
          <button className="btn-secondary btn-small" onClick={handlePause}>
            Pause
          </button>
        )}
        {!isActive && timeRemaining < restSeconds && (
          <>
            <button className="btn-primary btn-small" onClick={handleStart}>
              Resume
            </button>
            <button className="btn-secondary btn-small" onClick={handleReset}>
              Reset
            </button>
          </>
        )}
        {isComplete && (
          <button className="btn-success btn-small" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

