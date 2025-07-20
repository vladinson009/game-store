import { environment } from '../../../environments/environment';
const imgBBApi =
  'https://api.imgbb.com/1/upload?key=c0f89984ba2349c19405d4fbd9c3e0c2';
const baseUrl = environment.baseUrl;
const usersUrl = environment.authEndpoints;
const gamesUrl = environment.gameEndpoints;
const platformsUrl = environment.platformEndpoints;
const categoriesUrl = environment.categoryEndpoints;

export const authEndpoints = {
  login: baseUrl + usersUrl.login,
  register: baseUrl + usersUrl.register,
  logout: baseUrl + usersUrl.logout,
  me: baseUrl + usersUrl.me,
};
export const gameEndpoints = {
  getAll: baseUrl + gamesUrl.getAll,
  create: baseUrl + gamesUrl.create,
  edit: (id: string) => baseUrl + gamesUrl.edit(id),
  delete: (id: string) => baseUrl + gamesUrl.delete(id),
  getById: (id: string) => baseUrl + gamesUrl.getById(id),
  like: (id: string) => baseUrl + gamesUrl.like(id),
  unlike: (id: string) => baseUrl + gamesUrl.unlike(id),
  uploadFileUrl: imgBBApi,
};
export const platformEndpoints = {
  getAll: baseUrl + platformsUrl.getAll,
  create: baseUrl + platformsUrl.create,
  edit: (id: string) => baseUrl + platformsUrl.edit(id),
  delete: (id: string) => baseUrl + platformsUrl.delete(id),
  getById: (id: string) => baseUrl + platformsUrl.getById(id),
};

export const categoryEndpoints = {
  getAll: baseUrl + categoriesUrl.getAll,
  create: baseUrl + categoriesUrl.create,
  edit: (id: string) => baseUrl + categoriesUrl.edit(id),
  delete: (id: string) => baseUrl + categoriesUrl.delete(id),
  getById: (id: string) => baseUrl + categoriesUrl.getById(id),
};
