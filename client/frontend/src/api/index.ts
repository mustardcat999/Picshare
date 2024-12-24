// src/api/index.ts
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Add request interceptor to add authorization header
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    config.headers.Authorization = userId;
  }
  return config;
});

interface LoginResponse {
  userId: string;
}


interface ApiResponse<T> {
    data: T;
    success: boolean;
  }
  
  export const getPictures = async (page = 1, limit = 10): Promise<Picture[]> => {
    try {
      const response = await api.get<ApiResponse<Picture[]>>(`/pictures?page=${page}&limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Get Pictures API Error:', error);
      throw error;
    }
  };


export const login = async (username: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { username });
    localStorage.setItem('userId', response.data.userId);
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};

// export const getPictures = async (page = 1, limit = 10) => {
//   try {
//     const response = await api.get(`/pictures?page=${page}&limit=${limit}`);
//     return response.data;
//   } catch (error) {
//     console.error('Get Pictures API Error:', error);
//     throw error;
//   }
// };

export const uploadPicture = async (formData: FormData) => {
  try {
    const response = await api.post('/pictures', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload Picture API Error:', error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const response = await api.get('/favorites');
    return response.data;
  } catch (error) {
    console.error('Get Favorites API Error:', error);
    throw error;
  }
};

export const addToFavorites = async (pictureId: string) => {
  try {
    const response = await api.post(`/favorites/${pictureId}`);
    return response.data;
  } catch (error) {
    console.error('Add to Favorites API Error:', error);
    throw error;
  }
};

export const removeFromFavorites = async (pictureId: string) => {
  try {
    const response = await api.delete(`/favorites/${pictureId}`);
    return response.data;
  } catch (error) {
    console.error('Remove from Favorites API Error:', error);
    throw error;
  }
};
