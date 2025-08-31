// // import mongoose from "mongoose";

// // const ChatSchema = new mongoose.Schema({
// //   userId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true,
// //   },
// //   messages: [
// //     {
// //       role: {
// //         type: String,
// //         enum: ['user', 'assistant'],
// //         required: true,
// //       },
// //       content: {
// //         type: String,
// //         required: true,
// //       },
// //     },
// //   ],
// // }, { timestamps: true });

// // export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
// import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema({
//   role: {
//     type: String,
//     enum: ['user', 'assistant'],
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   // To store generated images within an assistant's message
//   imageUrls: [{
//     type: String,
//   }],
// }, { timestamps: true });


// const ChatSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   title: {
//     type: String,
//     default: 'New Thumbnail Project',
//   },
//   // If user uploads an image for the project
//   userUploadedImageUrl: {
//     type: String,
//   },
//   messages: [MessageSchema],
// }, { timestamps: true });

// export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

// models/Chat.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrls: [{
    type: String
  }],
  thumbnailData: {
    category: {
      type: String,
      enum: ['gaming', 'food', 'travel', 'tech', 'lifestyle', 'education', 'entertainment', 'general']
    },
    type: {
      type: String,
      enum: ['landscape', 'vertical', 'both']
    },
    placement: {
      type: String,
      enum: ['left', 'right', 'center', 'background', 'overlay']
    },
    style: String,
    mood: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Chat'
  },
  messages: [MessageSchema],
  userUploadedImageUrl: {
    type: String, // Cloudinary URL
    default: null
  },
  userPreferences: {
    style: String,
    colors: String,
    mood: String,
    category: String,
    defaultPlacement: String
  },
  metadata: {
    totalThumbnailsGenerated: {
      type: Number,
      default: 0
    },
    lastThumbnailType: String,
    preferredFormats: [String]
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better query performance
ChatSchema.index({ userId: 1, updatedAt: -1 });

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);