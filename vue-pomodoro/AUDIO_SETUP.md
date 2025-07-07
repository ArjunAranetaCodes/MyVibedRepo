# Audio Setup Guide for Vue Pomodoro App

## Overview

This guide explains how to set up and use the audio system in your Vue Pomodoro timer application.

## 🎵 Audio Features

### 1. Notification Sounds
- **Timer End**: Plays when a Pomodoro session completes
- **Break Start**: Plays when transitioning to break mode
- **Work Start**: Plays when starting a new Pomodoro session
- **Task Complete**: Plays when a task is completed

### 2. Background Music
- **Focus Music**: Instrumental music for work sessions
- **Relax Music**: Calm music for break sessions

### 3. Ambient Sounds
- **Rain**: Gentle rain sounds
- **Nature**: Forest and outdoor sounds
- **Cafe**: Coffee shop ambience

## 📁 File Structure

```
vue-pomodoro/
├── public/
│   └── sounds/
│       ├── notifications/
│       │   ├── timer-end.mp3
│       │   ├── break-start.mp3
│       │   ├── work-start.mp3
│       │   └── task-complete.mp3
│       ├── background/
│       │   ├── focus-music.mp3
│       │   └── relax-music.mp3
│       └── ambient/
│           ├── rain.mp3
│           ├── nature.mp3
│           └── cafe.mp3
├── src/
│   ├── services/
│   │   └── audioService.ts
│   └── components/
│       └── AudioSettings.vue
```

## 🚀 Getting Started

### Step 1: Add Audio Files

1. **Download or create audio files** following the specifications in `public/sounds/README.md`
2. **Place files in the correct folders** with exact filenames
3. **Test file compatibility** by opening them in a web browser

### Step 2: Test the Audio System

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the audio settings**:
   - Click the "🔊 Audio" button in the navigation
   - Test each sound using the "Test Sounds" buttons

3. **Configure your preferences**:
   - Enable/disable audio
   - Adjust volume
   - Choose background music and ambient sounds

## 🎛️ Audio Controls

### Master Controls
- **Enable Audio**: Master toggle for all audio features
- **Volume**: Global volume control (0-100%)

### Background Music
- **Enable Background Music**: Toggle background music feature
- **Focus Music**: Instrumental music for work sessions
- **Relax Music**: Calm music for break sessions
- **Stop Music**: Stop current background music

### Ambient Sounds
- **Enable Ambient Sounds**: Toggle ambient sound feature
- **Rain**: Gentle rain sounds
- **Nature**: Forest and outdoor sounds
- **Cafe**: Coffee shop ambience
- **Stop Ambient**: Stop current ambient sound

### Test Sounds
- **Timer End**: Test the timer completion sound
- **Break Start**: Test the break transition sound
- **Work Start**: Test the work session start sound

## 🔧 Technical Implementation

### AudioService Class

The `AudioService` manages all audio functionality:

```typescript
// Key methods
audioService.playTimerEnd()           // Play timer end sound
audioService.playBreakStart()         // Play break start sound
audioService.playWorkStart()          // Play work start sound
audioService.startBackgroundMusic()   // Start background music
audioService.startAmbientSound()      // Start ambient sound
audioService.setVolume(0.5)           // Set volume (0-1)
```

### Configuration Persistence

Audio settings are automatically saved to localStorage and restored on app restart.

### Browser Compatibility

- **Modern browsers**: Full support for MP3 and OGG formats
- **Mobile browsers**: Audio may require user interaction first
- **Safari**: May have stricter autoplay policies

## 🎯 Best Practices

### Audio File Selection

1. **Notification Sounds**:
   - Keep under 3 seconds
   - Use clear, distinct sounds
   - Avoid jarring or loud sounds

2. **Background Music**:
   - Choose instrumental music
   - Avoid lyrics that might distract
   - Use 80-120 BPM for focus music
   - Use 60-80 BPM for relax music

3. **Ambient Sounds**:
   - Keep volume very low
   - Use natural, non-distracting sounds
   - Ensure smooth looping

### User Experience

1. **Volume Levels**:
   - Notifications: 100% of user volume
   - Background music: 30% of user volume
   - Ambient sounds: 20% of user volume

2. **Automatic Playback**:
   - Music starts automatically when timer starts
   - Music changes based on current mode
   - All audio stops when timer is paused

3. **Settings Persistence**:
   - All settings saved automatically
   - Settings restored on page reload
   - No need to reconfigure each time

## 🐛 Troubleshooting

### Common Issues

1. **Audio not playing**:
   - Check browser autoplay settings
   - Ensure audio files exist and are valid
   - Try clicking the test buttons first

2. **Audio files not loading**:
   - Verify file paths are correct
   - Check file format (MP3 recommended)
   - Ensure files are in the `public/sounds/` folder

3. **Volume too loud/quiet**:
   - Adjust the volume slider in audio settings
   - Check system volume
   - Verify audio file levels

### Browser-Specific Issues

1. **Chrome/Edge**:
   - May block autoplay initially
   - Click anywhere on the page to enable audio

2. **Firefox**:
   - Generally good audio support
   - May require user interaction first

3. **Safari**:
   - Strict autoplay policies
   - May require explicit user permission

4. **Mobile browsers**:
   - Often require user interaction before audio
   - May have limited background audio support

## 📱 Mobile Considerations

1. **Audio Policies**:
   - Many mobile browsers block autoplay
   - User must interact with page first
   - Background audio may be limited

2. **File Size**:
   - Keep audio files small for mobile
   - Use compressed formats (MP3)
   - Consider different quality for mobile

3. **Battery Life**:
   - Audio playback uses battery
   - Consider offering audio-free mode
   - Allow users to disable audio on mobile

## 🔮 Future Enhancements

### Potential Features

1. **Custom Audio Upload**:
   - Allow users to upload their own audio files
   - Support for multiple audio formats
   - Audio file management interface

2. **Advanced Audio Controls**:
   - Individual volume controls for each sound type
   - Audio fade in/out effects
   - Audio scheduling and playlists

3. **Integration Features**:
   - Spotify/Apple Music integration
   - YouTube audio integration
   - System audio level detection

4. **Accessibility**:
   - Visual audio indicators
   - Haptic feedback for mobile
   - Screen reader support

## 📚 Resources

### Audio Sources
- [Freesound.org](https://freesound.org/) - Free sound effects
- [Pixabay](https://pixabay.com/music/) - Free music
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - Free music
- [Zapsplat](https://www.zapsplat.com/) - Sound effects library

### Audio Tools
- [Audacity](https://www.audacityteam.org/) - Free audio editor
- [Online Audio Converter](https://online-audio-converter.com/) - Convert formats
- [Audio Trimmer](https://audiotrimmer.com/) - Trim audio files

### Documentation
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [HTML5 Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [Browser Audio Support](https://caniuse.com/?search=audio) 