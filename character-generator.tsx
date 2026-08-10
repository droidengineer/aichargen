import React, { useState } from 'react';
import { Sparkles, Copy, Check, Loader2, Download, Upload, X, FileJson, Moon, Sun } from 'lucide-react';

const VERSION = 'v56';

export default function CharacterGenerator() {
  const [identity, setIdentity] = useState('');
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [imageMode, setImageMode] = useState('inspire');
  const [imageDescription, setImageDescription] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Theme helper
  const t = {
    // Page background
    pageBg: darkMode ? 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50',
    // Cards
    card: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    cardShadow: darkMode ? 'shadow-lg shadow-black/30' : 'shadow-sm',
    // Text
    textPrimary: darkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-400',
    textBody: darkMode ? 'text-gray-200' : 'text-gray-700',
    // Inputs
    input: darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-purple-400 focus:border-transparent' : 'border-gray-300 text-gray-900 focus:ring-purple-500 focus:border-transparent',
    // Hover states
    hoverBg: darkMode ? 'hover:bg-gray-700 hover:text-gray-100' : 'hover:bg-gray-100 hover:text-gray-900',
    // Section labels
    label: darkMode ? 'text-gray-300' : 'text-gray-700',
    // Prompt items
    promptPurple: darkMode ? 'border-purple-700 bg-purple-950/50' : 'border-purple-200 bg-purple-50',
    promptBlue: darkMode ? 'border-blue-700 bg-blue-950/50' : 'border-blue-200 bg-blue-50',
    promptGreen: darkMode ? 'border-green-700 bg-green-950/50' : 'border-green-200 bg-green-50',
    promptAmber: darkMode ? 'border-amber-700 bg-amber-950/50' : 'border-amber-200 bg-amber-50',
    // Scenario bg
    scenarioBg: darkMode ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40' : 'bg-gradient-to-r from-purple-50 to-pink-50',
    scenarioLabel: darkMode ? 'text-purple-400' : 'text-purple-700',
    // Tags
    tagBg: darkMode ? 'bg-purple-900/50 text-purple-300 border-purple-700' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200',
    // Variation card
    variationCard: darkMode ? 'border-gray-600 bg-gradient-to-r from-gray-700 to-purple-900/40 hover:border-purple-500' : 'border-gray-200 bg-gradient-to-r from-gray-50 to-purple-50 hover:border-purple-400',
    variationBadge: darkMode ? 'bg-purple-900/60 text-purple-300' : 'bg-purple-100 text-purple-700',
    // Name pill
    namePill: darkMode ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-gray-200' : 'bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700',
    // Image reference box
    imageRefBg: darkMode ? 'bg-blue-900/40 border-blue-700' : 'bg-blue-50 border-blue-200',
    imageRefTitle: darkMode ? 'text-blue-300' : 'text-blue-900',
    // Analyzing text
    analyzingText: darkMode ? 'text-gray-400' : 'text-gray-600',
    // Toggle bg
    toggleBg: darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200',
  };

  const generateCharacter = async () => {
    if (!identity.trim()) return;

    setLoading(true);
    setCharacter(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-5",
          max_tokens: 8000,
          messages: [
            {
              role: "user",
              content: `Generate a complete character profile for: "${identity}"
${imageDescription ? `\n\nIMPORTANT: Use this physical description as the basis for the character's appearance in all descriptions:\n${imageDescription}\n` : ''}
Create a JSON response with this exact structure (no markdown, no preamble):
{
  "innerDescription": "EXACTLY 2000 character deep inner monologue revealing secrets, true motivations, fears, desires, hidden thoughts, internal conflicts, and goals that only the character knows. CRITICAL: This MUST be very close to 2000 characters, do not go over.",
  "outerDescription": "EXACTLY 2000 character public-facing description including physical appearance, demeanor, mannerisms, reputation, background that anyone could observe or know about them, notable quirks and habits. CRITICAL: This MUST be very close to 2000 characters, do not go over.",
  "physicalDescription": "Detailed physical description focusing on appearance, body language, clothing style, distinctive features, and how they carry themselves",
  "imagePrompts": {
    "portraits": [
      {"title": "Brief title for portrait 1","prompt": "Detailed image generation prompt for a portrait variation"},
      {"title": "Brief title for portrait 2","prompt": "Detailed image generation prompt for a portrait variation"},
      {"title": "Brief title for portrait 3","prompt": "Detailed image generation prompt for a portrait variation"}
    ],
    "fullBody": [
      {"title": "Brief title for full body 1","prompt": "Detailed image generation prompt for a full-body variation"},
      {"title": "Brief title for full body 2","prompt": "Detailed image generation prompt for a full-body variation"},
      {"title": "Brief title for full body 3","prompt": "Detailed image generation prompt for a full-body variation"}
    ],
    "action": [
      {"title": "Brief title for action shot 1","prompt": "Detailed image generation prompt for an action scene"},
      {"title": "Brief title for action shot 2","prompt": "Detailed image generation prompt for an action scene"},
      {"title": "Brief title for action shot 3","prompt": "Detailed image generation prompt for an action scene"},
      {"title": "Brief title for action shot 4","prompt": "Detailed image generation prompt for an action scene"}
    ],
    "sliceOfLife": [
      {"title": "Brief title for slice of life 1","prompt": "Detailed image generation prompt for everyday activity"},
      {"title": "Brief title for slice of life 2","prompt": "Detailed image generation prompt for everyday activity"},
      {"title": "Brief title for slice of life 3","prompt": "Detailed image generation prompt for everyday activity"},
      {"title": "Brief title for slice of life 4","prompt": "Detailed image generation prompt for everyday activity"},
      {"title": "Brief title for slice of life 5","prompt": "Detailed image generation prompt for everyday activity"}
    ]
  },
  "characterVariations": [
    {"title": "Brief creative title for variation 1","description": "Short description of how this variation differs from the original","identity": "Character identity/archetype string for this variation"},
    {"title": "Brief creative title for variation 2","description": "Short description of how this variation differs from the original","identity": "Character identity/archetype string for this variation"},
    {"title": "Brief creative title for variation 3","description": "Short description of how this variation differs from the original","identity": "Character identity/archetype string for this variation"},
    {"title": "Brief creative title for variation 4","description": "Short description of how this variation differs from the original","identity": "Character identity/archetype string for this variation"},
    {"title": "Brief creative title for variation 5","description": "Short description of how this variation differs from the original","identity": "Character identity/archetype string for this variation"}
  ],
  "scenarioDescriptions": [
    "Scenario 1: A situation that shows their personality in [specific context]",
    "Scenario 2: A situation that shows their personality in [different context]",
    "Scenario 3: A situation that shows their personality in [another context]",
    "Scenario 4: A situation that shows their personality in [yet another context]",
    "Scenario 5: A situation that shows their personality in [final unique context]"
  ],
  "exampleDialogue": "A dialogue exchange (3-5 back-and-forth exchanges) that captures their unique voice, speech patterns, and personality. Use {{char}} for the character's name and {{user}} for the other person. Do not use quotation marks around the dialogue. Format like: {{char}}: Hello there\\n{{user}}: Hi, how are you?\\n{{char}}: I'm doing well",
  "greeting": "A greeting message in the character's voice. CRITICAL: This MUST be 300 characters or less, do not exceed 300 characters.",
  "tags": ["10 descriptive tags or categories that define this character's key traits, themes, genres, archetypes, or characteristics"],
  "names": ["25 culturally and contextually appropriate name suggestions as an array of strings"]
}

Make the character feel alive, complex, and authentic. CRITICAL CHARACTER LIMITS - DO NOT EXCEED:
- greeting: MAXIMUM 300 characters
- innerDescription: MAXIMUM 2000 characters (aim for 1900-2000)
- outerDescription: MAXIMUM 2000 characters (aim for 1900-2000)
The 5 scenario descriptions should each be 200-300 characters and showcase different aspects of the character's personality in diverse situations. Image prompts should be detailed and optimized for AI image generation tools. For image prompts, create diverse variations: portraits should show different expressions/angles, full body should show different poses/outfits, action shots should show different dynamic scenes, and slice of life should capture mundane everyday moments that reveal character. Character variations should be creative reimaginings or novel applications of the core identity.`
            }
          ]
        })
      });

      const data = await response.json();
      const text = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("");

      const cleanText = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanText);
      setCharacter(parsed);
    } catch (error) {
      console.error("Generation error:", error);
      alert("Failed to generate character. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAnalyzingImage(true);

    try {
      const result = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const maxDimension = 1024;
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = (height / width) * maxDimension;
                width = maxDimension;
              } else {
                width = (width / height) * maxDimension;
                height = maxDimension;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            const base64 = dataUrl.split(',')[1];
            resolve({ dataUrl, base64 });
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setUploadedImage(result.dataUrl);

      const promptText = imageMode === 'inspire'
        ? "Analyze this image and create a concise character identity/archetype description (10-15 words max) that captures the essence of this character. Focus on their role, personality traits, setting, or distinctive characteristics. Just return the identity phrase, nothing else."
        : "Analyze this image and create a detailed physical character description (200-300 words) describing their appearance, clothing, body language, facial features, and any distinctive characteristics you observe. This will be used as reference material for character generation. Return only the description, nothing else.";

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-5",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: { type: "base64", media_type: "image/jpeg", data: result.base64 }
                },
                { type: "text", text: promptText }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      if (data.type === 'error') throw new Error(data.error.message || 'API returned an error');

      const generatedText = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("")
        .trim();

      if (imageMode === 'inspire') {
        setIdentity(generatedText);
        setImageDescription('');
      } else {
        setImageDescription(generatedText);
      }
    } catch (error) {
      console.error("Image analysis error:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setAnalyzingImage(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setIdentity('');
    setImageDescription('');
  };

  const downloadAsFile = () => {
    if (!character) return;
    const content = `CHARACTER PROFILE: ${identity.toUpperCase()}

================================================================================
GREETING
================================================================================
${character.greeting}

================================================================================
INNER DESCRIPTION (Private Knowledge)
================================================================================
${character.innerDescription}

================================================================================
OUTER DESCRIPTION (Public Persona)
================================================================================
${character.outerDescription}

================================================================================
PHYSICAL DESCRIPTION
================================================================================
${character.physicalDescription}

================================================================================
AI IMAGE GENERATION PROMPTS
================================================================================
PORTRAIT PROMPTS:
${character.imagePrompts.portraits.map((p, i) => `${i + 1}. ${p.title}\n   ${p.prompt}`).join('\n\n')}

FULL BODY PROMPTS:
${character.imagePrompts.fullBody.map((p, i) => `${i + 1}. ${p.title}\n   ${p.prompt}`).join('\n\n')}

ACTION SHOT PROMPTS:
${character.imagePrompts.action.map((p, i) => `${i + 1}. ${p.title}\n   ${p.prompt}`).join('\n\n')}

SLICE OF LIFE PROMPTS:
${character.imagePrompts.sliceOfLife.map((p, i) => `${i + 1}. ${p.title}\n   ${p.prompt}`).join('\n\n')}

================================================================================
CHARACTER VARIATIONS & IDEAS
================================================================================
${character.characterVariations.map((v, i) => `${i + 1}. ${v.title}\n   ${v.description}\n   Identity: ${v.identity}`).join('\n\n')}

================================================================================
SCENARIO DESCRIPTIONS
================================================================================
${character.scenarioDescriptions.map((scenario, i) => `${i + 1}. ${scenario}`).join('\n\n')}

================================================================================
TAGS & CATEGORIES
================================================================================
${character.tags.join(', ')}

================================================================================
EXAMPLE DIALOGUE
================================================================================
${character.exampleDialogue}

================================================================================
NAME SUGGESTIONS
================================================================================
${character.names.join('\n')}
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `character-${identity.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsMarkdown = () => {
    if (!character) return;
    const content = `# CHARACTER PROFILE: ${identity.toUpperCase()}

## Greeting
${character.greeting}

## Inner Description (Private Knowledge)
${character.innerDescription}

## Outer Description (Public Persona)
${character.outerDescription}

## Physical Description
${character.physicalDescription}

## AI Image Generation Prompts

### Portrait Prompts
${character.imagePrompts.portraits.map((p, i) => `${i + 1}. **${p.title}**\n${p.prompt}`).join('\n\n')}

### Full Body Prompts
${character.imagePrompts.fullBody.map((p, i) => `${i + 1}. **${p.title}**\n${p.prompt}`).join('\n\n')}

### Action Shot Prompts
${character.imagePrompts.action.map((p, i) => `${i + 1}. **${p.title}**\n${p.prompt}`).join('\n\n')}

### Slice of Life Prompts
${character.imagePrompts.sliceOfLife.map((p, i) => `${i + 1}. **${p.title}**\n${p.prompt}`).join('\n\n')}

## Character Variations & Ideas

${character.characterVariations.map((v, i) => `### ${i + 1}. ${v.title}\n${v.description}\n\n**Identity:** ${v.identity}`).join('\n\n')}

## Scenario Descriptions

${character.scenarioDescriptions.map((scenario, i) => `${i + 1}. ${scenario}`).join('\n\n')}

## Tags & Categories
${character.tags.map(tag => `\`${tag}\``).join(', ')}

## Example Dialogue
\`\`\`
${character.exampleDialogue}
\`\`\`

## Name Suggestions
${character.names.map(name => `- ${name}`).join('\n')}
`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `character-${identity.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsJSON = () => {
    if (!character) return;
    const jsonData = { identity, ...character };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `character-${identity.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleJSONImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      if (jsonData.identity) setIdentity(jsonData.identity);
      const { identity: _, ...characterData } = jsonData;
      setCharacter(characterData);
    } catch (error) {
      console.error("JSON import error:", error);
      alert("Failed to import JSON. Please ensure the file is properly formatted.");
    }
  };

  const PromptItem = ({ item, colorScheme, index }) => (
    <div className={`border-2 ${colorScheme.border} rounded-lg p-4 ${colorScheme.bg}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className={`font-semibold ${colorScheme.title}`}>
          {index}. {item.title}
        </h4>
        <button
          onClick={() => copyToClipboard(item.prompt, `${colorScheme.key}-${index}`)}
          className={`flex items-center gap-1 px-2 py-1 text-xs ${colorScheme.copyBtn} rounded transition-colors`}
        >
          {copiedSection === `${colorScheme.key}-${index}` ? (
            <><Check size={14} />Copied</>
          ) : (
            <><Copy size={14} />Copy</>
          )}
        </button>
      </div>
      <p className={`text-sm ${t.textBody} leading-relaxed`}>{item.prompt}</p>
    </div>
  );

  const Section = ({ title, content, sectionKey, maxChars }) => (
    <div className={`${t.card} rounded-lg p-6 ${t.cardShadow} border`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className={`text-lg font-semibold ${t.textPrimary}`}>{title}</h3>
          {maxChars && (
            <span className={`text-sm font-medium ${
              content.length > maxChars ? 'text-red-500' :
              content.length > maxChars * 0.9 ? 'text-amber-500' :
              t.textMuted
            }`}>
              {content.length}/{maxChars}
            </span>
          )}
        </div>
        <button
          onClick={() => copyToClipboard(content, sectionKey)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm ${t.textSecondary} ${t.hoverBg} rounded-md transition-colors`}
        >
          {copiedSection === sectionKey ? (
            <><Check size={16} />Copied</>
          ) : (
            <><Copy size={16} />Copy</>
          )}
        </button>
      </div>
      <div className={`${t.textBody} whitespace-pre-wrap leading-relaxed`}>{content}</div>
    </div>
  );

  // Dark mode color schemes for prompt categories
  const promptSchemes = {
    portrait: {
      border: darkMode ? 'border-purple-700' : 'border-purple-200',
      bg: darkMode ? 'bg-purple-950/50' : 'bg-purple-50',
      title: darkMode ? 'text-purple-300' : 'text-purple-900',
      copyBtn: darkMode ? 'text-purple-400 hover:text-purple-200 hover:bg-purple-900/50' : 'text-purple-600 hover:text-purple-900 hover:bg-purple-100',
      key: 'portrait',
    },
    fullbody: {
      border: darkMode ? 'border-blue-700' : 'border-blue-200',
      bg: darkMode ? 'bg-blue-950/50' : 'bg-blue-50',
      title: darkMode ? 'text-blue-300' : 'text-blue-900',
      copyBtn: darkMode ? 'text-blue-400 hover:text-blue-200 hover:bg-blue-900/50' : 'text-blue-600 hover:text-blue-900 hover:bg-blue-100',
      key: 'fullbody',
    },
    action: {
      border: darkMode ? 'border-green-700' : 'border-green-200',
      bg: darkMode ? 'bg-green-950/50' : 'bg-green-50',
      title: darkMode ? 'text-green-300' : 'text-green-900',
      copyBtn: darkMode ? 'text-green-400 hover:text-green-200 hover:bg-green-900/50' : 'text-green-600 hover:text-green-900 hover:bg-green-100',
      key: 'action',
    },
    sliceoflife: {
      border: darkMode ? 'border-amber-700' : 'border-amber-200',
      bg: darkMode ? 'bg-amber-950/50' : 'bg-amber-50',
      title: darkMode ? 'text-amber-300' : 'text-amber-900',
      copyBtn: darkMode ? 'text-amber-400 hover:text-amber-200 hover:bg-amber-900/50' : 'text-amber-600 hover:text-amber-900 hover:bg-amber-100',
      key: 'sliceoflife',
    },
  };

  return (
    <div className={`min-h-screen ${t.pageBg} p-6`}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Avatar + Title */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-400 shadow-md flex-shrink-0">
              <img
                src="data:image/jpeg;base64,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"
                alt="Scribe avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                Scribe's AI Character Generator
              </h1>
              <p className={`text-sm ${t.textSecondary} mt-0.5`}>
                Enter a character identity and watch AI bring them to life
              </p>
            </div>
          </div>

          {/* Right: Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border ${t.toggleBg} ${t.textSecondary} transition-all hover:scale-105`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-500" />}
            <span className="text-sm font-medium">{darkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Main input card */}
        <div className={`${t.card} rounded-xl shadow-lg border p-6 mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <label className={`block text-sm font-medium ${t.label} mb-2`}>
                Upload Character Image (Optional)
              </label>
              <div className="mb-3">
                <div className="flex items-center gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="imageMode"
                      value="inspire"
                      checked={imageMode === 'inspire'}
                      onChange={(e) => setImageMode(e.target.value)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className={`text-sm ${t.textSecondary}`}>Inspire me! (Generate identity)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="imageMode"
                      value="use"
                      checked={imageMode === 'use'}
                      onChange={(e) => setImageMode(e.target.value)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className={`text-sm ${t.textSecondary}`}>Use me (Extract appearance)</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 cursor-pointer transition-all">
                  <Upload size={20} />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={analyzingImage || loading}
                  />
                </label>
                {analyzingImage && (
                  <div className={`flex items-center gap-2 text-sm ${t.analyzingText}`}>
                    <Loader2 className="animate-spin" size={16} />
                    Analyzing image...
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium ${t.label} mb-2`}>
                Import Character JSON
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 cursor-pointer transition-all">
                <FileJson size={20} />
                Import JSON
                <input
                  type="file"
                  accept="application/json,.json"
                  onChange={handleJSONImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {uploadedImage && imageMode === 'inspire' && (
            <div className="mb-4">
              <div className="relative inline-block">
                <img src={uploadedImage} alt="Uploaded character" className="h-32 rounded-lg border-2 border-purple-400 shadow-sm" />
                <button onClick={removeImage} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
          {imageDescription && imageMode === 'use' && (
            <div className="mb-4">
              <div className={`relative p-4 ${t.imageRefBg} border-2 rounded-lg`}>
                <button onClick={removeImage} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  <X size={16} />
                </button>
                <div className={`text-sm font-medium ${t.imageRefTitle} mb-2`}>Character Appearance Reference:</div>
                <div className={`text-sm ${t.textBody} leading-relaxed`}>{imageDescription}</div>
              </div>
            </div>
          )}

          <label className={`block text-sm font-medium ${t.label} mb-2`}>
            Character Identity or Archetype
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateCharacter()}
              placeholder="e.g., mysterious librarian, cyberpunk hacker, medieval blacksmith..."
              className={`flex-1 px-4 py-3 border rounded-lg outline-none focus:ring-2 ${t.input}`}
              disabled={loading}
            />
            <button
              onClick={generateCharacter}
              disabled={loading || !identity.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} />Generating...</>
              ) : (
                <><Sparkles size={20} />Generate</>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {character && (
          <div className="space-y-6">
            <div className="flex justify-end gap-3">
              <button onClick={downloadAsFile} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                <Download size={20} />Download as Text File
              </button>
              <button onClick={downloadAsMarkdown} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <Download size={20} />Download as Markdown
              </button>
              <button onClick={downloadAsJSON} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                <FileJson size={20} />Export as JSON
              </button>
            </div>

            <Section title="Greeting" content={character.greeting} sectionKey="greeting" maxChars={300} />
            <Section title="Inner Description (Private Knowledge)" content={character.innerDescription} sectionKey="inner" maxChars={2000} />
            <Section title="Outer Description (Public Persona)" content={character.outerDescription} sectionKey="outer" maxChars={2000} />
            <Section title="Physical Description" content={character.physicalDescription} sectionKey="physical" />

            {/* Image Prompts */}
            <div className={`${t.card} rounded-lg p-6 ${t.cardShadow} border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${t.textPrimary}`}>AI Image Generation Prompts</h3>
                <a href="https://flipped.chat/how-to-create" target="_blank" rel="noopener noreferrer" className="text-sm text-purple-500 hover:text-purple-400 underline">
                  Use on Flipped.chat
                </a>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className={`font-semibold ${t.textPrimary} mb-3`}>Portrait Prompts</h4>
                  <div className="space-y-3">
                    {character.imagePrompts.portraits.map((item, i) => (
                      <PromptItem key={i} item={item} index={i + 1} colorScheme={promptSchemes.portrait} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold ${t.textPrimary} mb-3`}>Full Body Prompts</h4>
                  <div className="space-y-3">
                    {character.imagePrompts.fullBody.map((item, i) => (
                      <PromptItem key={i} item={item} index={i + 1} colorScheme={promptSchemes.fullbody} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold ${t.textPrimary} mb-3`}>Action Shot Prompts</h4>
                  <div className="space-y-3">
                    {character.imagePrompts.action.map((item, i) => (
                      <PromptItem key={i} item={item} index={i + 1} colorScheme={promptSchemes.action} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold ${t.textPrimary} mb-3`}>Slice of Life Prompts</h4>
                  <div className="space-y-3">
                    {character.imagePrompts.sliceOfLife.map((item, i) => (
                      <PromptItem key={i} item={item} index={i + 1} colorScheme={promptSchemes.sliceoflife} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Character Variations */}
            <div className={`${t.card} rounded-lg p-6 ${t.cardShadow} border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${t.textPrimary}`}>Character Variations & Ideas</h3>
                <button
                  onClick={() => copyToClipboard(character.characterVariations.map(v => `${v.title}\n${v.description}\nIdentity: ${v.identity}`).join('\n\n'), 'variations')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm ${t.textSecondary} ${t.hoverBg} rounded-md transition-colors`}
                >
                  {copiedSection === 'variations' ? <><Check size={16} />Copied</> : <><Copy size={16} />Copy</>}
                </button>
              </div>
              <p className={`text-sm ${t.textSecondary} mb-4`}>
                Click any variation below to generate a new character based on that concept
              </p>
              <div className="space-y-3">
                {character.characterVariations.map((variation, index) => (
                  <div
                    key={index}
                    onClick={() => { setIdentity(variation.identity); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`p-4 border-2 ${t.variationCard} rounded-lg hover:shadow-md transition-all cursor-pointer`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${t.textPrimary} mb-1`}>{variation.title}</h4>
                        <p className={`text-sm ${t.textSecondary} mb-2`}>{variation.description}</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 ${t.variationBadge} rounded-full text-xs font-medium`}>
                          <Sparkles size={12} />{variation.identity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scenario Descriptions */}
            <div className={`${t.card} rounded-lg p-6 ${t.cardShadow} border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${t.textPrimary}`}>Scenario Descriptions</h3>
                <button
                  onClick={() => copyToClipboard(character.scenarioDescriptions.join('\n\n'), 'scenarios')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm ${t.textSecondary} ${t.hoverBg} rounded-md transition-colors`}
                >
                  {copiedSection === 'scenarios' ? <><Check size={16} />Copied</> : <><Copy size={16} />Copy</>}
                </button>
              </div>
              <div className="space-y-4">
                {character.scenarioDescriptions.map((scenario, index) => (
                  <div key={index} className={`p-4 ${t.scenarioBg} rounded-lg`}>
                    <div className={`font-semibold ${t.scenarioLabel} mb-2`}>Scenario {index + 1}</div>
                    <div className={`${t.textBody} leading-relaxed`}>{scenario}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className={`${t.card} rounded-lg p-6 ${t.cardShadow} border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${t.textPrimary}`}>Tags & Categories</h3>
                <button
                  onClick={() => copyToClipboard(character.tags.join(', '), 'tags')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm ${t.textSecondary} ${t.hoverBg} rounded-md transition-colors`}
                >
                  {copiedSection === 'tags' ? <><Check size={16} />Copied</> : <><Copy size={16} />Copy</>}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {character.tags.map((tag, index) => (
                  <span key={index} className={`px-4 py-2 ${t.tagBg} rounded-full text-sm font-medium border`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Section title="Example Dialogue" content={character.exampleDialogue} sectionKey="dialogue" />

            {/* Names */}
            <div className={`${t.card} rounded-lg p-6 ${t.cardShadow} border`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${t.textPrimary}`}>Name Suggestions ({character.names.length})</h3>
                <button
                  onClick={() => copyToClipboard(character.names.join('\n'), 'names')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm ${t.textSecondary} ${t.hoverBg} rounded-md transition-colors`}
                >
                  {copiedSection === 'names' ? <><Check size={16} />Copied</> : <><Copy size={16} />Copy</>}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {character.names.map((name, index) => (
                  <div key={index} className={`px-3 py-2 ${t.namePill} rounded-md text-center text-sm font-medium hover:shadow-md transition-shadow cursor-default`}>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!character && !loading && (
          <div className={`text-center py-16 ${t.textMuted}`}>
            <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
            <p>Enter a character identity above to begin</p>
          </div>
        )}

        {/* Footer version */}
        <div className={`text-center mt-10 text-xs ${t.textMuted}`}>
          {VERSION}
        </div>
      </div>
    </div>
  );
}
