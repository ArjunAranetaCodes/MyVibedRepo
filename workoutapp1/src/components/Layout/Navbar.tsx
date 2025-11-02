import type { Page } from '../../App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  hasActiveSession: boolean;
}

export function Navbar({ currentPage, onNavigate, hasActiveSession }: NavbarProps) {
  return (
    <nav style={{
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
        💪 Workout App
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          className={currentPage === 'home' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => onNavigate('home')}
        >
          Routines
        </button>
        <button
          className={currentPage === 'active-workout' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => onNavigate('active-workout')}
          disabled={!hasActiveSession && currentPage !== 'active-workout'}
        >
          Active Workout
          {hasActiveSession && <span style={{ marginLeft: '0.5rem' }}>●</span>}
        </button>
        <button
          className={currentPage === 'history' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => onNavigate('history')}
        >
          History
        </button>
      </div>
    </nav>
  );
}

