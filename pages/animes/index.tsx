import { useQuery } from 'react-query';
import { getAllAnimes, getAnimeGenres } from '@/api/animesApi';
import AnimeList from '@/components/animes/AnimeList';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import GenresList from '@/components/animes/GenresList';
import { useSearchParams } from 'next/navigation'

export default function Animes() {
    const [currentPage, setCurrentPage] = useState(1)

    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    const queryAllAnimes = useQuery({ queryKey: ["all_animes", currentPage, search], queryFn: () => getAllAnimes({ search: search ? search : "", limit: 24, genre: "", page: currentPage }) });
    const queryAnimeGenres = useQuery({ queryKey: ["anime_genres"], queryFn: getAnimeGenres });

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='w-full lg:w-3/4 px-4'>
                {!queryAllAnimes.isLoading && <AnimeList data={queryAllAnimes.data!.data} />}
                {!queryAllAnimes.isLoading && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagination={queryAllAnimes.data!.pagination} />}
            </div>
            <div className='w-full lg:w-1/4 px-4'>
                {!queryAnimeGenres.isLoading && <GenresList data={queryAnimeGenres.data!.data} />}
            </div>
        </div>
    )
}
