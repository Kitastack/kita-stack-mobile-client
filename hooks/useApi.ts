import { useContext } from "react";
import { $useStorage } from "./useStorage";
import { AuthContext } from "@/context/AuthProvider";
import axios from "axios";

export const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-type": "application/json",
};

export const $useAPI = () => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;

  const api = axios.create({
    baseURL,
    headers,
  });

  const retry = axios.create({
    baseURL,
    headers,
  });

  const { state: authState, dispatch } = useContext(AuthContext);

  api.interceptors.request.use(async (config) => {
    const user: any = await $useStorage("user");

    if (user?.key?.accessToken && user?.key?.refreshToken) {
      config.headers.Authorization = `Bearer ${user?.key?.accessToken}`;
    }
    // console.log("key", config.headers.Authorization);
    process.env.EXPO_PUBLIC_ENV === "development" &&
      console.log("Making request to " + config.url);
    return config;
  });
  api.interceptors.response.use(
    (result) => {
      return result.data || result;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        !error.response ||
        (error.response &&
          Boolean(
            error.response.status === 401 || error.response.status === 500
          ))
      ) {
        // if (useRouter.currentRoute.value.fullPath.includes("/app")) {
        // await useUserStore().logoutUser()
        // }
        // dispatch({ type: "logout" });
        return Promise.reject(error?.response || new Error("Server Timeout"));
      }

      if (
        error.response &&
        error.response.status === 403 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const token = async () => {
          let _payload = await $useStorage("user");
          if (_payload) {
            const { data } = (await retry
              .post(`v1/auth/token`, {
                token: _payload.refreshToken,
              })
              .catch(async () => {
                await $useStorage("user", null);
              })) as any;
            if (data && data.accessToken) {
              await $useStorage("user", {
                ..._payload,
                key: {
                  accessToken: data.accessToken,
                  refreshToken: _payload.refreshToken,
                },
              });
              _payload.accessToken = data.accessToken;
            }
          }
          return _payload;
        };
        await token();
        return await api(originalRequest);
      }
      return Promise.reject(error?.response);
    }
  );
  return api;
};

export default $useAPI;
