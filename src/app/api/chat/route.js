// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Chat from "@/models/Chat";
// import User from "@/models/User";
// import { jwtVerify } from "jose";
// import OpenAI from "openai";
// import { uploadToCloudinary } from "@/lib/cloudinary";
// import {
//   ThumbnailPromptEngineer,
//   ThumbnailOptimizer,
//   ThumbnailQuestionnaire,
//   ThumbnailUtils,
// } from "@/lib/promptEngineering";
// import axios from "axios";

// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// // Initialize OpenAI for GPT-4.1 (reasoning) and OpenRouter for Gemini
// const openaiReasoning = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openaiImageGen = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// async function getUserId(req) {
//   const token = req.cookies.get("token")?.value;
//   if (!token) throw new Error("Unauthorized");
//   const { payload } = await jwtVerify(token, JWT_SECRET);
//   return payload.userId;
// }

// // Convert Cloudinary URL to base64 data URL
// async function cloudinaryUrlToBase64(cloudinaryUrl) {
//   try {
//     const response = await axios.get(cloudinaryUrl, {
//       responseType: 'arraybuffer'
//     });
//     const buffer = Buffer.from(response.data);
//     const base64 = buffer.toString('base64');
    
//     const mimeType = cloudinaryUrl.includes('.jpg') || cloudinaryUrl.includes('.jpeg') 
//       ? 'image/jpeg' 
//       : 'image/png';
    
//     return `data:${mimeType};base64,${base64}`;
//   } catch (error) {
//     console.error('Error converting Cloudinary URL to base64:', error);
//     throw error;
//   }
// }

// // Enhanced OpenAI Agent with smarter conversation flow
// async function openAIAgent(messages, userUploadedImageUrl, userName) {
//   console.log("OpenAI Agent analyzing conversation...");
//   const latestUserMessage = messages[messages.length - 1].content;
//   const isFirstUserMessage = messages.filter((m) => m.role === "user").length === 1;
  
//   // Detect if this is an image tweaking request
//   const isImageTweakRequest = userUploadedImageUrl && ThumbnailUtils.detectImageTweakRequest(latestUserMessage);
  
//   // Auto-detect image placement if not explicitly mentioned
//   const imagePlacement = userUploadedImageUrl ? ThumbnailUtils.detectImagePlacement(latestUserMessage) : null;
  
//   // Detect category
//   const detectedCategory = ThumbnailPromptEngineer.extractContentCategory(latestUserMessage, "");

//   const agentPrompt = `You are an efficient YouTube thumbnail assistant. Analyze this conversation and make a quick decision.

// USER: ${userName}
// USER UPLOADED IMAGE: ${userUploadedImageUrl ? "Available" : "None"}
// IMAGE TWEAK REQUEST: ${isImageTweakRequest ? "Yes - user wants to modify their image" : "No"}
// DETECTED PLACEMENT: ${imagePlacement || "None detected"}
// DETECTED CATEGORY: ${detectedCategory}

// CONVERSATION:
// ${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}

// DECISION RULES:
// 1. If this is the first message and contains basic video topic info, provide a SMART SUMMARY instead of asking questions
// 2. If user uploaded image and wants tweaking, proceed to generate 
// 3. If message is too vague (less than 5 words), ask for clarification
// 4. Otherwise, provide smart summary and quick confirmation

// SMART SUMMARY FORMAT:
// "I'll create your [category] thumbnail with [style] using [colors] and [placement if image]. Would you like me to create this or adjust anything?"

// Respond in JSON:
// {
//   "nextStep": "ask_clarification" | "smart_summary" | "generate_images",
//   "response": "your response text",
//   "reasoning": "brief explanation", 
//   "thumbnailType": "landscape" | "vertical",
//   "imagePlacement": "${imagePlacement}",
//   "detectedCategory": "${detectedCategory}",
//   "isImageTweakRequest": ${isImageTweakRequest},
//   "needsMoreInfo": boolean
// }`;

