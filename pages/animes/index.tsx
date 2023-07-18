import { useQuery } from 'react-query';
import { getAllAnimes, getAnimeGenres } from '@/api/animesApi';
import AnimeList from '@/components/animes/AnimeList';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import GenresList from '@/components/animes/GenresList';

export default function Animes() {
    const [currentPage, setCurrentPage] = useState(1)

    const queryAllAnimes = useQuery({ queryKey: ["all_animes", currentPage], queryFn: () => getAllAnimes({ limit: 24, genre: "", page: currentPage }) });
    const queryAnimeGenres = useQuery({ queryKey: ["anime_genres"], queryFn: getAnimeGenres });

    return (
        <div className='flex'>
            <div className='w-3/4'>
                {!queryAllAnimes.isLoading && <AnimeList data={queryAllAnimes.data!.data} />}
                {!queryAllAnimes.isLoading && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagination={queryAllAnimes.data!.pagination} />}
            </div>
            <div className='w-1/4'>
                {!queryAnimeGenres.isLoading && <GenresList data={queryAnimeGenres.data!.data} />}
            </div>
        </div>
    )
}