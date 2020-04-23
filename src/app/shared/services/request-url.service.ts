import { AppData } from './app-data.service';

/**
 * Type URL_KEYS for restricting the url entered
 */
export type URL_KEYS =

  // Accounts Related URLs
  'login' | 'signup' | 'sendOtp' | 'completeSignup' | 'forgetPassword' | 'userList' | 'updateProfile'

const UrlMapping = {
  // Accounts Related URLs
  login: { url: AppData.baseUrl + '/userStatus/account/login', showMsg: false },
  signup: { url: AppData.baseUrl + '/userStatus/account/signup', showMsg: false },
  userList : { url: AppData.baseUrl + '/userStatus/account/userList', showMsg: false },
  updateProfile : { url: AppData.baseUrl + '/userStatus/account/profile', showMsg: false },
};

/**
 * add url here for generating urls, all url entry is restricted to above mentioned URL_KEYS
 */

export class RequestUrl {
  static get(key: URL_KEYS): any {
    return UrlMapping[key];
  }
}