//   try {
//     const response = await openaiReasoning.chat.completions.create({
//       model: "gpt-4o", // Use GPT-4o which supports JSON mode
//       messages: [{ role: "user", content: agentPrompt }],
//       temperature: 0.3,
//       max_tokens: 400,
//       response_format: { type: "json_object" },
//     });

//     const decision = JSON.parse(response.choices[0].message.content);
    
//     // Generate smart summary if needed
//     if (decision.nextStep === "smart_summary") {
//       decision.response = ThumbnailQuestionnaire.generateQuickConfirmation(
//         latestUserMessage,
//         decision.detectedCategory,
//         userUploadedImageUrl ? true : false,
//         decision.imagePlacement
//       );
//     }
    
//     // If user confirms or we have enough info, prepare for generation
//     const confirmationWords = ["yes", "create", "generate", "go", "make", "perfect", "sounds good", "go ahead"];
//     const isConfirmation = confirmationWords.some(word => latestUserMessage.toLowerCase().includes(word));
    
//     if (decision.nextStep === "smart_summary" && isConfirmation) {
//       decision.nextStep = "generate_images";
      
//       // Preserve the original context and add any new style requests
//       const originalMessage = messages.find(m => m.role === "user" && m.content.length > 10)?.content || latestUserMessage;
//       let enhancedMessage = originalMessage;
      
//       // Check if user added style preferences in confirmation
//       if (latestUserMessage.toLowerCase().includes("1980")) {
//         enhancedMessage += " with 1980s retro aesthetic and vintage styling";
//       }
//       if (latestUserMessage.toLowerCase().includes("retro")) {
//         enhancedMessage += " with retro vintage design elements";
//       }
//       if (latestUserMessage.toLowerCase().includes("modern")) {
//         enhancedMessage += " with modern contemporary styling";
//       }
      
//       // Update the message for prompt generation
//       decision.originalMessage = enhancedMessage;
//     }
    
//     // If generating images, create the final prompt
//     if (decision.nextStep === "generate_images") {
//       const userContext = ""; 
      
//       // Use the enhanced message that preserves original context + new style requests
//       const messageForPrompt = decision.originalMessage || latestUserMessage;
      
//       // Determine thumbnail type
//       decision.thumbnailType = ThumbnailPromptEngineer.determineThumbnailType(
//         messageForPrompt,
//         userContext
//       );
      
//       // Create enhanced prompt with preserved category and topic context
//       decision.finalPrompt = await ThumbnailPromptEngineer.enhancePrompt(
//         messageForPrompt,
//         userContext,
//         userUploadedImageUrl,
//         decision.thumbnailType,
//         decision.imagePlacement,
//         decision.isImageTweakRequest
//       );
      
//       // Apply category-specific enhancements using detected category
//       if (decision.detectedCategory && decision.detectedCategory !== "general") {
//         decision.finalPrompt = ThumbnailPromptEngineer.getContentCategoryPrompt(
//           decision.detectedCategory,
//           decision.finalPrompt
//         );
//       }
      
//       // Optimize for clickthrough
//       decision.finalPrompt = await ThumbnailOptimizer.optimizeForClickthrough(
//         decision.finalPrompt,
//         { userContext, category: decision.detectedCategory }
//       );
//     }

//     return decision;
//   } catch (error) {
//     console.error("OpenAI Agent error:", error);
//     // Enhanced fallback logic
//     const thumbnailType = ThumbnailPromptEngineer.determineThumbnailType(latestUserMessage, "");
//     return {
//       nextStep: "generate_images",
//       finalPrompt: `Professional YouTube thumbnail for: ${latestUserMessage}. High contrast, vibrant colors, ${thumbnailType === "vertical" ? "9:16" : "16:9"} aspect ratio.`,
//       thumbnailType: thumbnailType,
//       reasoning: "Fallback due to agent error",
//       imagePlacement: imagePlacement,
//       isImageTweakRequest: isImageTweakRequest
//     };
//   }
// }

