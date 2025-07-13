import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;
const usersUrl = environment.authEndpoints;

export const authEndpoints = {
  login: baseUrl + usersUrl.login,
  register: baseUrl + usersUrl.register,
  logout: baseUrl + usersUrl.logout,
};
