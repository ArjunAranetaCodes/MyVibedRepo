# Liquid Glass Pomodoro Timer

A beautiful, full-screen Pomodoro timer with a stunning liquid glass visual effect and smooth animations.

## Features

### 🎨 Visual Features

- **Liquid Glass Background**: Animated gradient background with SVG turbulence filters creating a flowing, liquid glass effect
- **Dynamic Color Shifts**: HSL-based color animation that continuously shifts gradient colors for a living, breathing aesthetic
- **Customizable Backgrounds**: Switch between animated liquid glass or solid block colors
- **Individual Color Themes**: Set separate background colors for Focus and Break sessions in Pomodoro mode
- **Automatic Color Transitions**: Background color switches automatically when transitioning between Focus and Break
- **Film Grain Overlay**: Subtle animated film grain texture for added depth and visual interest (only in liquid glass mode)
- **Large Timer Display**: Prominent, centered timer display with white text and stroke effects for maximum readability
- **Tab Title Timer**: Browser tab title shows live time, play/pause state, and mode (Focus/Break)
- **Glass Morphism UI**: Frosted glass effect on menu and controls using backdrop blur

### ⏱️ Timer Features

#### Pomodoro Technique Support
- **Focus/Break Cycles**: Alternates between Focus and Break sessions
- **Customizable Durations**: Set custom Focus and Break times via the menu
- **Default Values**: Starts with 25 minutes Focus and 5 minutes Break (classic Pomodoro)
- **Automatic Switching**: Automatically transitions between Focus and Break modes

#### Timer Controls
- **Pause/Play Button**: Large circular button positioned below the timer
  - Pause: Temporarily stops the countdown while preserving elapsed time
  - Play: Resumes from where it was paused
  - Visual feedback with hover effects and smooth transitions
  - Music automatically pauses/resumes with timer (in auto mode)
- **Mode Switch Button** (🔄): Visible only in Pomodoro mode
  - Allows manual switching between Focus and Break modes
  - Positioned to the right of the pause/play button
  - Timer pauses automatically after switching
- **Foreground Toggle Button** (📱): Opens timer in Picture-in-Picture mode
  - Creates a floating window without browser chrome
  - Timer remains visible even when main tab is switched or browser is minimized
  - Positioned to the right of the mode switch button
- **Auto-Pause on Completion**: When a timer finishes, it automatically pauses before starting the next cycle
  - User must click play to continue to the next session
  - Prevents interruptions and gives user control over session transitions
  - Music automatically pauses when timer completes

#### Timer Display
- **Real-Time Updates**: Updates every frame for smooth countdown
- **Format**: Displays time as MM:SS (e.g., 25:00, 05:00)
- **No Flicker**: Precise timing calculations prevent display flickering when starting new sessions

### 🎵 Music Features

- **Background Music Playlist**: Play music from the hiphop_playlist folder while timers are running
- **Automatic Playback**: Music automatically plays when timer starts and pauses when timer is paused
- **Playlist Cycling**: Automatically cycles through available songs (dusty_loops1.mp3, dusty_loops2.mp3)
- **Music Controls**:
  - **Mute/Unmute**: Toggle music on/off
  - **Play Mode**: Choose between Auto-play (syncs with timer) or Manual control
  - **Song Selection**: Manually select and play specific songs from the playlist
- **Timer Synchronization**: Music state automatically syncs with timer state (plays when running, pauses when paused)

### 🎛️ Menu System

#### Main Menu
- **Location**: Top-left corner with hamburger icon (☰)
- **Menu Items**:
  - **Timer Settings** (⏱️): Hidden by default - Simple timer configuration with background color options
  - **Music** (🎵): Music controls including mute, play mode, and song selection
  - **Pomodoro** (🍅): Full Pomodoro configuration with Focus/Break settings and individual color themes