// // Enhanced Gemini Image Generator with better image integration
// async function geminiImageGenerator(finalPrompt, thumbnailType, userUploadedImageUrl, imagePlacement, isImageTweakRequest = false) {
//   console.log("Gemini generating images with enhanced prompt:", finalPrompt);
  
//   try {
//     const isVertical = thumbnailType === "vertical";
//     const aspectRatio = isVertical ? "9:16" : "16:9";
    
//     // Create enhanced prompt based on Gemini Image Generation API guidelines
//     let enhancedPrompt = `Create a professional YouTube thumbnail image.

// CONTENT DESCRIPTION: ${finalPrompt}

// TECHNICAL SPECIFICATIONS:
// - Aspect ratio: ${aspectRatio} 
// - High contrast, vibrant colors optimized for YouTube interface
// - Bold, eye-catching design that works at small thumbnail sizes
// - Clear focal points and visual hierarchy
// - Professional composition for ${isVertical ? "YouTube Shorts" : "standard YouTube videos"}
// - Scroll-stopping and click-worthy design
// - Modern, attention-grabbing aesthetic`;

//     // Handle different image scenarios
//     if (userUploadedImageUrl && isImageTweakRequest) {
//       enhancedPrompt += `

// IMAGE MODIFICATION INSTRUCTIONS:
// - Take the user-provided image and ENHANCE it significantly
// - Improve lighting, colors, contrast, and visual appeal
// - Add cinematic effects, better composition, and professional polish
// - Keep the main subject recognizable but make it much more visually striking
// - Integrate thumbnail-optimized design elements around the enhanced image
// - Make it look like a professional YouTube thumbnail version of their photo`;
//     } else if (userUploadedImageUrl && imagePlacement) {
//       enhancedPrompt += `

// IMAGE INTEGRATION INSTRUCTIONS: 
// - Seamlessly integrate the user-provided image into the ${imagePlacement} of the composition
// - User image should be prominently featured and well-integrated with overall design
// - Create visual harmony between user image and generated thumbnail elements
// - Maintain professional thumbnail aesthetics while highlighting the user image`;
//     }

//     const messageContent = [
//       {
//         type: "text",
//         text: enhancedPrompt,
//       }
//     ];

//     // Add user image if provided
//     if (userUploadedImageUrl) {
//       const base64DataUrl = await cloudinaryUrlToBase64(userUploadedImageUrl);
//       messageContent.push({
//         type: "image_url",
//         image_url: {
//           url: base64DataUrl,
//         },
//       });
//     }

//     // Generate using Gemini 2.5 Flash Image Preview
//     const completion = await openaiImageGen.chat.completions.create({
//       model: "google/gemini-2.5-flash-image-preview:free",
//       messages: [
//         {
//           role: "user", 
//           content: messageContent,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 1024,
//     });

//     const result = completion.choices[0].message;
//     const generatedImageUrls = [];

//     if (result.images && result.images.length > 0) {
//       // Process each generated image
//       for (let i = 0; i < result.images.length; i++) {
//         const img = result.images[i];
//         const base64Data = img.image_url.url.split(",")[1];
//         const buffer = Buffer.from(base64Data, "base64");
        
//         // Upload to Cloudinary
//         const cloudinaryResult = await uploadToCloudinary(buffer);
//         generatedImageUrls.push(cloudinaryResult.secure_url);
        
//         console.log(`Image ${i + 1} uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
//       }
//     }

//     if (generatedImageUrls.length === 0) {
//       throw new Error("No images were generated successfully.");
//     }

//     console.log(`Successfully generated and uploaded ${generatedImageUrls.length} images`);
//     return generatedImageUrls;
    
//   } catch (error) {
//     console.error("Gemini generation error:", error);
//     throw new Error(`Failed to generate images: ${error.message}`);
//   }
// }

