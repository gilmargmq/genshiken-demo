import { AnimeById, AnimeRecommendationsById, Animes, Genres } from "@/interfaces/animes";
import axios from "axios"

export const getTopAnimes = async (
    values: {
        limit: number
    }): Promise<Animes> => {
    const res = await axios.get<Animes>(
        `https://api.jikan.moe/v4/top/anime?limit=${values.limit}`
    );
    return res.data
}

export const getLatestAnimes = async (): Promise<Animes> => {
    const res = await axios.get<Animes>(
        `https://api.jikan.moe/v4/seasons/now?limit=20`
    );
    return res.data
}

export const getAllAnimes = async (values: {
    limit: number,
    search: string,
    genre: string,
    page: number
}): Promise<Animes> => {
    const res = await axios.get<Animes>(
        `https://api.jikan.moe/v4/anime?q=${values.search}&order_by=popularity&limit=${values.limit}&genres=${values.genre}&page=${values.page}`
    );
    return res.data
}

export const getAnimeById = async (values: {
    animeId: number
}): Promise<AnimeById> => {
    const res = await axios.get<AnimeById>(
        `https://api.jikan.moe/v4/anime/${values.animeId}`
    );
    return res.data
}

export const getAnimeGenres = async (): Promise<Genres> => {
    const res = await axios.get<Genres>(
        `https://api.jikan.moe/v4/genres/anime`
    )
    return res.data
}

export const getAnimeRecommendations = async (values: {
    animeId: number
}): Promise<AnimeRecommendationsById> => {
    const res = await axios.get<AnimeRecommendationsById>(
        `https://api.jikan.moe/v4/anime/${values.animeId}/recommendations?limit=6`
    )
    return res.data
}