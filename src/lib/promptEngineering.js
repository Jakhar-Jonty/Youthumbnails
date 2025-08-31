// lib/promptEngineering.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class ThumbnailPromptEngineer {
  static determineThumbnailType(userMessage, userContext) {
    const verticalKeywords = [
      "shorts",
      "short",
      "vertical",
      "reel",
      "tiktok",
      "9:16",
      "mobile",
      "stories",
    ];
    const combinedText = (userMessage + " " + userContext).toLowerCase();

    return verticalKeywords.some((keyword) => combinedText.includes(keyword))
      ? "vertical"
      : "landscape";
  }

  // Updated to use GPT-4.1 for better prompt enhancement
  static async enhancePrompt(
    userMessage,
    userContext,
    userUploadedImageUrl,
    thumbnailType,
    imagePlacement,
    isImageTweakRequest = false
  ) {
    const enhancementPrompt = `You are an expert YouTube thumbnail designer and master of generative AI prompting. Transform this request into a hyper-detailed prompt for Gemini image generation.

---
## CONTEXT ##
- USER'S REQUEST: "${userMessage}"
- VIDEO CATEGORY: "${this.extractContentCategory(userMessage, userContext)}"
- FORMAT: "${thumbnailType === "vertical" ? "9:16 YouTube Shorts" : "16:9 YouTube Video"}"
- USER IMAGE: ${userUploadedImageUrl ? `Provided - place on ${imagePlacement}` : "None"}
- IMAGE TWEAKING: ${isImageTweakRequest ? "YES - User wants to modify their uploaded image" : "NO"}

---
## TASK ##
Create ONE vivid, detailed paragraph that seamlessly integrates:

**Visual Elements:**
- Main subject with dynamic action/pose
- Photographic composition (camera angle, shot type, framing)
- Cinematic lighting (dramatic shadows, highlights, color temperature)
- High-contrast color palette (2-3 vibrant colors that pop against YouTube's interface)

**Technical Requirements:**
- YouTube thumbnail optimization (high contrast, readable at small sizes)
- ${thumbnailType === "vertical" ? "Vertical 9:16 mobile-first design" : "Horizontal 16:9 desktop-focused layout"}
- Professional composition using rule of thirds
- Bold visual hierarchy for maximum click-through

${userUploadedImageUrl ? `
**Image Integration Instructions:**
- ${isImageTweakRequest ? 
  `MODIFY the user's uploaded image by: enhancing colors, adding effects, improving lighting, or adjusting composition while keeping the core subject recognizable` :
  `SEAMLESSLY BLEND the user's uploaded image into the ${imagePlacement} position of the composition`}
- Ensure the user image ${isImageTweakRequest ? "remains the main focus but is enhanced" : `is prominently featured in the ${imagePlacement} area`}
- Create visual harmony between the user image and generated elements` : ""}

**Style for ${this.extractContentCategory(userMessage, userContext)}:**
${this.getCategoryStyleGuidance(this.extractContentCategory(userMessage, userContext))}

Output ONLY the final enhanced prompt paragraph - no explanations or formatting.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Use GPT-4o which supports better reasoning
        messages: [{ role: "user", content: enhancementPrompt }],
        temperature: 0.7,
        max_tokens: 500,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      return this.createFallbackPrompt(
        userMessage,
        thumbnailType,
        imagePlacement,
        isImageTweakRequest
      );
    }
  }

  static createFallbackPrompt(userMessage, thumbnailType, imagePlacement, isImageTweakRequest = false) {
    const isVertical = thumbnailType === "vertical";
    let fallbackPrompt = `Professional YouTube ${isVertical ? "Shorts" : ""} thumbnail for: ${userMessage}. `;
    fallbackPrompt += `High contrast, vibrant colors, ${isVertical ? "9:16 vertical" : "16:9 landscape"} aspect ratio, `;
    fallbackPrompt += `eye-catching design, bold composition, optimized for click-through.`;

    if (imagePlacement && isImageTweakRequest) {
      fallbackPrompt += ` Enhance and modify the user's uploaded image with improved lighting, colors, and effects while keeping it recognizable.`;
    } else if (imagePlacement) {
      fallbackPrompt += ` Seamlessly integrate user image in ${imagePlacement} position.`;
    }

    return fallbackPrompt;
  }

  // Enhanced category detection including adventure vlogging
  static extractContentCategory(message, userContext = "") {
    const categories = {
      adventure: [
        "adventure",
        "vlogging",
        "adventure vlog",
        "outdoor",
        "hiking",
        "climbing",
        "expedition",
        "survival",
        "extreme",
        "wilderness",
        "backpacking",
        "camping"
      ],
      gaming: [
        "game",
        "gaming",
        "gameplay",
        "stream",
        "esports",
        "console",
        "pc gaming",
        "mobile game",
      ],
      food: [
        "food",
        "recipe",
        "cooking",
        "restaurant",
        "chef",
        "meal",
        "kitchen",
        "baking",
      ],
      travel: [
        "travel",
        "trip",
        "vacation",
        "destination",
        "explore",
        "visit",
        "city",
        "country"
      ],
      tech: [
        "tech",
        "technology",
        "review",
        "unboxing",
        "gadget",
        "software",
        "app",
        "device",
      ],
      lifestyle: [
        "lifestyle",
        "vlog",
        "daily",
        "routine",
        "fashion",
        "beauty",
        "fitness",
        "health",
      ],
      education: [
        "tutorial",
        "how to",
        "learn",
        "education",
        "course",
        "guide",
        "tips",
        "explain",
      ],
      entertainment: [
        "funny",
        "comedy",
        "entertainment",
        "reaction",
        "drama",
        "story",
        "viral",
      ],
    };

    const text = (message + " " + userContext).toLowerCase();

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => text.includes(keyword))) {
        return category;
      }
    }

    return "general";
  }

  // Category-specific style guidance
  static getCategoryStyleGuidance(category) {
    const styleGuides = {
      adventure: "Use dramatic outdoor lighting, dynamic action poses, vibrant nature colors (#ff6b35, #32cd32, #87ceeb), weathered textures, and epic landscape elements that convey excitement and exploration.",
      gaming: "Use vibrant neon colors (#00ff00, #ff0080, #0080ff), action-packed composition, gaming UI elements, dramatic lighting effects, high energy.",
      food: "Use warm, appetizing colors (#ff6b35, #f7931e, #ffd700), mouth-watering presentation, clean composition, natural lighting that makes food look delicious.",
      travel: "Use scenic landscapes, cultural elements (#87ceeb, #ffa500, #32cd32), bright outdoor lighting, wanderlust-inspiring composition.",
      tech: "Use sleek, modern design (#007acc, #c0c0c0, #4169e1), clean lines, futuristic elements, professional tech aesthetic.",
      lifestyle: "Use warm, relatable tones (#ffc0cb, #dda0dd, #f0e68c), authentic moments, soft lighting, aspirational but approachable.",
      education: "Use clear, professional design (#4169e1, #2f4f4f, #008080), readable fonts, organized layout, trustworthy appearance.",
      entertainment: "Use bold, eye-catching colors (#ff1493, #ff4500, #ffd700), dynamic composition, expressive elements, high energy.",
      general: "Use versatile, attention-grabbing design with balanced composition and universal appeal."
    };

    return styleGuides[category] || styleGuides.general;
  }

  static getContentCategoryPrompt(category, basePrompt) {
    const enhancement = this.getCategoryStyleGuidance(category);
    return `${basePrompt} - CATEGORY STYLE: ${enhancement}`;
  }
}

