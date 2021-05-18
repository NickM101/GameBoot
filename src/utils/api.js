import { useQueries, useQuery } from "react-query";
import axios from "axios";

import startOfWeek from "date-fns/startOfWeek";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import endOfYear from "date-fns/endOfYear";

import {
  BASE_URL,
  COVER_URL,
  TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  API_KEY,
} from "@env";
import { _getAccessToken, _setToken } from "./StorageService";

// Axios status code
// Informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)

const yearDate = new Date();
const start_week = startOfWeek(new Date()).toJSON().slice(0,10);
const end_week = lastDayOfWeek(new Date()).toJSON().slice(0,10);
const start_month = startOfMonth(new Date()).toJSON().slice(0,10);
const end_month = endOfMonth(new Date()).toJSON().slice(0,10);
const start_year = startOfYear(yearDate.setMonth(yearDate.getMonth() - 1)).toJSON().slice(0,10);
const end_year = endOfYear(yearDate).toJSON().slice(0,10);

const igdb_axios = axios.create({
  baseURL: COVER_URL,
  headers: { Accept: "application/json", "Client-ID": CLIENT_ID },
});

const rawg_axios = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

igdb_axios.interceptors.request.use(
  async (config) => {
    const token = _getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

igdb_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      return axios
        .post(
          `${TOKEN_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
        )
        .then((res) => {
          if (res.status === 201) {
            _setToken(res.data.access_token);
            igdb_axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer + ${res.data.access_token}`;
          }
        });
    }
  }
);

const getMonthRelease = async (page) => {
  const { data } = await rawg_axios.get(`/games?key=${API_KEY}`, {
    params: {
      dates: `${start_month},${end_month}`,
      page: page,
      page_size: '10'
    },
  });
  return data;
};

const getWeekRelease = async (page) => {
  const { data } = await rawg_axios.get(`/games?key=${API_KEY}`, {
    params: {
      dates: `${start_week},${end_week}`,
      page: page,
      page_size: '10'
    },
  });
  return data;
};

const getPopular = async () => {
  const { data } = await rawg_axios.get(`/games?key=${API_KEY}`, {
    params: {
      dates: `${start_year},${end_year}`,
      metacritic: "80,100",
      platforms: "4,187,1,18,186,7",
      page_size: '10'
    },
  });
  return data;
};

export const getGenreID = async(id) => {
  const { data } = await rawg_axios.get(`/games?key=${API_KEY}`,{
    params: {
      genres: id,
      ordering: '-rating',
      metacritic: "70,100",
    }
  });
  return data;
}

export const getGameName = async(name) => {
  const { data } = await igdb_axios.post(`/games`, {
    data: `fields cover, summary, videos, storyline; search ${name} `
  })
  return data;
}

const getAllPlatforms = async () => {
  const { data } = await rawg_axios.get(`/platforms?key=${API_KEY}`);
  return data;
};

export function usePopular() {
  return useQuery("popular_games", getPopular);
}

export function useAllPlatforms() {
  return useQuery("all_platforms", getAllPlatforms);
}

export function useReleasedWeekly(page) {
  return useQuery(["weekly_release", page], () => getWeekRelease(page));
}

export function useReleasedMonthly(page) {
  return useQuery(["monthly_release", page], () => getMonthRelease(page));
}
