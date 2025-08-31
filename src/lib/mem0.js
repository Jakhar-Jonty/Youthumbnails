// // lib/mem0.js
// import { MemoryClient } from 'mem0ai';

// // Initialize mem0 client with configuration
// const memory = new MemoryClient({
//   apiKey: process.env.MEM0_API_KEY,
//   // Additional configuration if using self-hosted mem0
//   config: {
//     vector_store: {
//       provider: "pinecone",
//       config: {
//         api_key: process.env.PINECONE_API_KEY,
//         environment: process.env.PINECONE_ENVIRONMENT,
//         index_name: process.env.PINECONE_INDEX_NAME,
//         dimension: 1536, // Adjust based on your embedding model
//         metric: "cosine",
//       }
//     },
//     embedder: {
//       provider: "openai",
//       config: {
//         model: "text-embedding-3-small",
//         api_key: process.env.OPENAI_API_KEY,
//       }
//     }
//   }
// });

// // Helper functions for memory operations
// export const memoryOperations = {
//   // Add user preference or information
//   async addUserMemory(userId, text, metadata = {}) {
//     try {
//       return await memory.add(text, { 
//         user_id: userId.toString(),
//         ...metadata 
//       });
//     } catch (error) {
//       console.error("Error adding memory:", error);
//       throw error;
//     }
//   },

//   // Search for relevant memories
//   async searchUserMemories(userId, query, limit = 10) {
//     try {
//       return await memory.search(query, { 
//         user_id: userId.toString(),
//         limit 
//       });
//     } catch (error) {
//       console.error("Error searching memories:", error);
//       return [];
//     }
//   },

//   // Get all user memories
//   async getAllUserMemories(userId) {
//     try {
//       return await memory.getAll({ user_id: userId.toString() });
//     } catch (error) {
//       console.error("Error getting all memories:", error);
//       return [];
//     }
//   },

//   // Update existing memory
//   async updateUserMemory(memoryId, newText) {
//     try {
//       return await memory.update(memoryId, newText);
//     } catch (error) {
//       console.error("Error updating memory:", error);
//       throw error;
//     }
//   },

//   // Delete specific memory
//   async deleteUserMemory(memoryId) {
//     try {
//       return await memory.delete(memoryId);
//     } catch (error) {
//       console.error("Error deleting memory:", error);
//       throw error;
//     }
//   },

//   // Clear all user memories
//   async clearAllUserMemories(userId) {
//     try {
//       return await memory.deleteAll({ user_id: userId.toString() });
//     } catch (error) {
//       console.error("Error clearing all memories:", error);
//       throw error;
//     }
//   }
// };

// export default memory;

// lib/mem0.js - Fixed version

import { MemoryClient } from 'mem0ai';

// Initialize the memory client
const memory = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY,
});

export const memoryOperations = {
  async addUserMemory(userId, text, metadata = {}) {
    try {
      // Fix 1: Ensure messages is an array and timestamp is a number
      const formattedData = {
        messages: [text], // mem0 expects an array of messages
        user_id: userId.toString(),
        metadata: {
          ...metadata,
          timestamp: Math.floor(Date.now() / 1000), // Unix timestamp as integer
        }
      };

      console.log('Adding memory with data:', JSON.stringify(formattedData, null, 2));
      
      const result = await memory.add(formattedData);
      console.log('Memory added successfully:', result);
      return result;
    } catch (error) {
      console.error("Error adding memory:", error);
      // Don't throw error - just log and continue
      return null;
    }
  },

  async getAllUserMemories(userId) {
    try {
      const memories = await memory.getAll({
        user_id: userId.toString()
      });
      return memories || [];
    } catch (error) {
      console.error("Error retrieving memories:", error);
      return [];
    }
  },

  async searchUserMemories(userId, query) {
    try {
      const results = await memory.search({
        query: query,
        user_id: userId.toString(),
        limit: 10
      });
      return results || [];
    } catch (error) {
      console.error("Error searching memories:", error);
      return [];
    }
  },

  async updateUserMemory(memoryId, text, metadata = {}) {
    try {
      const result = await memory.update(memoryId, {
        messages: [text],
        metadata: {
          ...metadata,
          timestamp: Math.floor(Date.now() / 1000),
        }
      });
      return result;
    } catch (error) {
      console.error("Error updating memory:", error);
      return null;
    }
  },

  async deleteUserMemory(memoryId) {
    try {
      const result = await memory.delete(memoryId);
      return result;
    } catch (error) {
      console.error("Error deleting memory:", error);
      return null;
    }
  },

  async clearAllUserMemories(userId) {
    try {
      const memories = await this.getAllUserMemories(userId);
      const deletePromises = memories.map(memory => this.deleteUserMemory(memory.id));
      await Promise.all(deletePromises);
      return { success: true, deletedCount: memories.length };
    } catch (error) {
      console.error("Error clearing memories:", error);
      return { success: false, error: error.message };
    }
  }
};