export class ThumbnailOptimizer {
  static async optimizeForClickthrough(prompt, options = {}) {
    const { userContext, category } = options;

    const optimizationPrompt = `Optimize this thumbnail concept for maximum YouTube clickthrough rate:

BASE CONCEPT: ${prompt}
CATEGORY: ${category || "general"}

Apply YouTube thumbnail best practices:
1. Faces should be 25-30% of the image for emotional connection
2. Use contrasting colors that pop against YouTube's white/dark interface
3. Text should be large and readable on mobile (minimum 24pt equivalent)
4. Create visual hierarchy with size and contrast
5. Include curiosity gaps or surprising elements
6. Use arrows, circles, or highlighting for attention direction
7. Ensure design works at small sizes (120x68px preview)
8. Apply rule of thirds for composition
9. Use emotions and expressions to create connection
10. Make it scroll-stopping and click-worthy

Enhance the prompt to include these optimizations while maintaining the original concept.

Return only the optimized prompt.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Use GPT-4o for optimization
        messages: [{ role: "user", content: optimizationPrompt }],
        temperature: 0.6,
        max_tokens: 500,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error optimizing prompt:", error);
      return prompt;
    }
  }
}

// Smart questionnaire that asks fewer, more targeted questions
export class ThumbnailQuestionnaire {
  static generateSmartSummary(userMessage, category, hasUploadedImage, imagePlacement) {
    const categoryDefaults = {
      adventure: {
        style: "epic and dramatic",
        colors: "vibrant oranges and blues",
        mood: "exciting exploration",
        font: "bold adventure-style"
      },
      gaming: {
        style: "high-energy and competitive",
        colors: "neon greens and electric blues", 
        mood: "intense action",
        font: "bold gaming"
      },
      food: {
        style: "appetizing and clean",
        colors: "warm oranges and golds",
        mood: "mouth-watering",
        font: "elegant food typography"
      },
      travel: {
        style: "inspiring wanderlust",
        colors: "sky blues and sunset oranges",
        mood: "adventurous discovery", 
        font: "clean travel"
      },
      tech: {
        style: "sleek and modern",
        colors: "tech blues and silvers",
        mood: "innovative",
        font: "clean sans-serif"
      },
      lifestyle: {
        style: "aspirational yet relatable",
        colors: "soft pinks and warm beiges",
        mood: "inspiring daily life",
        font: "friendly modern"
      },
      education: {
        style: "trustworthy and clear",
        colors: "professional blues and greens", 
        mood: "educational authority",
        font: "clear readable"
      },
      entertainment: {
        style: "bold and energetic",
        colors: "vibrant magentas and yellows",
        mood: "fun entertainment",
        font: "playful bold"
      },
      general: {
        style: "professional and engaging",
        colors: "high-contrast vibrant",
        mood: "attention-grabbing",
        font: "bold readable"
      }
    };

    const defaults = categoryDefaults[category] || categoryDefaults.general;
    const placement = imagePlacement || "center";
    
    return `I'll create your ${category === "adventure" ? "adventure vlogging" : category} thumbnail with a ${defaults.style} style using ${defaults.colors} colors and ${defaults.font} fonts. ${hasUploadedImage ? `I'll place your image in the ${placement} with ${defaults.mood} composition.` : `The design will have a ${defaults.mood} feel.`}`;
  }

