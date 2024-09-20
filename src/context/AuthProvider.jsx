import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { api } from "../api";

const REFRESH_URL = "/identity/refresh";

// Auth Provider for the entire application
// Reference: https://www.youtube.com/watch?v=AcYF18oGn6Y

const AuthContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await api.get(REFRESH_URL);

        setAuth(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setAuth(null);
      }
    };

    refresh();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && auth?.accessToken
          ? `Bearer ${auth?.accessToken}`
          : config.headers.Authorization;

      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [auth]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          try {
            const response = await api.get(REFRESH_URL);

            setAuth(response.data);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setAuth(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
