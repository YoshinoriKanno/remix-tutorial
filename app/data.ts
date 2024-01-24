// 外部ライブラリからのインポート
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// 連絡先のデータ構造（型）の定義
type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

// 連絡先レコードの型定義、ContactMutationの属性に加え、idとcreatedAtを持つ
export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

// 共通のfetch処理を行う関数
// APIリクエストを送り、レスポンスをJSON形式で取得する
async function fetchJson(url: string, options?: RequestInit): Promise<any> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Response Error:', response.status, errorBody);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const fakeContacts = {
  // レコードを保存するためのオブジェクト
  records: {} as Record<string, ContactRecord>,

  // すべての連絡先を取得
  async getAll(): Promise<ContactRecord[]> {
    return fetchJson('http://localhost:3004/tutorial');
  },
  
  // 特定のIDの連絡先を取得
  async get(id: string): Promise<ContactRecord | null> {
    return fetchJson(`http://localhost:3004/tutorial/${id}`);
  },

  // 連絡先を作成
  async create(values: ContactMutation): Promise<ContactRecord> {
    const { id, ...payload } = values;
    return fetchJson('http://localhost:3004/tutorial', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
  },

  // 連絡先を更新
  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const { id: _, ...payload } = values;
    return fetchJson(`http://localhost:3004/tutorial/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
  },

  // 連絡先を削除
  destroy(id: string): Promise<null> {
    return fetchJson(`http://localhost:3004/tutorial/${id}`, {
      method: 'DELETE'
    });
  },
};

// ヘルパー関数群
// 連絡先を取得、クエリがあれば絞り込み
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {keys: ["first", "last"]});
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

// 空の連絡先を作成
export async function createEmptyContact() {
  return fakeContacts.create({});
}

// 特定のIDの連絡先を取得
export async function getContact(id: string) {
  return fakeContacts.get(id);
}

// 特定のIDの連絡先を更新
export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  return fakeContacts.set(id, { ...contact, ...updates });
}

// 特定のIDの連絡先を削除
export async function deleteContact(id: string) {
  return fakeContacts.destroy(id);
}
