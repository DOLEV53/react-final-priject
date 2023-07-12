import { UserProps } from "../Types/UserType";

const tokenKey = 'token';

export function setToken(tokenValue?: string) {
    if (!tokenValue) return;
    localStorage.setItem(tokenKey, tokenValue);
}

export function getToken(): string {
    return localStorage.getItem(tokenKey) || '';
}

export function removeToken() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("userKey");
    window.location.reload();
}

export function verifyToken(): boolean {
    return getToken().length > 0;
}

export function verifyBuisness(): boolean {
    const userData = getUser()
    if (userData && userData.checked) {
      return true;
    }
     return false;
}

export function verifyAdmin(): boolean {
    const userData = getUser()
    if (userData && userData.isAdmin) {
      return true;
    }
     return false;
}


export function setUser(user: UserProps) {
  if (!user) return;
  const stringfyUser = JSON.stringify(user);
  localStorage.setItem("userKey", stringfyUser);
}

export function getUser(): UserProps | undefined {
  const user = localStorage.getItem("userKey");
  if (!user) return;
  const parsedUser = JSON.parse(user);
  
  return parsedUser;
}