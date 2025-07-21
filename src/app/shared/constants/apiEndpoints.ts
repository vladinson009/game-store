import { environment } from '../../../environments/environment';
const imgBBApi =
  'https://api.imgbb.com/1/upload?key=c0f89984ba2349c19405d4fbd9c3e0c2';
const baseUrl = environment.baseUrl;

const USERS_ROOT = '/users';
const GAMES_ROOT = '/games';
const PLATFORMS_ROOT = '/platforms';
const CATEGORIES_ROOT = '/categories';

export const authEndpoints = {
  login: baseUrl + USERS_ROOT + '/login',
  register: baseUrl + USERS_ROOT + '/register',
  logout: baseUrl + USERS_ROOT + '/logout',
  me: baseUrl + USERS_ROOT + '/me',
};

export const gameEndpoints = {
  getAll: baseUrl + GAMES_ROOT,
  create: baseUrl + GAMES_ROOT + '/create',
  edit: (id: string) => baseUrl + GAMES_ROOT + `/edit${id}`,
  delete: (id: string) => baseUrl + GAMES_ROOT + `/delete${id}`,
  getById: (id: string) => baseUrl + GAMES_ROOT + `/${id}`,
  like: (id: string) => baseUrl + GAMES_ROOT + `/like${id}`,
  unlike: (id: string) => baseUrl + GAMES_ROOT + `/unlike${id}`,
  uploadFileUrl: imgBBApi,
};

export const platformEndpoints = {
  getAll: baseUrl + PLATFORMS_ROOT,
  create: baseUrl + PLATFORMS_ROOT + '/create',
  edit: (id: string) => baseUrl + PLATFORMS_ROOT + `/edit${id}`,
  delete: (id: string) => baseUrl + PLATFORMS_ROOT + `/delete${id}`,
  getById: (id: string) => baseUrl + PLATFORMS_ROOT + `/${id}`,
};

export const categoryEndpoints = {
  getAll: baseUrl + CATEGORIES_ROOT,
  create: baseUrl + CATEGORIES_ROOT + '/create',
  edit: (id: string) => baseUrl + CATEGORIES_ROOT + `/edit${id}`,
  delete: (id: string) => baseUrl + CATEGORIES_ROOT + `/delete${id}`,
  getById: (id: string) => baseUrl + CATEGORIES_ROOT + `/${id}`,
};
