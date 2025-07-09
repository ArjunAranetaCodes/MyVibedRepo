export interface AudioConfig {
  volume: number
  enabled: boolean
  backgroundMusic: boolean
  ambientSounds: boolean
}

class AudioService {
  private audioElements: Map<string, HTMLAudioElement> = new Map()
  private backgroundAudio: HTMLAudioElement | null = null
  private ambientAudio: HTMLAudioElement | null = null
  private config: AudioConfig = {
    volume: 0.5,
    enabled: true,
    backgroundMusic: false,
    ambientSounds: false
  }

  constructor() {
    this.loadConfig()
    this.preloadAudio()
  }

  private loadConfig(): void {
    const saved = localStorage.getItem('pomodoro-audio-config')
    if (saved) {
      this.config = { ...this.config, ...JSON.parse(saved) }
    }
  }

  private saveConfig(): void {
    localStorage.setItem('pomodoro-audio-config', JSON.stringify(this.config))
  }

  private preloadAudio(): void {
    // Preload notification sounds
    const notificationSounds = [
      'timer-end',
      'break-start', 
      'work-start',
      'task-complete'
    ]

    notificationSounds.forEach(sound => {
      const audio = new Audio(`/sounds/notifications/${sound}.mp3`)
      audio.preload = 'auto'
      audio.volume = this.config.volume
      this.audioElements.set(sound, audio)
    })
  }

  // Play notification sounds
  playTimerEnd(): void {
    if (!this.config.enabled) return
    this.playSound('timer-end')
  }

  playBreakStart(): void {
    if (!this.config.enabled) return
    this.playSound('break-start')
  }

  playWorkStart(): void {
    if (!this.config.enabled) return
    this.playSound('work-start')
  }

  playTaskComplete(): void {
    if (!this.config.enabled) return
    this.playSound('task-complete')
  }

  private playSound(soundName: string): void {
    const audio = this.audioElements.get(soundName)
    if (audio) {
      audio.currentTime = 0
      audio.volume = this.config.volume
      audio.play().catch(err => console.warn('Audio playback failed:', err))
    }
  }

  // Background music controls
  startBackgroundMusic(type: 'focus' | 'relax' = 'focus'): void {
    if (!this.config.backgroundMusic) return
    
    this.stopBackgroundMusic()
    
    this.backgroundAudio = new Audio(`/sounds/background/${type}-music.mp3`)
    this.backgroundAudio.loop = true
    this.backgroundAudio.volume = this.config.volume * 0.3 // Lower volume for background
    this.backgroundAudio.play().catch(err => console.warn('Background music failed:', err))
  }

  stopBackgroundMusic(): void {
    if (this.backgroundAudio) {
      this.backgroundAudio.pause()
      this.backgroundAudio = null
    }
  }

  // Ambient sounds
  startAmbientSound(type: 'rain' | 'nature' | 'cafe' = 'rain'): void {
    if (!this.config.ambientSounds) return
    
    this.stopAmbientSound()
    
    this.ambientAudio = new Audio(`/sounds/ambient/${type}.mp3`)
    this.ambientAudio.loop = true
    this.ambientAudio.volume = this.config.volume * 0.2 // Very low volume for ambient
    this.ambientAudio.play().catch(err => console.warn('Ambient sound failed:', err))
  }

  stopAmbientSound(): void {
    if (this.ambientAudio) {
      this.ambientAudio.pause()
      this.ambientAudio = null
    }
  }

  // Configuration methods
  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume))
    this.saveConfig()
    
    // Update all audio elements
    this.audioElements.forEach(audio => {
      audio.volume = this.config.volume
    })
    
    if (this.backgroundAudio) {
      this.backgroundAudio.volume = this.config.volume * 0.3
    }
    
    if (this.ambientAudio) {
      this.ambientAudio.volume = this.config.volume * 0.2
    }
  }

  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled
    this.saveConfig()
    
    if (!enabled) {
      this.stopBackgroundMusic()
      this.stopAmbientSound()
    }
  }

  setBackgroundMusic(enabled: boolean): void {
    this.config.backgroundMusic = enabled
    this.saveConfig()
    
    if (!enabled) {
      this.stopBackgroundMusic()
    }
  }

  setAmbientSounds(enabled: boolean): void {
    this.config.ambientSounds = enabled
    this.saveConfig()
    
    if (!enabled) {
      this.stopAmbientSound()
    }
  }

  getConfig(): AudioConfig {
    return { ...this.config }
  }

  // Stop all audio
  stopAll(): void {
    this.stopBackgroundMusic()
    this.stopAmbientSound()
    this.audioElements.forEach(audio => {
      audio.pause()
      audio.currentTime = 0
    })
  }
}

// Export singleton instance
export const audioService = new AudioService() 