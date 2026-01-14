
/**
 * Platform Storage SDK
 * 
 * 统一的存储接口，自动适配运行环境：
 * - 部署在平台上：使用平台 Storage API（数据跟随用户）
 * - ai studio中开发：使用 localStorage（数据存在浏览器）
 */

/** 用户信息 */
export interface UserInfo {
  id: string
  name?: string
}

/**
 * 检测是否运行在平台上（通过 Cookie）
 * 可独立使用，无需初始化 Storage
 */
export function checkIsOnPlatform(): boolean {
  return document.cookie.includes('X-Platform=1')
}

class PlatformStorage {
  private _isOnPlatform: boolean | null = null
  private _user: UserInfo | null = null
  private readonly localPrefix: string
  private initPromise: Promise<void> | null = null

  constructor() {
    this.localPrefix = '__ps__:'
  }

  /** 初始化（检测运行环境） */
  async init(): Promise<void> {
    if (this.initPromise) return this.initPromise
    this.initPromise = this._detect()
    return this.initPromise
  }

  private async _detect(): Promise<void> {
    // 检查平台标识 Cookie
    if (!checkIsOnPlatform()) {
      this._isOnPlatform = false
      this._user = { id: 'local-user', name: '本地用户' }
      return
    }

    // 尝试获取用户信息
    try {
      const res = await fetch('/api/storage/user', { credentials: 'include' })
      
      if (res.ok) {
        this._user = await res.json()
        this._isOnPlatform = true
      } else if (res.status === 401) {
        this._isOnPlatform = true
        this._user = null
      } else {
        this._isOnPlatform = false
        this._user = { id: 'local-user', name: '本地用户' }
      }
    } catch {
      this._isOnPlatform = false
      this._user = { id: 'local-user', name: '本地用户' }
    }
  }

  private async ensureInit(): Promise<void> {
    if (this._isOnPlatform === null) {
      await this.init()
    }
  }

  /** 是否运行在平台上 */
  async isOnPlatform(): Promise<boolean> {
    await this.ensureInit()
    return this._isOnPlatform!
  }

  /** 获取当前用户 */
  async getUser(): Promise<UserInfo | null> {
    await this.ensureInit()
    return this._user
  }

  /** 获取数据 */
  async get<T = unknown>(key: string): Promise<T | null> {
    await this.ensureInit()

    if (!this._isOnPlatform) {
      const data = localStorage.getItem(this.localPrefix + key)
      return data ? JSON.parse(data) : null
    }

    try {
      const res = await fetch(`/api/storage?key=${encodeURIComponent(key)}`, {
        credentials: 'include'
      })
      if (!res.ok) return null
      return (await res.json()).value
    } catch {
      return null
    }
  }

  /** 存储数据 */
  async set<T = unknown>(key: string, value: T): Promise<boolean> {
    await this.ensureInit()

    if (!this._isOnPlatform) {
      try {
        localStorage.setItem(this.localPrefix + key, JSON.stringify(value))
        return true
      } catch {
        return false
      }
    }

    try {
      const res = await fetch('/api/storage', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      })
      return res.ok
    } catch {
      return false
    }
  }

  /** 删除数据 */
  async delete(key: string): Promise<boolean> {
    await this.ensureInit()

    if (!this._isOnPlatform) {
      localStorage.removeItem(this.localPrefix + key)
      return true
    }

    try {
      const res = await fetch(`/api/storage?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      return res.ok
    } catch {
      return false
    }
  }

  /** 检查键是否存在 */
  async has(key: string): Promise<boolean> {
    return (await this.get(key)) !== null
  }

  /** 获取所有键名 */
  async keys(prefix?: string): Promise<string[]> {
    await this.ensureInit()

    if (!this._isOnPlatform) {
      const result: string[] = []
      const searchPrefix = this.localPrefix + (prefix ?? '')
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k?.startsWith(searchPrefix)) {
          result.push(k.slice(this.localPrefix.length))
        }
      }
      return result
    }

    try {
      const url = prefix 
        ? `/api/storage/keys?prefix=${encodeURIComponent(prefix)}`
        : '/api/storage/keys'
      const res = await fetch(url, { credentials: 'include' })
      if (!res.ok) return []
      return (await res.json()).keys ?? []
    } catch {
      return []
    }
  }

  /** 清除所有数据（仅本地模式） */
  async clear(): Promise<boolean> {
    await this.ensureInit()

    if (this._isOnPlatform) return false

    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith(this.localPrefix)) {
        keysToRemove.push(k)
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
    return true
  }
}

// 单例
export const storage = new PlatformStorage()
