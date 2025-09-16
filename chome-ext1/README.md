# My Basic Chrome Extension

A simple Chrome extension with popup functionality, content script interaction, and background service worker.

## Features

- **Popup Interface**: Clean, modern popup with gradient design
- **Note Taking**: Save and retrieve notes using Chrome storage
- **Page Information**: Get current page title and URL
- **Text Highlighting**: Highlight selected text on any webpage
- **Data Management**: Clear stored data
- **Activity Logging**: Track extension usage
- **Background Processing**: Service worker for background tasks

## Files Structure

```
chome-ext1/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface
├── popup.js              # Popup functionality
├── content.js            # Content script for page interaction
├── content.css           # Content script styles
├── background.js         # Background service worker
├── icons/                # Extension icons (placeholder)
└── README.md             # This file
```

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `chome-ext1` folder
4. The extension will appear in your extensions list

## Usage

1. **Click the extension icon** in the toolbar to open the popup
2. **Save Notes**: Type a note and click "Save Note"
3. **Get Page Info**: Click "Get Page Info" to see current page details
4. **Highlight Text**: Select text on any page, then click "Highlight Text"
5. **Clear Data**: Click "Clear Data" to remove all stored information

## Development

The extension uses:
- **Manifest V3** (latest Chrome extension format)
- **Chrome Storage API** for data persistence
- **Content Scripts** for page interaction
- **Service Worker** for background tasks
- **Modern CSS** with gradients and animations

## Permissions

- `activeTab`: Access to the currently active tab
- `storage`: Local storage for saving data

## Browser Compatibility

- Chrome 88+ (Manifest V3 support required)
- Other Chromium-based browsers (Edge, Brave, etc.)

## Notes

- Icons are placeholder files - replace with actual PNG images
- The extension includes basic error handling and user feedback
- All data is stored locally in the browser

