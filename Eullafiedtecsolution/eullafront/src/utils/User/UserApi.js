import axios from 'axios';

// You can set up a default instance with baseURL and common headers
const api = axios.create({
  baseURL: 'http://localhost:8087/api/eullafied/user', // Change to your API base URL
  timeout: 10000, // Optional: set request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: POST request
export async function postData(endpoint, data) {
  try {
    const response = await api.post(endpoint, data,{ timeout: 30000000 });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Example: GET request
export async function getData(endpoint, params = {}) {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    // Handle error centrally
    throw error;
  }
}

// GET request with token
export async function getDataWithToken(endpoint, token, params = {}) {
  try {
    const response = await api.get(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// POST request with token
export async function postDataWithToken(endpoint, data, token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    const response = await api.post(endpoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Post request with token
export async function putDataWithToken(endpoint, data, token) {
  if (!token) {
    console.warn("No token provided for authenticated request!");
  } else {
    console.log("Token being sent:", token);
  }

  try {
    const headers = {
      Authorization: "Bearer" +" "+ token,
      // Do NOT set Content-Type for FormData, let browser do it
    };

    const response = await api.post(endpoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get profile picture for a specific user
export async function getProfilePicture(userId, token) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!token) {
    throw new Error('Authentication token is required');
  }

  try {
    console.log('Fetching profile picture for user:', userId);

    const response = await api.get(`/profile-Picture?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'image/*'
      },
      responseType: 'blob' // Important for file responses
    });

    const blob = response.data;
    if (blob && blob.size > 0) {
      // Read content type from response headers if present
      const mime = response.headers['content-type'] || blob.type || 'image/jpeg';
      const imageUrl = URL.createObjectURL(new Blob([blob], { type: mime }));
      return imageUrl;
    } else {
      console.log('No profile picture found for user');
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    if (error.response?.status === 404) {
      console.log('No profile picture exists for this user');
      return null;
    }
    throw error;
  }
}

export default api;