// // Main API handler
// export async function POST(req) {
//   try {
//     await connectDB();
//     const userId = await getUserId(req);
//     const formData = await req.formData();
//     const message = formData.get("message");
//     const imageFile = formData.get("image");
//     let chatId = formData.get("chatId");

//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     let currentChat;
//     let userUploadedImageUrl = null;

//     // --- 1. Find or Create Chat Session ---
//     if (chatId === "new") {
//       currentChat = new Chat({ userId, messages: [] });
//       const greeting = `Hi ${user.name}! I'll help you create stunning YouTube thumbnails quickly. What's your video about?`;
//       currentChat.messages.push({ role: "assistant", content: greeting });
//       if (message) {
//         currentChat.title =
//           message.length > 30 ? message.substring(0, 27) + "..." : message;
//       }
//     } else {
//       currentChat = await Chat.findOne({ _id: chatId, userId });
//       if (!currentChat) {
//         return NextResponse.json(
//           { message: "Chat not found" },
//           { status: 404 }
//         );
//       }
//     }

//     // Return early if just creating a new chat
//     if (chatId === "new" && !message && !imageFile) {
//       await currentChat.save();
//       return NextResponse.json(currentChat);
//     }

//     // --- 2. Handle User Image Upload (Cloudinary) ---
//     if (imageFile) {
//       try {
//         const buffer = Buffer.from(await imageFile.arrayBuffer());
//         const cloudinaryResult = await uploadToCloudinary(buffer);
//         userUploadedImageUrl = cloudinaryResult.secure_url;
//         currentChat.userUploadedImageUrl = userUploadedImageUrl;
//         console.log("Image uploaded to Cloudinary:", userUploadedImageUrl);
//       } catch (uploadError) {
//         console.error("Failed to upload image:", uploadError);
//         return NextResponse.json(
//           { message: "Failed to upload image" },
//           { status: 500 }
//         );
//       }
//     }

//     // --- 3. Add User Message to History ---
//     if (message) {
//       currentChat.messages.push({ role: "user", content: message });
//     }

//     // --- 4. Call the Enhanced AI Agent ---
//     const agentDecision = await openAIAgent(
//       currentChat.messages,
//       currentChat.userUploadedImageUrl,
//       user.name
//     );

//     // Get the latest user message for reference
//     const latestUserMessage = currentChat.messages
//       .filter(m => m.role === "user")
//       .pop()?.content || "";

//     // --- 5. Process Agent's Decision ---
//     if (agentDecision.nextStep === "ask_clarification") {
//       currentChat.messages.push({
//         role: "assistant",
//         content: agentDecision.response,
//       });
//     } else if (agentDecision.nextStep === "smart_summary") {
//       currentChat.messages.push({
//         role: "assistant",
//         content: agentDecision.response,
//       });
//     } else if (agentDecision.nextStep === "generate_images") {
//       const promptMessage = agentDecision.isImageTweakRequest 
//         ? `Perfect! I'll enhance your uploaded image and create a professional thumbnail with it. Generating now...`
//         : `Perfect! Creating your ${agentDecision.detectedCategory} thumbnail about ${agentDecision.originalMessage || latestUserMessage}...`;
      
//       currentChat.messages.push({ role: "assistant", content: promptMessage });
      
//       try {
//         const imageUrls = await geminiImageGenerator(
//           agentDecision.finalPrompt,
//           agentDecision.thumbnailType || "landscape",
//           currentChat.userUploadedImageUrl,
//           agentDecision.imagePlacement,
//           agentDecision.isImageTweakRequest
//         );
        
//         if (imageUrls.length > 0) {
//           const responseText = agentDecision.isImageTweakRequest
//             ? `Here's your enhanced image as a professional thumbnail! I've improved the lighting, colors, and composition while keeping your photo recognizable.`
//             : `Here are your professionally generated ${agentDecision.detectedCategory} thumbnails! Click any thumbnail to view full size or download.`;
          
