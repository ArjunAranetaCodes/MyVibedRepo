# Workout App

A full-featured workout routine tracking application built with React, TypeScript, and Vite.

## Features

- **Workout Routines Management**: Create, edit, and delete workout routines with custom exercises
- **Exercise Library**: Build a library of exercises with muscle groups, sets, reps, weight, and rest periods
- **Active Workout Tracking**: 
  - Track sets, reps, and weights in real-time
  - Rest timer between sets
  - Workout duration timer
  - Progress indicators
- **Workout History**: View past workouts with detailed statistics
- **Progress Tracking**: 
  - Volume progression charts
  - Personal records (PRs)
  - Workout frequency tracking
  - Total volume and statistics

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local development URL (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Create a Routine**: Click "New Routine" and add exercises to it
2. **Start a Workout**: Click "Start Workout" on any routine card
3. **Track Your Sets**: Log each set as you complete it, adjusting reps/weight as needed
4. **Use Rest Timer**: The rest timer will help you time your rest periods
5. **Finish Workout**: Complete all exercises and save your workout to history
6. **View Progress**: Check the History page to see your workout statistics and progress charts

## Data Storage

All data is stored locally in your browser's localStorage. This means:
- Your data persists between sessions
- Your data is private and stored only on your device
- Clearing browser data will delete your workouts

## Technology Stack

- React 19
- TypeScript
- Vite
- Zod (for validation)
- UUID (for unique IDs)
- CSS (for styling)

## License

MIT

