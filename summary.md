# Character Generator - Feature Summary

## Core Features
- **AI-Powered Character Generation**: Creates comprehensive character profiles from simple identity/archetype inputs
- **Image Analysis Integration**: Upload character images for automated identity generation or appearance extraction
- **Multiple Export Formats**: Download profiles as text files, Markdown, or JSON
- **JSON Import/Export**: Save and reload character profiles for editing and sharing

## Character Profile Sections
1. **Greeting** (300 chars max) - Character's voice introduction
2. **Inner Description** (2000 chars) - Private thoughts, secrets, motivations
3. **Outer Description** (2000 chars) - Public persona, appearance, mannerisms
4. **Physical Description** - Detailed appearance and body language
5. **AI Image Generation Prompts** - 15 total prompts across 4 categories:
   - 3 Portrait prompts (different expressions/angles)
   - 3 Full body prompts (different poses/outfits)
   - 4 Action shot prompts (dynamic scenes)
   - 5 Slice of life prompts (everyday activities)
6. **Character Variations** - 5 creative alternatives with clickable generation
7. **Scenario Descriptions** - 5 personality showcases in different contexts
8. **Tags & Categories** - 10 descriptive character traits
9. **Example Dialogue** - Formatted conversation samples ({{char}}/{{user}} format)
10. **Name Suggestions** - 25 culturally appropriate names

## Image Upload Modes
- **"Inspire me!"** (default): Generates character identity/archetype from image
- **"Use me"**: Extracts detailed physical description as appearance reference
- **Drag-and-drop**: Images can be dropped directly onto the upload zone, in addition to the file picker, for either mode
- **Random Identity**: One-click button generates a random character identity/archetype without needing an image or manual typing

## Quality Features
- **Character Count Tracking**: Visual indicators for greeting, inner, and outer descriptions
- **Automatic Image Compression**: Handles large images with smart resizing
- **Copy Buttons**: Individual copy functionality for each section
- **File Name Sanitization**: Removes punctuation from download filenames
- **Error Handling**: Graceful failure management with user feedback

## User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Gradient themes, smooth animations, color-coded sections
- **Clickable Variations**: Generate new characters from suggested alternatives
- **Progress Indicators**: Loading states for AI generation and image analysis
- **Flipped.chat Integration**: Direct link for image prompt usage

## Technical Capabilities
- **High Token Limit**: 8000 tokens for comprehensive character generation
- **Structured JSON Output**: Consistent, parseable character data
- **Character Limits Enforcement**: Prevents API over-generation
- **Cross-platform Compatibility**: Works in modern web browsers

This is a complete character creation suite perfect for writers, game developers, roleplayers, and creative professionals who need detailed, consistent character profiles.

## Changelog

### v57
- Added drag-and-drop support to the image upload zone: the "Choose Image" area is now a droppable region (with dashed-border highlight on drag-over) that works for both "Inspire me!" and "Use me" modes, reusing the same resize/analysis pipeline as the file picker (refactored into a shared `processImageFile` function).
- Added a "Random" button next to the Character Identity input that instantly fills the field with a randomly selected character identity/archetype from a curated list of 40 varied concepts, clearing any active image reference. No API call required for this feature.

### v56
- Replaced the header avatar image with the user-supplied photo (embedded as a base64 data URI directly in the component), replacing the previous flipped.chat CDN-hosted placeholder image. No other functional, UI, or schema changes were made.

### v55
- Updated the Anthropic API model string in both `fetch` calls (character generation and image analysis) from `claude-sonnet-4-6` to `claude-sonnet-5`, aligning the artifact with the current Sonnet release. No functional, UI, or schema changes were made.

### v53
- Updated the Anthropic API model string in both `fetch` calls (character generation and image analysis) from the dated snapshot `claude-sonnet-4-20250514` to the current dateless model ID `claude-sonnet-4-6`, keeping the artifact aligned with the latest Sonnet release. No functional, UI, or schema changes were made.

### v52
- (Baseline reviewed in this pass — prior history not tracked in this summary.)