//           currentChat.messages.push({
//             role: "assistant",
//             content: responseText,
//             imageUrls: imageUrls,
//             thumbnailData: {
//               category: agentDecision.detectedCategory,
//               type: agentDecision.thumbnailType,
//               placement: agentDecision.imagePlacement,
//               isImageTweak: agentDecision.isImageTweakRequest
//             }
//           });
//         } else {
//           throw new Error("No images were generated");
//         }
//       } catch (imageError) {
//         console.error("Image generation failed:", imageError);
//         currentChat.messages.push({
//           role: "assistant",
//           content: "I encountered an issue while generating your thumbnails. The image generation service may be temporarily busy. Please try again in a moment, or try rephrasing your request.",
//         });
//       }
//     }

//     await currentChat.save();
//     return NextResponse.json(currentChat);
    
//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json(
//       {
//         message: error.message || "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     await connectDB();
//     const userId = await getUserId(req);

//     // Fetch all chat sessions for the user
//     const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

//     return NextResponse.json(chats);
//   } catch (error) {
//     console.error("GET chats error:", error);
//     return NextResponse.json(
//       {
//         message: error.message || "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }

// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /
// // // // ******************************************************************************************* // // // /


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";
import User from "@/models/User";
import { jwtVerify } from "jose";
import OpenAI from "openai";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  ThumbnailPromptEngineer,
  ThumbnailOptimizer,
} from "@/lib/promptEngineering";
import axios from "axios";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Initialize OpenAI for GPT-4o mini (reasoning) and OpenRouter for Gemini
const openaiReasoning = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiImageGen = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function getUserId(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload.userId;
}

// Convert Cloudinary URL to base64 data URL
async function cloudinaryUrlToBase64(cloudinaryUrl) {
  try {
    const response = await axios.get(cloudinaryUrl, {
      responseType: 'arraybuffer'
    });
    const buffer = Buffer.from(response.data);
    const base64 = buffer.toString('base64');
    
    // Determine MIME type from URL or default to PNG
    const mimeType = cloudinaryUrl.includes('.jpg') || cloudinaryUrl.includes('.jpeg') 
      ? 'image/jpeg' 
      : 'image/png';
    
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting Cloudinary URL to base64:', error);
    throw error;
  }
}

