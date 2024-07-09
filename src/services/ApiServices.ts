import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store/store"; // Import the Redux store to access the auth state
import { addToast } from "../store/toastSlice"; // Import the action to add a toast notification
import qs from 'qs'; // Import the qs library

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL, // Your API base URL
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add a request interceptor to include the auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const state = store.getState();
        const token = state.auth?.user?.access_token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor to handle errors globally
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // Server responded with a status other than 2xx
          const message = error.response.data?.message || 'An error occurred';
          store.dispatch(
            addToast({ id: new Date().getTime(), message, severity: 'error' })
          );
        } else if (error.request) {
          // Request was made but no response received
          store.dispatch(
            addToast({ id: new Date().getTime(), message: 'No response from server', severity: 'error' })
          );
        } else {
          // Something happened while setting up the request
          store.dispatch(
            addToast({ id: new Date().getTime(), message: 'Error setting up request', severity: 'error' })
          );
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic GET method
  async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const queryString = qs.stringify(params);
      const fullUrl = `${url}?${queryString}`;
      return await this.axiosInstance.get<T>(fullUrl, config);
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  }

  // Generic POST method
  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.post<T>(url, data, config);
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  }

  // Generic PUT method
  async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.put<T>(url, data, config);
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  }

  // Generic DELETE method
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.delete<T>(url, config);
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  }

  private handleApiError(error: any): void {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      store.dispatch(
        addToast({ id: new Date().getTime(), message, severity: 'error' })
      );
    } else if (error.request) {
      store.dispatch(
        addToast({ id: new Date().getTime(), message: 'No response from server', severity: 'error' })
      );
    } else {
      store.dispatch(
        addToast({ id: new Date().getTime(), message: 'Error setting up request', severity: 'error' })
      );
    }
  }
}

export default new ApiService();
