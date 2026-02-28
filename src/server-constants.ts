import fs from 'node:fs'
import path from 'node:path'

// Astro 的 integration hooks 在 Node.js 層執行，沒有 import.meta.env，
// 手動讀取 .env 作為 fallback（不覆蓋已存在的 process.env 值）
if (typeof import.meta.env === 'undefined' || !import.meta.env.DATABASE_ID) {
  try {
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx === -1) continue
        const key = trimmed.slice(0, eqIdx).trim()
        const value = trimmed.slice(eqIdx + 1).trim()
        if (key && !process.env[key]) process.env[key] = value
      }
    }
  } catch {
    // 靜默失敗，不影響正常執行
  }
}

export const NOTION_API_SECRET =
  (typeof import.meta.env !== 'undefined' && import.meta.env.NOTION_API_SECRET) ||
  process.env.NOTION_API_SECRET ||
  ''

/**
 * 從環境變數取得並正規化 DATABASE_ID。
 * 處理常見錯誤：含 ?v=、整串網址、前後空白。
 */
function normalizeDatabaseId(raw: string): string {
  let id = raw.trim()
  if (!id) return ''
  // 若貼了完整網址，取出最後一段 path（問號前）
  if (id.includes('notion.so') || id.includes('notion.com')) {
    try {
      const url = new URL(id.startsWith('http') ? id : `https://${id}`)
      const pathSegments = url.pathname.split('/').filter(Boolean)
      id = pathSegments[pathSegments.length - 1] || ''
    } catch {
      // 解析失敗則用原始值
    }
  }
  // 移除 ?v=xxx 及之後的內容
  if (id.includes('?')) id = id.split('?')[0] ?? ''
  return id.trim()
}

const rawDatabaseId =
  (typeof import.meta.env !== 'undefined' && import.meta.env.DATABASE_ID) ||
  process.env.DATABASE_ID ||
  ''
export const DATABASE_ID = normalizeDatabaseId(rawDatabaseId)

export const CUSTOM_DOMAIN =
  import.meta.env.CUSTOM_DOMAIN || process.env.CUSTOM_DOMAIN || '' // <- Set your costom domain if you have. e.g. alpacat.com
export const BASE_PATH =
  import.meta.env.BASE_PATH || process.env.BASE_PATH || '' // <- Set sub directory path if you want. e.g. /docs/

export const PUBLIC_GA_TRACKING_ID = import.meta.env.PUBLIC_GA_TRACKING_ID
export const NUMBER_OF_POSTS_PER_PAGE = 10
export const REQUEST_TIMEOUT_MS = parseInt(
  import.meta.env.REQUEST_TIMEOUT_MS || '10000',
  10
)
export const ENABLE_LIGHTBOX = import.meta.env.ENABLE_LIGHTBOX