// Enhanced OpenAI Agent for conversation management
async function openAIAgent(messages, userUploadedImageUrl, userName) {
  console.log("OpenAI Agent analyzing conversation...");
  const latestUserMessage = messages[messages.length - 1].content;
  
  const agentPrompt = `You are an expert YouTube thumbnail creation assistant. Analyze the conversation and decide the next step.

USER: ${userName}
USER UPLOADED IMAGE: ${userUploadedImageUrl ? "Available" : "None"}

CONVERSATION HISTORY:
${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}

DECISION CRITERIA:
1. If the user's request is unclear or lacks key details (video topic, style preference, placement preference for uploaded image), ask for clarification.
2. If user uploaded an image but didn't specify placement, ask about placement (left, right, center, background, etc.).
3. If you have sufficient information, proceed to generate thumbnails.
4. Be conversational and helpful.

REQUIRED INFO FOR GENERATION:
- Video topic/content description
- Style/mood preference (optional but helpful)
- Image placement if image uploaded (left, right, center, background, overlay)

Respond in JSON format:
{
  "nextStep": "ask_clarification" | "generate_images",
  "response": "your response if asking clarification",
  "reasoning": "brief explanation of your decision",
  "thumbnailType": "landscape" | "vertical" | "both",
  "imagePlacement": "left" | "right" | "center" | "background" | "overlay" | null,
  "detectedCategory": "gaming|food|travel|tech|lifestyle|education|entertainment|general",
  "missingInfo": ["list of missing required info if any"]
}`;

  try {
    const response = await openaiReasoning.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: agentPrompt }],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const decision = JSON.parse(response.choices[0].message.content);
    
    // If generating images, create the final prompt
    if (decision.nextStep === "generate_images") {
      const userContext = ""; // No external context for now
      
      // Determine thumbnail type if not specified
      if (!decision.thumbnailType || decision.thumbnailType === "both") {
        decision.thumbnailType = ThumbnailPromptEngineer.determineThumbnailType(
          latestUserMessage,
          userContext
        );
      }
      
      // Create enhanced prompt
      decision.finalPrompt = await ThumbnailPromptEngineer.enhancePrompt(
        latestUserMessage,
        userContext,
        userUploadedImageUrl,
        decision.thumbnailType,
        decision.imagePlacement
      );
      
      // Apply category-specific enhancements
      if (decision.detectedCategory && decision.detectedCategory !== "general") {
        decision.finalPrompt = ThumbnailPromptEngineer.getContentCategoryPrompt(
          decision.detectedCategory,
          decision.finalPrompt
        );
      }
      
      // Optimize for clickthrough
      decision.finalPrompt = await ThumbnailOptimizer.optimizeForClickthrough(
        decision.finalPrompt,
        { userContext, category: decision.detectedCategory }
      );
    }

    return decision;
  } catch (error) {
    console.error("OpenAI Agent error:", error);
    // Fallback logic
    const simplePrompt = `Create a professional YouTube thumbnail for: ${latestUserMessage}`;
    return {
      nextStep: "generate_images",
      finalPrompt: simplePrompt,
      thumbnailType: "landscape",
      reasoning: "Fell back to simple generation due to agent error.",
      imagePlacement: userUploadedImageUrl ? "center" : null
    };
  }
}

