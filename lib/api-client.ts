const API_BASE_URL = '/api';

export interface App {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppData {
  name: string;
  description?: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getApps(): Promise<App[]> {
    return this.request<App[]>('/apps');
  }

  async getApp(id: string): Promise<App> {
    return this.request<App>(`/apps/${id}`);
  }

  async createApp(data: CreateAppData): Promise<App> {
    return this.request<App>('/apps', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteApp(id: string): Promise<void> {
    await this.request(`/apps/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();