#### Music Submenu
- **Access**: Hover over "Music" (🎵) menu item to reveal submenu
- **Mute Toggle**: Button to mute/unmute background music
  - Button text changes to "Mute" or "Unmute" based on current state
- **Play Mode**: Dropdown to select music playback mode
  - **Auto-play with Timer**: Music automatically plays/pauses with timer (default)
  - **Manual Control**: Music is controlled independently of timer state
- **Song Selection**: Dropdown to choose from available songs
  - Dusty Loops 1
  - Dusty Loops 2
- **Play Selected Button**: Plays the selected song (works in manual mode)
- **Auto-cycling**: In auto mode, playlist automatically cycles to next song when current song ends

#### Timer Settings Submenu
- **Access**: Hover over "Timer Settings" menu item to reveal submenu (Note: This menu item is hidden by default)
- **Timer Input**: Text field to set timer duration in minutes (default: 25)
- **Background Type**: Dropdown to select background style
  - **Liquid Glass**: Animated gradient background with flowing effects (default)
  - **Solid Color**: Solid block color background
- **Color Picker**: Appears when "Solid Color" is selected
  - Choose any color for the background
  - Default: Dark blue-black (#0b0f14)
- **Dropdown Styling**: Background dropdown uses a black menu/selection for clarity
- **Apply Button**: Applies the new settings and resets the timer
  - Sets timer to simple focus-only mode (no Pomodoro cycling)
  - Applies selected background style
  - Resets timer state
  - Starts music if in auto mode
  - Closes the menu automatically

#### Pomodoro Submenu
- **Access**: Hover over "Pomodoro" menu item to reveal submenu
- **Focus Input**: Text field to set Focus duration in minutes (default: 25)
- **Break Input**: Text field to set Break duration in minutes (default: 5)
- **Background Type**: Dropdown to select background style
  - **Liquid Glass**: Animated gradient background with flowing effects (default)
  - **Solid Color**: Solid block color background with individual Focus/Break colors
- **Focus Color Picker**: Appears when "Solid Color" is selected
  - Choose background color for Focus sessions
  - Default: Dark blue-black (#0b0f14)
- **Break Color Picker**: Appears when "Solid Color" is selected
  - Choose background color for Break sessions
  - Default: Darker blue-gray (#1a2f3a)
- **Set Buttons**: Buttons to the right of each color picker
  - "Set" next to Focus color instantly applies the chosen Focus color (when in Focus mode and Solid Color is selected)
  - "Set" next to Break color instantly applies the chosen Break color (when in Break mode and Solid Color is selected)
  - These do not reset timers or close the menu
- **Apply Button**: Applies the new settings and resets the timer
  - Enables Pomodoro mode (Focus/Break cycling)
  - Applies selected background style and colors
  - Resets timer state
  - Starts with Focus mode
  - Starts music if in auto mode
  - Closes the menu automatically

### 🎬 Animation System

#### Background Animations
- **Gradient Animation**: Three-stop gradient with independent hue rotation speeds (liquid glass mode only)
- **Turbulence Morphing**: Base frequency and seed values animate for organic flow (liquid glass mode only)
- **Continuous Loops**: Animations continue indefinitely when liquid glass is active, independent of timer state
- **Performance Optimized**: Animations are automatically disabled when using solid color backgrounds to conserve resources

#### Timer Animations
- **Frame-Based Updates**: Uses `requestAnimationFrame` for smooth 60fps updates
- **Performance Optimized**: Efficient calculations ensure smooth performance
- **Separate Animation Loops**: Background and timer run independently

### 💻 Technical Implementation

#### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with backdrop filters, transforms, and animations
- **SVG Filters**: FeTurbulence and FeDisplacementMap for liquid glass effect
- **Vanilla JavaScript**: No dependencies, pure JavaScript implementation
- **Canvas API**: For film grain generation and animation

#### Key Algorithms
- **HSL to Hex Conversion**: Custom algorithm for color space conversion
- **Elapsed Time Tracking**: Precise timing using `performance.now()` API
- **Pause State Management**: Accumulates elapsed time during pauses
- **Mode Switching Logic**: Automatic transition between Focus and Break modes

#### Performance Optimizations
- **Efficient Selectors**: Minimal DOM queries with cached references
- **Throttled Calculations**: Smart time calculations prevent unnecessary work
- **Animation Frame Management**: Proper cleanup and restart logic

### 📱 Foreground Display (Picture-in-Picture)

- **Picture-in-Picture Mode**: Click the foreground toggle button (📱) to open timer in a floating window
- **Chrome-Free Window**: Uses Picture-in-Picture API to create a window without browser chrome
- **Persistent Display**: Timer remains visible even when:
  - Main browser tab is switched
  - Browser is minimized
  - Other applications are in focus
- **Real-Time Updates**: Timer updates in real-time in the PiP window
- **Window Size**: 400×300 pixels with large, readable timer display
- **Display Content**:
  - Large timer text (72px font)
  - Mode label (Focus/Break/Timer)
  - Clean, minimal design with dark background
- **Browser Support**: Works in Chrome, Edge, and other browsers with Picture-in-Picture API support
- **Fallback**: If PiP is not supported, falls back to popup window method

### 📱 User Experience

#### Interaction Design
- **Click Outside to Close**: Menu closes when clicking outside
- **Smooth Transitions**: All UI changes use CSS transitions
- **Visual Feedback**: Hover states and active states for all interactive elements
- **Accessible Controls**: Large, clearly visible buttons and inputs
- **Color Picker Hover Behavior**: Color pickers stay visible while hovering their submenu and hide shortly after the cursor leaves, preventing accidental closing when moving to buttons

#### Timer Workflow (Pomodoro Mode)
1. **Initialization**: Timer starts paused or with default settings
2. **Configuration**: User sets Focus and Break durations via Pomodoro menu
3. **Background Setup** (Optional): Choose liquid glass or solid colors for Focus and Break
4. **Start**: User clicks play to begin Focus session
5. **Work Phase**: Timer counts down from Focus duration
6. **Auto-Pause**: Timer pauses automatically when Focus completes
   - Background color switches to Break color (if solid color mode is enabled)
7. **Break**: User clicks play to begin Break session
   - Background shows Break color (if solid color mode is enabled)
8. **Repeat**: Cycle continues: Break → Auto-Pause → Focus → Auto-Pause → ...
   - Background colors switch automatically between Focus and Break colors

#### Simple Timer Workflow
1. **Configuration**: User sets timer duration via Timer Settings menu
2. **Background Setup** (Optional): Choose liquid glass or solid color background
3. **Start**: User clicks play to begin timer
4. **Countdown**: Timer counts down from set duration
5. **Completion**: Timer auto-pauses when finished (no mode switching)

### 🎯 Current Status

#### ✅ Completed Features
- Liquid glass background with animated gradients
- Pomodoro timer with Focus/Break cycling
- Simple timer mode (focus-only, no cycling)
- Customizable Focus and Break durations
- Customizable timer duration (simple mode)
- Background color customization
  - Switch between liquid glass and solid colors
  - Individual colors for Focus and Break sessions
  - Automatic color transitions in Pomodoro mode
- Pause/Play functionality
- Mode switch button for manual Focus/Break switching
- Auto-pause on timer completion
- Complete menu system with Music, Timer Settings, and Pomodoro settings
- **Background music with playlist support**
  - Automatic music playback/pause with timer
  - Playlist cycling (dusty_loops1.mp3, dusty_loops2.mp3)
  - Music controls (mute, auto/manual mode, song selection)
- **Picture-in-Picture foreground display**
  - Floating timer window without browser chrome
  - Persistent display across tab switches
  - Real-time timer updates
- Smooth animations and transitions
- Responsive timer display
- Film grain overlay (liquid glass mode)
- Glass morphism UI styling
- Performance optimizations for different background modes

#### 🔮 Future Enhancements
- Sound notifications (timer completion sound already implemented)
- Session statistics
- Multiple timer presets
- Export/import settings
- Keyboard shortcuts
- Additional music playlists
- Volume control for music

### 🚀 Usage

#### Using Pomodoro Mode
1. Open `index.html` in a modern web browser
2. Click the menu button (☰) in the top-left corner
3. Hover over "Pomodoro" (🍅) to reveal settings
4. Enter desired Focus and Break times (in minutes)
5. (Optional) Select background type:
   - **Liquid Glass**: Animated gradient background (default)
   - **Solid Color**: Choose individual colors for Focus and Break sessions
6. If using solid colors, select your preferred Focus and Break colors
7. Optionally click "Set" next to a color to apply it immediately without resetting the timer
8. Click "Apply" to start with new settings (resets timer and enables cycling)
9. Click the play/pause button (⏸/▶) below the timer to control the timer
10. (Optional) Click the foreground toggle button (📱) to open timer in Picture-in-Picture mode

#### Using Simple Timer Mode
1. Open `index.html` in a modern web browser
2. Click the menu button (☰) in the top-left corner
3. Note: Timer Settings menu is hidden by default. To access it, you can modify the HTML to show it.
4. Hover over "Timer Settings" (⏱️) to reveal settings (if visible)
5. Enter desired timer duration (in minutes)
6. (Optional) Select background type:
   - **Liquid Glass**: Animated gradient background (default)
   - **Solid Color**: Choose a solid background color
7. If using solid color, select your preferred color
8. Click "Apply" to start with new settings
9. Click the play/pause button (⏸/▶) below the timer to control the timer

#### Using Music Features
1. Click the menu button (☰) in the top-left corner
2. Hover over "Music" (🎵) to reveal music controls
3. **Mute/Unmute**: Click the mute button to toggle music on/off
4. **Play Mode**: Select from dropdown:
   - **Auto-play with Timer**: Music plays when timer runs, pauses when timer pauses (default)
   - **Manual Control**: Control music independently
5. **Song Selection**: Choose a song from the dropdown
6. **Play Selected**: Click "Play Selected" to play the chosen song (manual mode)
7. Music automatically starts when timer starts (in auto mode)

#### Using Picture-in-Picture Mode
1. Start a timer (Pomodoro or Simple mode)
2. Click the foreground toggle button (📱) below the timer
3. A floating window will appear with the timer display
4. The window has no browser chrome and stays visible even when switching tabs
5. Timer updates in real-time in the PiP window
6. Click the button again or close the PiP window to exit

### 📝 Notes

- The timer uses `performance.now()` for high-precision timing
- Liquid glass animations continue even when the timer is paused (when liquid glass mode is active)
- Solid color backgrounds disable animations to conserve performance
- Background colors switch automatically in Pomodoro mode when transitioning between Focus and Break
- Timer Settings creates a simple focus-only timer that doesn't cycle (menu item is hidden by default)
- Pomodoro Settings enables Focus/Break cycling with automatic mode switching
- Timer state and background preferences are maintained in memory (resets on page refresh)
- Each mode (Timer Settings vs Pomodoro) has independent background color settings
- The browser tab title reflects the live timer, play/pause state, and current mode
- Background dropdowns use a black background for the menu and selection
- **Music files**: Place music files in the `hiphop_playlist/` folder (currently supports dusty_loops1.mp3 and dusty_loops2.mp3)
- **Music sync**: In auto mode, music automatically plays/pauses with timer state
- **Picture-in-Picture**: Requires browser support for Picture-in-Picture API (Chrome, Edge recommended)
- **PiP fallback**: If PiP is not supported, falls back to popup window method

---

**Created with**: HTML5, CSS3, SVG, JavaScript (Vanilla)

