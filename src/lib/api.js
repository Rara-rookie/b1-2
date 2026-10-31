/**
 * API client module for assignment b1-2
 * Fallback LocalStorage & Supabase API support
 */

const STORAGE_KEY = 'b1_2_task_items';

const INITIAL_MOCK_ITEMS = [
  {
    id: 'item-1',
    title: 'React 18 SPA 라우팅 및 상태 관리 설계',
    description: 'React Router v6를 적용하여 5개 라우트(/, /items, /items/:id 등) 및 커스텀 훅 기반의 전역 CRUD 상태 관리 구현',
    category: 'React',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'item-2',
    title: 'Supabase & LocalStorage 데이터 레이어 구축',
    description: '백엔드 서비스 연결 전후 모두 일관되게 로딩/에러/빈 상태가 UI로 표현되도록 Client Storage API 레이어 완성',
    category: 'Backend',
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'item-3',
    title: '컴포넌트 단위 유효성 검사 및 폼 UX 고도화',
    description: 'Controlled Component 패턴 및 폼 제출 중 진행 상태/에러 피드백을 적용하여 사용자 경험 향상',
    category: 'UX/UI',
    status: 'Pending',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

const getStoredItems = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ITEMS));
    return INITIAL_MOCK_ITEMS;
  }
  try {
    return JSON.parse(data);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ITEMS));
    return INITIAL_MOCK_ITEMS;
  }
};

const saveStoredItems = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

// Simulate async network latency
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getItems({ category = '', search = '' } = {}) {
    await delay();
    let items = getStoredItems();

    if (category) {
      items = items.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) => item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }

    return items;
  },

  async getItemById(id) {
    await delay();
    const items = getStoredItems();
    const found = items.find((item) => item.id === id);
    if (!found) {
      throw new Error(`ID가 '${id}'인 아이템을 찾을 수 없습니다.`);
    }
    return found;
  },

  async createItem({ title, description, category, status = 'Pending' }) {
    await delay();
    const items = getStoredItems();
    const newItem = {
      id: `item-${Date.now()}`,
      title,
      description,
      category,
      status,
      createdAt: new Date().toISOString()
    };
    const updated = [newItem, ...items];
    saveStoredItems(updated);
    return newItem;
  },

  async updateItem(id, { title, description, category, status }) {
    await delay();
    const items = getStoredItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`수정할 아이템(ID: ${id})이 존재하지 않습니다.`);
    }

    const updatedItem = {
      ...items[index],
      title,
      description,
      category,
      status,
      updatedAt: new Date().toISOString()
    };

    items[index] = updatedItem;
    saveStoredItems(items);
    return updatedItem;
  },

  async deleteItem(id) {
    await delay();
    const items = getStoredItems();
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) {
      throw new Error(`삭제할 아이템(ID: ${id})이 존재하지 않습니다.`);
    }
    saveStoredItems(filtered);
    return true;
  }
};
