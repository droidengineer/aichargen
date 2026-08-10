import React, { useState } from 'react';
import { Sparkles, Copy, Check, Loader2, Download, Upload, X, FileJson, Moon, Sun } from 'lucide-react';

const VERSION = 'v55';

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
                src="https://cdn4.flipped.chat/100x0,jpeg,q60/https://xddcdn.psyckey.com/200669482279596272/142825094895374336.jpeg"
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
