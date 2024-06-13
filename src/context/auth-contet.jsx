"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { userMe, refreshToken } from "@/lib/server-actions/auth-actions";
import { authTokenKey, authTokenUser } from "@/lib/utils/constants";

export const AuthContext = createContext({
  loginContext: (authTokens) => {},
  logoutContext: () => {},
  refreshUser: () => {},
  isLoggedIn: false,
  authTokens: null,
});

export default function AuthContextProvider({ children }) {
  const authTokensInCookies = Cookies.get(authTokenKey);
  const userInLocalStorage =
    typeof window !== "undefined" && window.localStorage.getItem(authTokenUser);
  const [user, setUser] = useState(
    userInLocalStorage && authTokensInCookies === null
      ? null
      : JSON.parse(userInLocalStorage)
  );

  useEffect(() => {
    if (authTokensInCookies) {
      refreshTokenContext();
      refreshUser();
    } else {
      window.localStorage.removeItem(authTokenUser);
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const user = await userMe();
      setUser(user);
    } catch (err) {
      console.error(err);
      window.localStorage.removeItem(authTokenUser);
      Cookies.remove(authTokenKey);
      setUser(null);
    }
  }, []);

  const refreshTokenContext = async () => {
    try {
      const response = await refreshToken();
      Cookies.set(authTokenKey, response.token, { expires: 2 });
    } catch (err) {
      console.error(err);
      window.localStorage.removeItem(authTokenUser);
      setUser(null);
      Cookies.remove(authTokenKey);
    }
  };

  const loginContext = useCallback(function (authInfo) {
    Cookies.set(authTokenKey, authInfo.token, { expires: 2 });
    window.localStorage.setItem(authTokenUser, JSON.stringify(authInfo.user));
    setUser(authInfo.user);
  }, []);

  const logoutContext = useCallback(function () {
    Cookies.remove(authTokenKey);
    window.localStorage.removeItem(authTokenUser);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      loginContext,
      logoutContext,
      refreshUser,
      user,
    }),
    [loginContext, logoutContext, refreshUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
