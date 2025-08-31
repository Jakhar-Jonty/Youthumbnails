// lib/rateLimiter.js

class RateLimiter {
  constructor(maxRequests = 10, timeWindow = 60000) { // 10 requests per minute by default
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = new Map();
  }

  canMakeRequest(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove requests outside the time window
    const validRequests = userRequests.filter(timestamp => now - timestamp < this.timeWindow);
    
    // Update the user's request history
    this.requests.set(userId, validRequests);
    
    // Check if under the limit
    return validRequests.length < this.maxRequests;
  }

  recordRequest(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    userRequests.push(now);
    this.requests.set(userId, userRequests);
  }

  getTimeUntilNextRequest(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    if (userRequests.length < this.maxRequests) {
      return 0;
    }

    // Find the oldest request that's still in the time window
    const oldestRequest = Math.min(...userRequests);
    return Math.max(0, (oldestRequest + this.timeWindow) - now);
  }

/*************  ✨ Windsurf Command 🌟  *************/
  getRemainingRequests(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    const validRequests = userRequests.filter(timestamp => now - timestamp < this.timeWindow);
    return Math.max(0, this.maxRequests - validRequests.length);
  }
/*******  28d5c5d3-f89d-4d3c-972e-7740c031ab49  *******/
}

// Create instances for different API services
export const geminiImageLimiter = new RateLimiter(5, 60000); // 5 requests per minute for Gemini
export const openaiLimiter = new RateLimiter(20, 60000); // 20 requests per minute for OpenAI
export const mem0Limiter = new RateLimiter(30, 60000); // 30 requests per minute for mem0

export default RateLimiter;