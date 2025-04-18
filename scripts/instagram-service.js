// STEP 1: BACKEND SETUP (Node.js Express Server)

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Environment variables (store these securely, not in your code)
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

// Cache mechanism to avoid hitting rate limits
let cachedPosts = [];
let lastFetchTime = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

// Route to fetch Instagram posts
router.get('/api/instagram-posts', async (req, res) => {
  try {
    // Check if we have a valid cache
    const now = new Date().getTime();
    if (lastFetchTime && (now - lastFetchTime < CACHE_DURATION) && cachedPosts.length > 0) {
      return res.json({ success: true, posts: cachedPosts });
    }
    
    // If no cache or expired, fetch fresh data
    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username';
    const limit = req.query.limit || 12; // Default to 12 posts
    
    const url = `https://graph.instagram.com/v12.0/${INSTAGRAM_USER_ID}/media?fields=${fields}&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`;
    
    const response = await axios.get(url);
    
    if (response.data && response.data.data) {
      // Update cache
      cachedPosts = response.data.data;
      lastFetchTime = now;
      
      return res.json({ success: true, posts: cachedPosts });
    } else {
      throw new Error('Invalid response from Instagram API');
    }
    
  } catch (error) {
    console.error('Instagram API error:', error.message);
    
    // If we have cached data, return that instead of failing
    if (cachedPosts.length > 0) {
      return res.json({ 
        success: true, 
        posts: cachedPosts, 
        notice: 'Using cached data due to API error'
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch Instagram posts'
    });
  }
});

// Route to refresh the token (should be called before token expiration)
router.get('/api/refresh-instagram-token', async (req, res) => {
  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    
    const response = await axios.get(url);
    
    if (response.data && response.data.access_token) {
      // Here you would update your stored token
      // Note: In production, update your environment variable or database
      
      return res.json({ success: true, message: 'Token refreshed successfully' });
    } else {
      throw new Error('Invalid response from token refresh');
    }
    
  } catch (error) {
    console.error('Token refresh error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to refresh Instagram token'
    });
  }
});

module.exports = router;

// In your main Express app:
// app.use(require('./instagram-service'));