// Gemini Image Generator using OpenRouter
async function geminiImageGenerator(finalPrompt, thumbnailType, userUploadedImageUrl, imagePlacement) {
  console.log("Gemini generating images with prompt:", finalPrompt);
  
  try {
    const isVertical = thumbnailType === "vertical";
    const aspectRatio = isVertical ? "9:16" : "16:9";
    
    // Enhanced prompt with technical specifications and placement instructions
    let enhancedPrompt = `Create a professional YouTube thumbnail image.
CONTENT: ${finalPrompt}
TECHNICAL SPECIFICATIONS:
- Aspect ratio: ${aspectRatio}
- High contrast, vibrant colors optimized for YouTube interface
- Bold, eye-catching design that works at small sizes
- Clear focal points and readable text elements
- Professional composition for ${isVertical ? "YouTube Shorts" : "standard YouTube videos"}
- Scroll-stopping and click-worthy design
- Style: Modern, attention-grabbing, professional`;

    if (userUploadedImageUrl && imagePlacement) {
      enhancedPrompt += `\nIMAGE INTEGRATION:
- Seamlessly integrate the user-provided image into the ${imagePlacement} of the composition
- Ensure the user image is prominently featured and well-integrated with the overall design
- Maintain visual hierarchy with the user image as a key focal point`;
    }

    const messageContent = [
      {
        type: "text",
        text: enhancedPrompt,
      }
    ];

    // Add user image if provided
    if (userUploadedImageUrl) {
      const base64DataUrl = await cloudinaryUrlToBase64(userUploadedImageUrl);
      messageContent.push({
        type: "image_url",
        image_url: {
          url: base64DataUrl,
        },
      });
    }

    const completion = await openaiImageGen.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview:free",
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
    });

    const result = completion.choices[0].message;
    const generatedImageUrls = [];

    if (result.images && result.images.length > 0) {
      // Process each generated image
      for (let i = 0; i < result.images.length; i++) {
        const img = result.images[i];
        const base64Data = img.image_url.url.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        
        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(buffer);
        generatedImageUrls.push(cloudinaryResult.secure_url);
        
        console.log(`Image ${i + 1} uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
      }
    }

    if (generatedImageUrls.length === 0) {
      throw new Error("No images were generated successfully.");
    }

    console.log(`Successfully generated and uploaded ${generatedImageUrls.length} images`);
    return generatedImageUrls;
    
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw new Error(`Failed to generate images: ${error.message}`);
  }
}

// Main API handler
export async function POST(req) {
  try {
    await connectDB();
    const userId = await getUserId(req);
    const formData = await req.formData();
    const message = formData.get("message");
    const imageFile = formData.get("image");
    let chatId = formData.get("chatId");

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let currentChat;
    let userUploadedImageUrl = null;

    // --- 1. Find or Create Chat Session ---
    if (chatId === "new") {
      currentChat = new Chat({ userId, messages: [] });
      const greeting = `Hi ${user.name}! I'm ready to help you create stunning YouTube thumbnails. What's your video about?`;
      currentChat.messages.push({ role: "assistant", content: greeting });
      if (message) {
        currentChat.title =
          message.length > 30 ? message.substring(0, 27) + "..." : message;
      }
    } else {
      currentChat = await Chat.findOne({ _id: chatId, userId });
      if (!currentChat) {
        return NextResponse.json(
          { message: "Chat not found" },
          { status: 404 }
        );
      }
    }

    // Return early if just creating a new chat
    if (chatId === "new" && !message && !imageFile) {
      await currentChat.save();
      return NextResponse.json(currentChat);
    }

    // --- 2. Handle User Image Upload (Cloudinary) ---
    if (imageFile) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const cloudinaryResult = await uploadToCloudinary(buffer);
        userUploadedImageUrl = cloudinaryResult.secure_url;
        currentChat.userUploadedImageUrl = userUploadedImageUrl;
        console.log("Image uploaded to Cloudinary:", userUploadedImageUrl);
      } catch (uploadError) {
        console.error("Failed to upload image:", uploadError);
        return NextResponse.json(
          { message: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // --- 3. Add User Message to History ---
    if (message) {
      currentChat.messages.push({ role: "user", content: message });
    }

    // --- 4. Call the AI Agent ---
    const agentDecision = await openAIAgent(
      currentChat.messages,
      currentChat.userUploadedImageUrl,
      user.name
    );

    // --- 5. Process Agent's Decision ---
    if (agentDecision.nextStep === "ask_clarification") {
      currentChat.messages.push({
        role: "assistant",
        content: agentDecision.response,
      });
    } else if (agentDecision.nextStep === "generate_images") {
      const promptMessage = `Perfect! I have all the details I need. Generating your thumbnails now...`;
      currentChat.messages.push({ role: "assistant", content: promptMessage });
      
      try {
        const imageUrls = await geminiImageGenerator(
          agentDecision.finalPrompt,
          agentDecision.thumbnailType || "landscape",
          currentChat.userUploadedImageUrl,
          agentDecision.imagePlacement
        );
        
        if (imageUrls.length > 0) {
          const responseText = `Here are your professionally generated thumbnails! Click any thumbnail to view full size or download.`;
          currentChat.messages.push({
            role: "assistant",
            content: responseText,
            imageUrls: imageUrls,
            thumbnailData: {
              category: agentDecision.detectedCategory,
              type: agentDecision.thumbnailType,
              placement: agentDecision.imagePlacement
            }
          });
        } else {
          throw new Error("No images were generated");
        }
      } catch (imageError) {
        console.error("Image generation failed:", imageError);
        currentChat.messages.push({
          role: "assistant",
          content: "I encountered an issue while generating your thumbnails. The image generation service may be temporarily busy. Please try again in a moment, or try rephrasing your request.",
        });
      }
    }

    await currentChat.save();
    return NextResponse.json(currentChat);
    
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const userId = await getUserId(req);

    // Fetch all chat sessions for the user
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json(chats);
  } catch (error) {
    console.error("GET chats error:", error);
    return NextResponse.json(
      {
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
