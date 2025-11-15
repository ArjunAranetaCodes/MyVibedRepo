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
- **Expanded Playlist**: Supports 10+ songs including:
  - Chasing Neon Dreams (1 & 2)
  - Dusty Loops (1 & 2)
  - Golden Hour Glow (1 & 2)
  - Sunset Drifts (1 & 2)
  - Sunset Radiance (1 & 2)
- **Automatic Playback**: Music automatically plays when timer starts and pauses when timer is paused
- **Playlist Cycling**: Automatically cycles through all available songs when current song ends
- **Music Controls**:
  - **Mute/Unmute**: Toggle music on/off
  - **Play Mode**: Choose between Auto-play (syncs with timer) or Manual control
  - **Next/Previous Buttons**: Navigate to next or previous song in playlist
  - **Playlist List**: Scrollable list showing all songs with current song highlighted
  - **Current Song Display**: Shows "X/Total: Song Name" format
  - **Song Selection**: Manually select and play specific songs from dropdown or playlist list
  - **Clickable Playlist**: Click any song in the playlist list to play it immediately
- **Timer Synchronization**: Music state automatically syncs with timer state (plays when running, pauses when paused)

### 🎛️ Settings System

#### Settings Button
- **Location**: Bottom center, in the same row as pause/play, mode switch, and foreground toggle buttons
- **Icon**: ⚙️ (gear icon)
- **Function**: Opens a centered popup modal with all settings

#### Settings Popup
- **Access**: Click the settings button (⚙️) in the control row
- **Layout**: Centered modal with backdrop overlay
- **Close Options**: 
  - Click the × button in the header
  - Click outside the popup (on the overlay)
  - Automatically closes after applying settings
- **Sections**: Organized into collapsible sections:
  1. **Pomodoro** (🍅): Focus/Break settings and background options
  2. **Music** (🎵): Music controls and playlist management
  3. **Timer Settings** (⏱️): Hidden by default - Simple timer configuration

#### Music Section
- **Mute Toggle**: Button to mute/unmute background music
  - Button text changes to "Mute" or "Unmute" based on current state
- **Play Mode**: Dropdown to select music playback mode
  - **Auto-play with Timer**: Music automatically plays/pauses with timer (default)
  - **Manual Control**: Music is controlled independently of timer state
- **Now Playing Display**: Shows current song in format "X/Total: Song Name"
- **Navigation Controls**:
  - **Previous Button** (⏮): Skip to previous song in playlist
  - **Next Button** (⏭): Skip to next song in playlist
- **Playlist List**: Scrollable list displaying all songs
  - Shows numbered list (1, 2, 3, etc.) with formatted song names
  - Current song highlighted in purple with ▶ indicator
  - Click any song to play it immediately
  - Hover effects for better interaction
  - Max height with scrollbar for long playlists
- **Song Selection Dropdown**: Dropdown menu to choose from all available songs
- **Play Selected Button**: Plays the selected song from dropdown
- **Auto-cycling**: In auto mode, playlist automatically cycles to next song when current song ends

#### Pomodoro Section
- **Access**: Click settings button (⚙️) and navigate to Pomodoro section in popup
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
  - These do not reset timers or close the popup
- **Apply Button**: Applies the new settings and resets the timer
  - Enables Pomodoro mode (Focus/Break cycling)
  - Applies selected background style and colors
  - Resets timer state
  - Starts with Focus mode
  - Starts music if in auto mode
  - Closes the settings popup automatically

#### Timer Settings Section
- **Access**: Click settings button (⚙️) and navigate to Timer Settings section in popup (Note: This section is hidden by default)
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
  - Closes the settings popup automatically

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
- Settings popup system with Music, Pomodoro, and Timer Settings sections
- Settings button integrated into control row
- **Background music with playlist support**
  - Automatic music playback/pause with timer
  - Expanded playlist (10+ songs: Chasing Neon Dreams, Dusty Loops, Golden Hour Glow, Sunset Drifts, Sunset Radiance)
  - Music controls (mute, auto/manual mode, song selection)
  - Next/Previous navigation buttons
  - Interactive playlist list with clickable songs
  - Current song display showing song number and name
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
2. Click the settings button (⚙️) in the control row below the timer
3. Navigate to the **Pomodoro** section in the settings popup
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
2. Click the settings button (⚙️) in the control row below the timer
3. Note: Timer Settings section is hidden by default. To access it, you can modify the HTML to show it.
4. Navigate to the **Timer Settings** section in the settings popup (if visible)
5. Enter desired timer duration (in minutes)
6. (Optional) Select background type:
   - **Liquid Glass**: Animated gradient background (default)
   - **Solid Color**: Choose a solid background color
7. If using solid color, select your preferred color
8. Click "Apply" to start with new settings
9. Click the play/pause button (⏸/▶) below the timer to control the timer

#### Using Music Features
1. Click the settings button (⚙️) in the control row below the timer
2. Navigate to the **Music** section in the settings popup
3. **Mute/Unmute**: Click the mute button to toggle music on/off
4. **Play Mode**: Select from dropdown:
   - **Auto-play with Timer**: Music plays when timer runs, pauses when timer pauses (default)
   - **Manual Control**: Control music independently
5. **View Current Song**: See the currently playing song in the "Now Playing" display
6. **Navigate Songs**:
   - Click **Previous** (⏮) to go to the previous song
   - Click **Next** (⏭) to go to the next song
7. **Browse Playlist**: Scroll through the playlist list to see all available songs
8. **Select Song**:
   - Click any song in the playlist list to play it immediately
   - Or use the dropdown to select a song and click "Play Selected"
9. Music automatically starts when timer starts (in auto mode)
10. Playlist automatically cycles to the next song when current song ends (in auto mode)

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
- **Music files**: Place music files in the `hiphop_playlist/` folder (supports 10+ songs including Chasing Neon Dreams, Dusty Loops, Golden Hour Glow, Sunset Drifts, Sunset Radiance series)
- **Music sync**: In auto mode, music automatically plays/pauses with timer state
- **Picture-in-Picture**: Requires browser support for Picture-in-Picture API (Chrome, Edge recommended)
- **PiP fallback**: If PiP is not supported, falls back to popup window method

---

**Created with**: HTML5, CSS3, SVG, JavaScript (Vanilla)

