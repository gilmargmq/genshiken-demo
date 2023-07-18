import { useQuery } from 'react-query';
import { getAllAnimes, getAnimeGenres } from '@/api/animesApi';
import AnimeList from '@/components/animes/AnimeList';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';
import GenresList from '@/components/animes/GenresList';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const AnimesByGenre = ({ genreId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [currentPage, setCurrentPage] = useState(1)

    const queryAllAnimes = useQuery({ queryKey: ["all_animes", genreId, currentPage], queryFn: () => getAllAnimes({ search: "", limit: 24, genre: genreId, page: currentPage }) });
    const queryAnimeGenres = useQuery({ queryKey: ["anime_genres"], queryFn: getAnimeGenres });

    useEffect(() => {
        setCurrentPage(1)
    }, [genreId])

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

export default AnimesByGenre

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            genreId: context.params?.genre
        }
    }
}