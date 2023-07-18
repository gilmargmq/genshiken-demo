export interface Animes {
    data: AnimeData[];
    pagination: Pagination
}

export interface AnimeById {
    data: AnimeData
}

export interface Genres {
    data: Genre[]
}

export interface AnimeData {
    mal_id: number;
    url: string;
    images: Image;
    trailer: Trailer;
    approved: boolean,
    title: string;
    title_english: string;
    title_japanese: string;
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    genres: Genre[]
}

interface Image {
    jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string
    };
    webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string
    }
}

interface Trailer {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
        image_url: string;
        small_image_url: string;
        medium_image_url: string;
        large_image_url: string;
        maximum_image_url: string
    }
}

export interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string
}

export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number
    }
}