  static generateQuickConfirmation(userMessage, category, hasUploadedImage, imagePlacement) {
    const summary = this.generateSmartSummary(userMessage, category, hasUploadedImage, imagePlacement);
    
    return `${summary} Would you like me to create this now, or do you want to adjust the style, colors, or placement?`;
  }
}

// Utility functions for thumbnail creation
export class ThumbnailUtils {
  static getOptimalDimensions(thumbnailType) {
    return thumbnailType === "vertical"
      ? { width: 1080, height: 1920, aspectRatio: "9:16" }
      : { width: 1280, height: 720, aspectRatio: "16:9" };
  }

  static detectImageTweakRequest(userMessage) {
    const tweakKeywords = [
      "edit",
      "modify",
      "change",
      "adjust",
      "tweak",
      "improve",
      "enhance",
      "fix",
      "update",
      "alter",
      "transform",
      "make better",
      "add effects",
      "change color",
      "brighten",
      "darken"
    ];
    
    const messageText = userMessage.toLowerCase();
    return tweakKeywords.some(keyword => messageText.includes(keyword));
  }

  // Enhanced placement detection
  static detectImagePlacement(userMessage) {
    const placementKeywords = {
      left: ["left", "left side"],
      right: ["right", "right side"], 
      center: ["center", "middle", "main focus", "centerpiece"],
      background: ["background", "behind", "backdrop"],
      overlay: ["overlay", "blend", "integrate", "merge"]
    };

    const messageText = userMessage.toLowerCase();
    
    for (const [placement, keywords] of Object.entries(placementKeywords)) {
      if (keywords.some(keyword => messageText.includes(keyword))) {
        return placement;
      }
    }
    
    return "center"; // Default placement
  }

  static getColorPaletteForCategory(category) {
    const palettes = {
      adventure: ["#ff6b35", "#32cd32", "#87ceeb", "#ff4500", "#228b22"],
      gaming: ["#00ff00", "#ff0080", "#0080ff", "#ffff00", "#ff4500"],
      food: ["#ff6b35", "#f7931e", "#ffd700", "#228b22", "#dc143c"],
      travel: ["#87ceeb", "#ffa500", "#32cd32", "#ff4500", "#4169e1"],
      tech: ["#007acc", "#c0c0c0", "#000080", "#4169e1", "#36454f"],
      lifestyle: ["#ffc0cb", "#dda0dd", "#f0e68c", "#98fb98", "#ffb6c1"],
      education: ["#4169e1", "#2f4f4f", "#008080", "#800080", "#556b2f"],
      entertainment: ["#ff1493", "#ff4500", "#ffd700", "#00ff7f", "#ff69b4"],
    };

    return palettes[category] || palettes.entertainment;
  }
}







