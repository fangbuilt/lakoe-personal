import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value, { expires: 7 }); // berlaku selama 7 hari
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
