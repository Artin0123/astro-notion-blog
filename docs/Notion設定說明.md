# Notion 設定說明

本專案需要兩個 Notion 相關設定：**Integration Token** 與 **資料庫 ID**。

---

## 步驟一：複製部落格模板

1. 開啟 [部落格模板](https://otoyo.notion.site/e2c5fa2e8660452988d6137ba57fd974?v=abe305cd8b3d467285e91a2a85f4d8de)
2. 點右上角 **⋯** → **Duplicate**，複製到你的 Notion workspace
3. 複製後可自訂圖示、標題、描述

---

## 步驟二：取得 DATABASE_ID

1. 開啟你剛複製的**資料庫頁面**（不是單篇文章）
2. 看瀏覽器網址列，格式類似：
   ```
   https://www.notion.so/你的工作區/abc123def456789012345678901234ab?v=xxxx
   ```
3. **DATABASE_ID** 就是中間那串 ID（`abc123def...` 那一段）
   - 32 字元（無連字號）或 36 字元（含連字號 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`）
   - **不要** 複製 `?v=xxxx` 及之後的內容
   - **不要** 複製整串網址
4. 若貼了整串網址，程式會自動嘗試擷取 ID，但建議只貼 ID 較保險

---

## 步驟三：建立 Integration 並取得 NOTION_API_SECRET

1. 前往 [Notion Integrations](https://www.notion.so/my-integrations)
2. 點 **+ New integration**
3. 填寫：
   - **Name**：例如 `My Blog`
   - **Associated workspace**：選你的工作區
   - **Type**：選 **Internal**
4. 點 **Submit**
5. 在 **Secrets** 區塊，複製 **Internal Integration Token**
   - 格式為 `secret_` 開頭的一長串字元
   - 這就是 **NOTION_API_SECRET**

---

## 步驟四：把資料庫分享給 Integration

1. 回到你複製的部落格資料庫頁面
2. 點右上角 **⋯** → **Connections**（或 **Add connections**）
3. 選擇你剛建立的 Integration（例如 `My Blog`）
4. 點 **Confirm**

> 若沒做這步，Integration 無法讀取資料庫，會出現權限錯誤。

---

## 步驟五：填入 .env

1. 複製 `.env.example` 為 `.env`：
   ```powershell
   copy .env.example .env
   ```
2. 編輯 `.env`，填入：
   ```
   NOTION_API_SECRET=secret_你複製的token
   DATABASE_ID=你複製的32字元ID
   ```
3. 儲存後執行 `pnpm dev` 啟動

---

## 常見問題

| 錯誤 | 可能原因 |
|------|----------|
| `Invalid request URL` | DATABASE_ID 格式錯誤：請只貼 32 字元 ID，不要含 `?v=`、整串網址、或前後空白。若為「資料庫」頁面，請確認是**資料庫本身的網址**，不是上層頁面或單篇文章 |
| `API token is invalid` | NOTION_API_SECRET 錯誤或過期 |
| `Could not find database` | 資料庫未分享給 Integration，或 DATABASE_ID 錯誤 |
| `DATABASE_ID 未設定或為空` | .env 未正確載入，或 DATABASE_ID 為空。請確認 .env 在專案根目錄，且重啟 `pnpm dev` |

---

## 參考連結

- [Notion 建立 Integration 官方教學](https://developers.notion.com/docs/create-a-notion-integration)
- [分享資料庫給 Integration](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration)
