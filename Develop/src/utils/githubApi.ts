import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;
const apiUrl = import.meta.env.VITE_API_URL || 'https://api.github.com';

// Debug token presence (remove in production)
console.log('API URL:', apiUrl);
console.log('Token exists:', !!token);

const githubApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(token && { 'Authorization': `token ${token}` })
  }
});

// Add request interceptor for debugging
githubApi.interceptors.request.use(
  config => {
    // Log request details (remove in production)
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      hasAuthHeader: !!config.headers['Authorization']
    });
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor for error handling
githubApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const errorDetails = {
        status: error.response.status,
        message: error.response.data?.message,
        url: error.config?.url,
        method: error.config?.method
      };
      console.error('GitHub API Error:', errorDetails);
    }
    return Promise.reject(error);
  }
);

export const searchUsers = async (query: string) => {
  if (!token) {
    throw new Error('GitHub token is not configured');
  }
  
  try {
    const response = await githubApi.get('/search/users', {
      params: { q: query, per_page: 30 }
    });
    return response.data;
  } catch (error) {
    console.error('Search Users Error:', error);
    throw error;
  }
};

export const getUserDetails = async (username: string) => {
  if (!token) {
    throw new Error('GitHub token is not configured');
  }

  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Get User Details Error:', error);
    throw error;
  }
};