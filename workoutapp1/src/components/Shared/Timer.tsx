interface TimerProps {
  seconds: number;
  label?: string;
  variant?: 'default' | 'primary' | 'warning' | 'danger';
}

export function Timer({ seconds, label, variant = 'default' }: TimerProps) {
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const variantClass = `timer-${variant}`;

  return (
    <div className={`timer ${variantClass}`}>
      {label && <div className="timer-label">{label}</div>}
      <div className="timer-display">{formatTime(seconds)}</div>
    </div>
  );
}

