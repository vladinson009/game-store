export const environment = {
  baseUrl: 'http://localhost:3001',
  authEndpoints: {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    me: '/users/me',
  },
  gameEndpoints: {
    getAll: '/games',
    create: '/games/create',
    edit: (id: string) => `/games/edit/${id}`,
    delete: (id: string) => `/games/delete/${id}`,
    getById: (id: string) => `/games/${id}`,
    like: (id: string) => `/games/like/${id}`,
    unlike: (id: string) => `/games/unlike/${id}`,
  },
  platformEndpoints: {
    getAll: '/platforms',
    create: '/platforms/create',
    edit: (id: string) => `/platforms/edit/${id}`,
    delete: (id: string) => `/platforms/delete/${id}`,
    getById: (id: string) => `/platforms/${id}`,
  },
  categoryEndpoints: {
    getAll: '/categories',
    create: '/categories/create',
    edit: (id: string) => `/categories/edit/${id}`,
    delete: (id: string) => `/categories/delete/${id}`,
    getById: (id: string) => `/categories/${id}`,
  },
};
