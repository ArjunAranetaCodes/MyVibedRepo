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
- **Auto-Pause on Completion**: When a timer finishes, it automatically pauses before starting the next cycle
  - User must click play to continue to the next session
  - Prevents interruptions and gives user control over session transitions

#### Timer Display
- **Real-Time Updates**: Updates every frame for smooth countdown
- **Format**: Displays time as MM:SS (e.g., 25:00, 05:00)
- **No Flicker**: Precise timing calculations prevent display flickering when starting new sessions

### 🎛️ Menu System

#### Main Menu
- **Location**: Top-left corner with hamburger icon (☰)
- **Menu Items**:
  - **Timer Settings** (⏱️): Simple timer configuration with background color options
  - **Pomodoro** (🍅): Full Pomodoro configuration with Focus/Break settings and individual color themes

#### Timer Settings Submenu
- **Access**: Hover over "Timer Settings" menu item to reveal submenu
- **Timer Input**: Text field to set timer duration in minutes (default: 25)
- **Background Type**: Dropdown to select background style
  - **Liquid Glass**: Animated gradient background with flowing effects (default)
  - **Solid Color**: Solid block color background
- **Color Picker**: Appears when "Solid Color" is selected
  - Choose any color for the background
  - Default: Dark blue-black (#0b0f14)
- **Apply Button**: Applies the new settings and resets the timer
  - Sets timer to simple focus-only mode (no Pomodoro cycling)
  - Applies selected background style
  - Resets timer state
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
- **Apply Button**: Applies the new settings and resets the timer
  - Enables Pomodoro mode (Focus/Break cycling)
  - Applies selected background style and colors
  - Resets timer state
  - Starts with Focus mode
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

### 📱 User Experience

#### Interaction Design
- **Click Outside to Close**: Menu closes when clicking outside
- **Smooth Transitions**: All UI changes use CSS transitions
- **Visual Feedback**: Hover states and active states for all interactive elements
- **Accessible Controls**: Large, clearly visible buttons and inputs

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
- Auto-pause on timer completion
- Complete menu system with Timer Settings and Pomodoro settings
- Smooth animations and transitions
- Responsive timer display
- Film grain overlay (liquid glass mode)
- Glass morphism UI styling
- Performance optimizations for different background modes

#### 🔮 Future Enhancements
- Sound notifications
- Session statistics
- Multiple timer presets
- Export/import settings
- Keyboard shortcuts

### 🚀 Usage

#### Using Pomodoro Mode
1. Open `liquid-glass-pomodoro.html` in a modern web browser
2. Click the menu button (☰) in the top-left corner
3. Hover over "Pomodoro" (🍅) to reveal settings
4. Enter desired Focus and Break times (in minutes)
5. (Optional) Select background type:
   - **Liquid Glass**: Animated gradient background (default)
   - **Solid Color**: Choose individual colors for Focus and Break sessions
6. If using solid colors, select your preferred Focus and Break colors
7. Click "Apply" to start with new settings
8. Click the play/pause button (⏸/▶) below the timer to control the timer

#### Using Simple Timer Mode
1. Open `liquid-glass-pomodoro.html` in a modern web browser
2. Click the menu button (☰) in the top-left corner
3. Hover over "Timer Settings" (⏱️) to reveal settings
4. Enter desired timer duration (in minutes)
5. (Optional) Select background type:
   - **Liquid Glass**: Animated gradient background (default)
   - **Solid Color**: Choose a solid background color
6. If using solid color, select your preferred color
7. Click "Apply" to start with new settings
8. Click the play/pause button (⏸/▶) below the timer to control the timer

### 📝 Notes

- The timer uses `performance.now()` for high-precision timing
- Liquid glass animations continue even when the timer is paused (when liquid glass mode is active)
- Solid color backgrounds disable animations to conserve performance
- Background colors switch automatically in Pomodoro mode when transitioning between Focus and Break
- Timer Settings creates a simple focus-only timer that doesn't cycle
- Pomodoro Settings enables Focus/Break cycling with automatic mode switching
- Timer state and background preferences are maintained in memory (resets on page refresh)
- Each mode (Timer Settings vs Pomodoro) has independent background color settings

---

**Created with**: HTML5, CSS3, SVG, JavaScript (Vanilla)

