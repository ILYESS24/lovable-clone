import { showError } from './toast'

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export class ApiClient {
  private static instance: ApiClient
  private baseUrl: string

  private constructor() {
    this.baseUrl = '/api'
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      showError(error as Error)
      throw error
    }
  }

  // Apps API
  public async listApps(): Promise<{ apps: any[]; appBasePath: string }> {
    return this.request('/apps')
  }

  public async getApp(appId: number): Promise<any> {
    return this.request(`/apps/${appId}`)
  }

  public async createApp(params: { name: string; templateId?: string }): Promise<{ app: any }> {
    return this.request('/apps', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  public async deleteApp(appId: number): Promise<void> {
    await this.request(`/apps/${appId}`, {
      method: 'DELETE',
    })
  }

  // Chats API
  public async getChats(appId?: number): Promise<any[]> {
    const url = appId ? `/chats?appId=${appId}` : '/chats'
    return this.request(url)
  }

  public async getChat(chatId: number): Promise<any> {
    return this.request(`/chats/${chatId}`)
  }

  public async createChat(appId: number): Promise<number> {
    return this.request('/chats', {
      method: 'POST',
      body: JSON.stringify({ appId }),
    })
  }

  public async deleteChat(chatId: number): Promise<void> {
    await this.request(`/chats/${chatId}`, {
      method: 'DELETE',
    })
  }

  // Settings API
  public async getUserSettings(): Promise<any> {
    return this.request('/settings')
  }

  public async setUserSettings(settings: any): Promise<any> {
    return this.request('/settings', {
      method: 'POST',
      body: JSON.stringify(settings),
    })
  }

  // Language Models API
  public async getLanguageModelProviders(): Promise<any[]> {
    return this.request('/language-models/providers')
  }

  public async getLanguageModels(providerId: string): Promise<any[]> {
    return this.request(`/language-models?providerId=${providerId}`)
  }

  // Templates API
  public async getTemplates(): Promise<any[]> {
    return this.request('/templates')
  }

  // System API
  public async getSystemDebugInfo(): Promise<any> {
    return this.request('/system/debug-info')
  }

  public async getAppVersion(): Promise<{ version: string }> {
    return this.request('/system/version')
  }

  // Chat streaming (WebSocket or Server-Sent Events)
  public streamMessage(
    prompt: string,
    options: {
      chatId: number
      onUpdate: (messages: any[]) => void
      onEnd: (response: any) => void
      onError: (error: string) => void
    }
  ): void {
    // Implementation for streaming chat messages
    // This would use Server-Sent Events or WebSocket
    const eventSource = new EventSource(`/api/chat/stream?chatId=${options.chatId}&prompt=${encodeURIComponent(prompt)}`)
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'update') {
          options.onUpdate(data.messages)
        } else if (data.type === 'end') {
          options.onEnd(data.response)
          eventSource.close()
        } else if (data.type === 'error') {
          options.onError(data.error)
          eventSource.close()
        }
      } catch (error) {
        options.onError('Failed to parse stream data')
        eventSource.close()
      }
    }

    eventSource.onerror = () => {
      options.onError('Connection error')
      eventSource.close()
    }
  }

  public cancelChatStream(chatId: number): void {
    // Implementation to cancel streaming
    fetch(`/api/chat/cancel?chatId=${chatId}`, { method: 'POST' })
  }
}
