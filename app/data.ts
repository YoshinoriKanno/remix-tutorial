////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    const response = await fetch('http://localhost:3004/tutorial');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  },
  async get(id: string): Promise<ContactRecord | null> {
    const response = await fetch(`http://localhost:3004/tutorial/${id}`);
    if (!response.ok) {
        return null; // エラー処理を実装
    }
    return response.json();
},

  async create(values: ContactMutation): Promise<ContactRecord> {
    // 'id' フィールドを除外してリクエストのペイロードを作成
    const { id, ...payload } = values;

    try {
        const response = await fetch('http://localhost:3004/tutorial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Response Error:', response.status, errorBody);
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
},

async set(id: string, values: ContactMutation): Promise<ContactRecord> {
  // 'id' フィールドを除外してリクエストのペイロードを作成
  const { id: _, ...payload } = values;

  const response = await fetch(`http://localhost:3004/tutorial/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  return response.json();
},

destroy(id: string): Promise<null> {
  return fetch(`http://localhost:3004/tutorial/${id}`, {
      method: 'DELETE'
  }).then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return null;
  });
},
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}


