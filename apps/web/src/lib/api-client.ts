const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

interface ApiRequestOptions {
  headers?: Record<string, string>
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
  options: ApiRequestOptions = {}
) {
  const headers: Record<string, string> = {
    ...options.headers
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  const fullUrl = url.startsWith('http') ? url : API_BASE_URL + url
  const res = await fetch(fullUrl, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  if (res.status === 204 || res.status === 205) {
    return null as T
  }

  const data = await res.json()

  if (!res.ok) {
    throw data
  }

  return data as T
}

export const apiClient = {
  get<T>(url: string, options?: ApiRequestOptions) {
    return request<T>('GET', url, undefined, options)
  },
  post<T>(url: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return request<T>('POST', url, body, options)
  },
  put<T>(url: string, body: unknown, options?: ApiRequestOptions) {
    return request<T>('PUT', url, body, options)
  },
  delete<T>(url: string, options?: ApiRequestOptions) {
    return request<T>('DELETE', url, undefined, options)
  }
}