// // lib/promptEngineering.js
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export class ThumbnailPromptEngineer {
//   static determineThumbnailType(userMessage, userContext) {
//     const verticalKeywords = [
//       "shorts",
//       "short",
//       "vertical",
//       "reel",
//       "tiktok",
//       "9:16",
//       "mobile",
//       "stories",
//     ];
//     const combinedText = (userMessage + " " + userContext).toLowerCase();

//     return verticalKeywords.some((keyword) => combinedText.includes(keyword))
//       ? "vertical"
//       : "landscape";
//   }

//   static async enhancePrompt(
//     userMessage,
//     userContext,
//     userUploadedImageUrl,
//     thumbnailType,
//     imagePlacement
//   ) {
//     const enhancementPrompt = `You are an expert YouTube thumbnail designer and a master of prompting for generative AI. Your task is to transform a simple user request into a hyper-detailed, narrative-style prompt that will generate a click-worthy thumbnail.

// ---
// ## CONTEXT ##
// - USER'S CORE IDEA: "${userMessage}"
// - VIDEO CATEGORY: "${this.extractContentCategory(userMessage, userContext)}"
// - THUMBNAIL FORMAT: "${
//       thumbnailType === "vertical"
//         ? "9:16 YouTube Shorts"
//         : "16:9 YouTube Video"
//     }"
// - USER IMAGE PROVIDED: ${
//       userUploadedImageUrl
//         ? `Yes, to be placed on the ${imagePlacement}.`
//         : "No"
//     }
// - DESIRED GOAL/MOOD: (Example: Create excitement, build curiosity, feel professional and trustworthy)

// ---
// ## YOUR TASK ##
// Synthesize all the context above into a single, descriptive paragraph. Do not use lists or bullet points. Instead, paint a vivid picture.

// Your description must seamlessly weave together the following elements:
// - **Subject & Action:** What is the main focal point and what is it doing? Be expressive.
// - **Composition & Camera:** Describe the scene using photographic terms. Mention the shot type (e.g., dynamic close-up, wide-angle establishing shot), camera angle (e.g., low-angle shot), and composition principles (e.g., rule of thirds, leading lines).
// - **Lighting:** Be specific about the lighting style (e.g., cinematic three-point lighting, soft natural light, dramatic neon glow) and how it creates mood.
// - **Color Palette:** Describe a vibrant, high-contrast color scheme designed to pop on the YouTube homepage (mention 2-3 key colors).
// - **Text & Typography:** Describe the style of any text needed. Think about its message, font style (e.g., bold, modern sans-serif), and effects (e.g., subtle drop shadow, outer glow).
// - **Overall Mood & Style:** What is the overall feeling? (e.g., energetic and chaotic, clean and professional, mysterious and intriguing).
// ${
//   userUploadedImageUrl
//     ? `- **Image Integration:** Describe how the user's image is naturally integrated into this scene.`
//     : ""
// }

// The final output should be a single paragraph that is ready to be fed directly into an image generation model like Gemini. Respond with only the enhanced prompt and nothing else.`;
//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: enhancementPrompt }],
//         temperature: 0.7,
//         max_tokens: 400,
//       });

//       return response.choices[0].message.content.trim();
//     } catch (error) {
//       console.error("Error enhancing prompt:", error);
//       return this.createFallbackPrompt(
//         userMessage,
//         thumbnailType,
//         imagePlacement
//       );
//     }
//   }

//   static createFallbackPrompt(userMessage, thumbnailType, imagePlacement) {
//     const isVertical = thumbnailType === "vertical";
//     let fallbackPrompt = `Professional YouTube ${
//       isVertical ? "Shorts" : ""
//     } thumbnail for: ${userMessage}. `;
//     fallbackPrompt += `High contrast, vibrant colors, ${
//       isVertical ? "9:16 vertical" : "16:9 landscape"
//     } aspect ratio, `;
//     fallbackPrompt += `eye-catching design, bold text, professional composition.`;

//     if (imagePlacement) {
//       fallbackPrompt += ` Place user image in ${imagePlacement} position.`;
//     }

//     return fallbackPrompt;
//   }

//   static getContentCategoryPrompt(category, basePrompt) {
//     const categoryEnhancements = {
//       gaming:
//         "Use vibrant neon colors (#00ff00, #ff0080, #0080ff), action-packed composition, gaming UI elements, dramatic lighting effects, high energy",
//       food: "Use warm, appetizing colors (#ff6b35, #f7931e, #ffd700), mouth-watering presentation, clean composition, natural lighting that makes food look delicious",
//       travel:
//         "Use scenic landscapes, adventure themes (#87ceeb, #ffa500, #32cd32), bright outdoor lighting, wanderlust-inspiring elements",
//       tech: "Use sleek, modern design (#007acc, #c0c0c0, #4169e1), clean lines, futuristic elements, professional tech aesthetic",
//       lifestyle:
//         "Use warm, relatable tones (#ffc0cb, #dda0dd, #f0e68c), authentic moments, soft lighting, aspirational but approachable",
//       education:
//         "Use clear, professional design (#4169e1, #2f4f4f, #008080), readable fonts, organized layout, trustworthy appearance",
//       entertainment:
//         "Use bold, eye-catching colors (#ff1493, #ff4500, #ffd700), dynamic composition, expressive elements, high energy",
//       general:
//         "Use versatile, attention-grabbing design with balanced composition and universal appeal",
//     };

//     const enhancement =
//       categoryEnhancements[category] || categoryEnhancements.general;
//     return `${basePrompt} - CATEGORY STYLE: ${enhancement}`;
//   }

//   // Extract content category from message
//   static extractContentCategory(message, userContext = "") {
//     const categories = {
//       gaming: [
//         "game",
//         "gaming",
//         "gameplay",
//         "stream",
//         "esports",
//         "console",
//         "pc gaming",
//         "mobile game",
//       ],
//       food: [
//         "food",
//         "recipe",
//         "cooking",
//         "restaurant",
//         "chef",
//         "meal",
//         "kitchen",
//         "baking",
//       ],
//       travel: [
//         "travel",
//         "trip",
//         "vacation",
//         "destination",
//         "adventure",
//         "explore",
//         "visit",
//       ],
//       tech: [
//         "tech",
//         "technology",
//         "review",
//         "unboxing",
//         "gadget",
//         "software",
//         "app",
//         "device",
//       ],
//       lifestyle: [
//         "lifestyle",
//         "vlog",
//         "daily",
//         "routine",
//         "fashion",
//         "beauty",
//         "fitness",
//         "health",
//       ],
//       education: [
//         "tutorial",
//         "how to",
//         "learn",
//         "education",
//         "course",
//         "guide",
//         "tips",
//         "explain",
//       ],
//       entertainment: [
//         "funny",
//         "comedy",
//         "entertainment",
//         "reaction",
//         "drama",
//         "story",
//         "viral",
//       ],
//     };

//     const text = (message + " " + userContext).toLowerCase();

//     for (const [category, keywords] of Object.entries(categories)) {
//       if (keywords.some((keyword) => text.includes(keyword))) {
//         return category;
//       }
//     }

//     return "general";
//   }
// }

// // export class ThumbnailOptimizer {

// //   static async optimizeForClickthrough(prompt, options = {}) {
// //     const { userContext, category } = options;

// //     const optimizationPrompt = `Optimize this thumbnail concept for maximum YouTube clickthrough rate:

// // BASE CONCEPT: ${prompt}
// // CATEGORY: ${category || 'general'}

// // Apply YouTube thumbnail best practices:
// // 1. Faces should be 25-30% of the image for emotional connection
// // 2. Use contrasting colors that pop against YouTube's white/dark interface
// // 3. Text should be large and readable on mobile (minimum 24pt equivalent)
// // 4. Create visual hierarchy with size and contrast
// // 5. Include curiosity gaps or surprising elements
// // 6. Use arrows, circles, or highlighting for attention direction
// // 7. Ensure design works at small sizes (120x68px preview)
// // 8. Apply rule of thirds for composition
// // 9. Use emotions and expressions to create connection
// // 10. Make it scroll-stopping and click-worthy

// // Enhance the prompt to include these optimizations while maintaining the original concept.

// // Return only the optimized prompt.`;

// //     try {
// //       const response = await openai.chat.completions.create({
// //         model: "gpt-4o-mini",
// //         messages: [{ role: "user", content: optimizationPrompt }],
// //         temperature: 0.6,
// //         max_tokens: 500,
// //       });

// //       return response.choices[0].message.content.trim();
// //     } catch (error) {
// //       console.error("Error optimizing prompt:", error);
// //       return prompt;
// //     }
// //   }

// //   // Generate variations for A/B testing
// //   static async generatePromptVariations(basePrompt, count = 3) {
// //     const variationPrompt = `Create ${count} different variations of this thumbnail prompt for A/B testing:

// // ORIGINAL: ${basePrompt}

// // Each variation should:
// // 1. Maintain the core concept
// // 2. Use different visual approaches (composition, colors, style)
// // 3. Test different psychological triggers (urgency, curiosity, emotion)
// // 4. Vary text placement and styling approaches

// // Return as JSON array with format: [{"variation": 1, "prompt": "..."}, ...]`;

// //     try {
// //       const response = await openai.chat.completions.create({
// //         model: "gpt-4o-mini",
// //         messages: [{ role: "user", content: variationPrompt }],
// //         temperature: 0.8,
// //         max_tokens: 800,
// //         response_format: { type: "json_object" },
// //       });

// //       const result = JSON.parse(response.choices[0].message.content);
// //       return result.variations || [{ variation: 1, prompt: basePrompt }];
// //     } catch (error) {
// //       console.error("Error generating variations:", error);
// //       return [{ variation: 1, prompt: basePrompt }];
// //     }
// //   }

// //   // Get placement-specific prompts
// //   static getPlacementPrompt(placement, basePrompt) {
// //     const placementInstructions = {
// //       left: 'Position the user image prominently on the left side of the composition, with complementary elements on the right',
// //       right: 'Position the user image prominently on the right side of the composition, with complementary elements on the left',
// //       center: 'Center the user image as the main focal point of the composition',
// //       background: 'Use the user image as a background element with overlay effects and foreground elements',
// //       overlay: 'Blend the user image seamlessly into the overall design as an integrated overlay element'
// //     };

// //     const instruction = placementInstructions[placement] || placementInstructions.center;
// //     return `${basePrompt} - IMAGE PLACEMENT: ${instruction}`;
// //   }
// // }

// // Utility functions for thumbnail creation
// export class ThumbnailUtils {
//   static getOptimalDimensions(thumbnailType) {
//     return thumbnailType === "vertical"
//       ? { width: 1080, height: 1920, aspectRatio: "9:16" }
//       : { width: 1280, height: 720, aspectRatio: "16:9" };
//   }

//   static getColorPaletteForCategory(category) {
//     const palettes = {
//       gaming: ["#00ff00", "#ff0080", "#0080ff", "#ffff00", "#ff4500"],
//       food: ["#ff6b35", "#f7931e", "#ffd700", "#228b22", "#dc143c"],
//       travel: ["#87ceeb", "#ffa500", "#32cd32", "#ff4500", "#4169e1"],
//       tech: ["#007acc", "#c0c0c0", "#000080", "#4169e1", "#36454f"],
//       lifestyle: ["#ffc0cb", "#dda0dd", "#f0e68c", "#98fb98", "#ffb6c1"],
//       education: ["#4169e1", "#2f4f4f", "#008080", "#800080", "#556b2f"],
//       entertainment: ["#ff1493", "#ff4500", "#ffd700", "#00ff7f", "#ff69b4"],
//     };

//     return palettes[category] || palettes.entertainment;
//   }

//   // Generate questionnaire prompts based on detected category
//   static getQuestionnaireForCategory(category, hasUploadedImage) {
//     const baseQuestions = {
//       gaming: [
//         "What type of game is this about? (FPS, RPG, Strategy, etc.)",
//         "What's the mood? (Intense action, funny moments, tutorial, etc.)",
//         hasUploadedImage
//           ? "Where should your image appear? (left, right, center, background)"
//           : null,
//       ],
//       food: [
//         "What type of food content? (Recipe, review, cooking show, etc.)",
//         "What's the vibe? (Cozy cooking, professional chef, home kitchen, etc.)",
//         hasUploadedImage
//           ? "How should we feature your image? (left, right, center, background)"
//           : null,
//       ],
//       travel: [
//         "What's your travel focus? (Adventure, luxury, budget, culture, etc.)",
//         "What's the mood? (Exciting adventure, peaceful exploration, etc.)",
//         hasUploadedImage
//           ? "Where should your photo be placed? (left, right, center, background)"
//           : null,
//       ],
//       general: [
//         "What's the main topic or theme of your video?",
//         "What style do you prefer? (Bold and energetic, clean and professional, warm and friendly, etc.)",
//         hasUploadedImage
//           ? "Where would you like your image positioned? (left, right, center, background)"
//           : null,
//       ],
//     };

//     return (baseQuestions[category] || baseQuestions.general).filter(
//       (q) => q !== null
//     );
//   }

//   // Analyze user preferences from conversation history
//   static extractUserPreferences(messages) {
//     const preferences = {
//       style: null,
//       colors: null,
//       mood: null,
//       category: null,
//       placement: null,
//     };

//     const conversationText = messages
//       .filter((m) => m.role === "user")
//       .map((m) => m.content)
//       .join(" ")
//       .toLowerCase();

//     // Extract style preferences
//     const styleKeywords = {
//       bold: ["bold", "dramatic", "intense", "striking"],
//       clean: ["clean", "minimal", "simple", "modern"],
//       vibrant: ["vibrant", "colorful", "bright", "energetic"],
//       professional: ["professional", "business", "corporate", "formal"],
//       fun: ["fun", "playful", "casual", "friendly"],
//     };

//     for (const [style, keywords] of Object.entries(styleKeywords)) {
//       if (keywords.some((keyword) => conversationText.includes(keyword))) {
//         preferences.style = style;
//         break;
//       }
//     }

//     // Extract color preferences
//     const colorKeywords = [
//       "red",
//       "blue",
//       "green",
//       "yellow",
//       "purple",
//       "orange",
//       "pink",
//       "black",
//       "white",
//     ];
//     for (const color of colorKeywords) {
//       if (conversationText.includes(color)) {
//         preferences.colors = color;
//         break;
//       }
//     }

//     // Extract placement preferences
//     const placementKeywords = [
//       "left",
//       "right",
//       "center",
//       "background",
//       "overlay",
//     ];
//     for (const placement of placementKeywords) {
//       if (conversationText.includes(placement)) {
//         preferences.placement = placement;
//         break;
//       }
//     }

//     return preferences;
//   }
// }

// export class ThumbnailOptimizer {
//   static async optimizeForClickthrough(prompt, options = {}) {
//     const { userContext, category } = options;

//     const optimizationPrompt = `Optimize this thumbnail concept for maximum YouTube clickthrough rate:

// BASE CONCEPT: ${prompt}
// CATEGORY: ${category || "general"}

// Apply these YouTube thumbnail best practices:
// 1. Use high contrast colors that stand out against YouTube's interface
// 2. Include emotional elements (surprised faces, dramatic expressions)
// 3. Create visual hierarchy with size, color, and positioning
// 4. Add curiosity gaps or intriguing elements
// 5. Use bold, readable text that works on mobile
// 6. Include directional elements (arrows, pointing) to guide attention
// 7. Make it work at thumbnail size (120x68px)
// 8. Use the "rule of thirds" for composition
// 9. Create urgency or FOMO (fear of missing out)
// 10. Make faces 25-30% of the image for connection

// Enhance the prompt to maximize clicks while keeping the original concept.

// Return only the optimized prompt.`;

//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: optimizationPrompt }],
//         temperature: 0.6,
//         max_tokens: 500,
//       });

//       return response.choices[0].message.content.trim();
//     } catch (error) {
//       console.error("Error optimizing prompt:", error);
//       return prompt;
//     }
//   }

//   // Generate category-specific optimization rules
//   static getCategoryOptimizations(category) {
//     const optimizations = {
//       gaming: {
//         colors: ["neon green", "electric blue", "hot pink", "bright yellow"],
//         elements: [
//           "action poses",
//           "gaming UI elements",
//           "special effects",
//           "energy bars",
//         ],
//         mood: "high energy and competitive",
//         textStyle: "bold gaming fonts with glowing effects",
//       },
//       food: {
//         colors: ["warm orange", "golden yellow", "rich red", "fresh green"],
//         elements: [
//           "steam effects",
//           "fresh ingredients",
//           "cooking utensils",
//           "appetizing close-ups",
//         ],
//         mood: "mouth-watering and inviting",
//         textStyle: "elegant food typography with warm colors",
//       },
//       travel: {
//         colors: ["sky blue", "sunset orange", "nature green", "adventure red"],
//         elements: [
//           "scenic backgrounds",
//           "adventure gear",
//           "landmark silhouettes",
//           "weather effects",
//         ],
//         mood: "inspiring and wanderlust-inducing",
//         textStyle: "adventure-themed fonts with outdoor feel",
//       },
//       tech: {
//         colors: ["tech blue", "silver gray", "electric cyan", "digital purple"],
//         elements: [
//           "clean layouts",
//           "geometric shapes",
//           "tech icons",
//           "gradient effects",
//         ],
//         mood: "modern and innovative",
//         textStyle: "sleek sans-serif fonts with tech aesthetics",
//       },
//       lifestyle: {
//         colors: ["soft pink", "warm beige", "gentle lavender", "mint green"],
//         elements: [
//           "natural lighting",
//           "cozy settings",
//           "lifestyle props",
//           "authentic moments",
//         ],
//         mood: "aspirational yet relatable",
//         textStyle: "friendly handwritten or modern serif fonts",
//       },
//       education: {
//         colors: [
//           "trustworthy blue",
//           "knowledge green",
//           "professional gray",
//           "accent orange",
//         ],
//         elements: [
//           "clean diagrams",
//           "educational icons",
//           "organized layouts",
//           "clear hierarchy",
//         ],
//         mood: "authoritative yet approachable",
//         textStyle: "clear, readable fonts that convey expertise",
//       },
//       entertainment: {
//         colors: [
//           "vibrant magenta",
//           "electric yellow",
//           "bold red",
//           "party purple",
//         ],
//         elements: [
//           "dynamic poses",
//           "fun expressions",
//           "party elements",
//           "burst effects",
//         ],
//         mood: "energetic and entertaining",
//         textStyle: "playful, bold fonts with dramatic effects",
//       },
//     };

//     return optimizations[category] || optimizations.entertainment;
//   }
// }

// // Questionnaire system for gathering user preferences

// export class ThumbnailQuestionnaire {
//   static generateQuestions(
//     category,
//     hasUploadedImage,
//     conversationHistory = []
//   ) {
//     const baseQuestions = {
//       gaming: [
//         "What type of gaming content? (Gameplay, tutorial, review, stream highlights)",
//         "What's the energy level? (Intense action, chill gameplay, educational)",
//         "Any specific game or genre?",
//       ],
//       food: [
//         "What type of food content? (Recipe, review, cooking tips, restaurant visit)",
//         "What's the atmosphere? (Professional kitchen, home cooking, street food)",
//         "Any specific cuisine or dish?",
//       ],
//       travel: [
//         "What type of travel content? (Adventure, cultural, budget tips, luxury)",
//         "What's the destination vibe? (Beach, mountains, city, countryside)",
//         "What's the travel style? (Solo, family, couple, group)",
//       ],
//       tech: [
//         "What type of tech content? (Review, unboxing, tutorial, news)",
//         "What's the complexity level? (Beginner-friendly, advanced, professional)",
//         "Any specific product or brand focus?",
//       ],
//       lifestyle: [
//         "What lifestyle area? (Fashion, fitness, home, daily routines)",
//         "What's the vibe? (Minimalist, cozy, glamorous, authentic)",
//         "Who's your target audience? (Young adults, professionals, families)",
//       ],
//       education: [
//         "What subject or skill? (Business, creative, technical, academic)",
//         "What's the learning format? (Step-by-step, overview, deep-dive)",
//         "What's the expertise level? (Beginner, intermediate, advanced)",
//       ],
//       entertainment: [
//         "What type of entertainment? (Comedy, reaction, story-time, challenges)",
//         "What's the energy? (High-energy fun, laid-back humor, dramatic)",
//         "Any specific theme or trend?",
//       ],
//     };

//     let questions = [
//       ...(baseQuestions[category] || baseQuestions.entertainment),
//     ];

//     // Add image placement question if user uploaded an image
//     if (hasUploadedImage) {
//       questions.push(
//         "Where should your image be positioned? (left side, right side, center focus, background, or blended overlay)"
//       );
//     }

//     // Add format question
//     questions.push(
//       "What format do you need? (Regular YouTube thumbnail, YouTube Shorts, or both)"
//     );

//     return questions;
//   }

//   static analyzeResponses(responses, category) {
//     const analysis = {
//       style: "modern",
//       mood: "engaging",
//       colors: "vibrant",
//       placement: "center",
//       format: "landscape",
//       specificElements: [],
//     };

//     const responseText = responses.join(" ").toLowerCase();

//     // Analyze style preferences
//     if (
//       responseText.includes("professional") ||
//       responseText.includes("clean")
//     ) {
//       analysis.style = "professional";
//     } else if (
//       responseText.includes("fun") ||
//       responseText.includes("casual")
//     ) {
//       analysis.style = "casual";
//     } else if (
//       responseText.includes("dramatic") ||
//       responseText.includes("bold")
//     ) {
//       analysis.style = "dramatic";
//     }

//     // Analyze mood
//     if (responseText.includes("intense") || responseText.includes("action")) {
//       analysis.mood = "intense";
//     } else if (
//       responseText.includes("calm") ||
//       responseText.includes("peaceful")
//     ) {
//       analysis.mood = "calm";
//     } else if (
//       responseText.includes("fun") ||
//       responseText.includes("energetic")
//     ) {
//       analysis.mood = "energetic";
//     }

//     // Extract placement preference
//     const placements = ["left", "right", "center", "background", "overlay"];
//     for (const placement of placements) {
//       if (responseText.includes(placement)) {
//         analysis.placement = placement;
//         break;
//       }
//     }

//     // Extract format preference
//     if (responseText.includes("shorts") || responseText.includes("vertical")) {
//       analysis.format = "vertical";
//     } else if (responseText.includes("both")) {
//       analysis.format = "both";
//     }

//     return analysis;
//   }
// }

// // Advanced composition rules for different thumbnail types
// export class ThumbnailComposition {
//   static getCompositionRules(thumbnailType, imagePlacement) {
//     const rules = {
//       landscape: {
//         left: "User image on left 40%, main content right 60%, text overlay on right section",
//         right:
//           "Main content left 60%, user image on right 40%, text overlay on left section",
//         center:
//           "User image center 50%, surrounding elements frame the image, text at top or bottom",
//         background:
//           "User image as full background with 50% opacity overlay, foreground elements and text",
//         overlay:
//           "User image blended throughout composition with complementary design elements",
//       },
//       vertical: {
//         left: "User image left side, vertical text right side, background elements throughout",
//         right:
//           "User image right side, vertical text left side, background elements throughout",
//         center:
//           "User image center top 40%, text center bottom 30%, background fills remaining space",
//         background:
//           "User image as full background, overlay elements and text throughout vertical space",
//         overlay: "User image integrated into design flow from top to bottom",
//       },
//     };

//     return rules[thumbnailType]?.[imagePlacement] || rules.landscape.center;
//   }

//   static getTextPlacementRules(thumbnailType, imagePlacement) {
//     const textRules = {
//       landscape: {
//         left: "Place main text on right side, secondary text at top or bottom",
//         right: "Place main text on left side, secondary text at top or bottom",
//         center:
//           "Place text at top and bottom, avoiding center where image is located",
//         background:
//           "Text can be placed anywhere with proper contrast and readability",
//         overlay: "Integrate text organically with the overall composition",
//       },
//       vertical: {
//         left: "Vertical text placement on right side, horizontal text at top/bottom",
//         right:
//           "Vertical text placement on left side, horizontal text at top/bottom",
//         center: "Text at top and bottom thirds, center reserved for user image",
//         background: "Text throughout vertical space with proper contrast",
//         overlay: "Text flows naturally with the integrated image design",
//       },
//     };

//     return (
//       textRules[thumbnailType]?.[imagePlacement] || textRules.landscape.center
//     );
//   }
// }
