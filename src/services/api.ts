import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { APIResponse } from '@types/index';

class APIClient {
  private instance: AxiosInstance;
  private maxRetries: number = 3;
  private requestQueue: Map<string, Promise<any>> = new Map();

  constructor() {
    const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
    
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Version': process.env.REACT_APP_VERSION,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use((config) => {
      const token = this.getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config as AxiosRequestConfig & { retry?: number };

        if (error.response?.status === 401) {
          const refreshed = await this.refreshAuthToken();
          if (refreshed && config) {
            return this.instance.request(config);
          }
          this.handleUnauthorized();
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await this.instance.get<APIResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      return { success: false, error: { code: 'ERROR', message: String(error), timestamp: new Date() } };
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await this.instance.post<APIResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      return { success: false, error: { code: 'ERROR', message: String(error), timestamp: new Date() } };
    }
  }

  private getAuthToken(): string | null {
    try {
      return localStorage.getItem('authToken');
    } catch {
      return null;
    }
  }

  private async refreshAuthToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return false;
      return true;
    } catch {
      return false;
    }
  }

  private handleUnauthorized(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new APIClient();
export default apiClient;
