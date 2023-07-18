import { useQuery } from 'react-query';
import { getAnimeById, getAnimeGenres } from '@/api/animesApi';
import GenresList from '@/components/animes/GenresList';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AnimeInfo from '@/components/animes/info/AnimeInfo';
import AnimeBanner from '@/components/animes/info/AnimeBanner';

const AnimesByGenre = ({ animeId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const queryAnimeById = useQuery({ queryKey: ["anime", animeId], queryFn: () => getAnimeById({ animeId }) })
    const queryAnimeGenres = useQuery({ queryKey: ["anime_genres"], queryFn: getAnimeGenres });

    return (
        <div className='flex flex-col'>
            <div>
                {!queryAnimeById.isLoading && <AnimeBanner data={queryAnimeById.data!.data} />}
            </div>
            <div className='flex'>
                <div className='w-3/4'>
                    {!queryAnimeById.isLoading && <AnimeInfo data={queryAnimeById.data!.data} />}
                </div>
                <div className='w-1/4'>
                    {!queryAnimeGenres.isLoading && <GenresList data={queryAnimeGenres.data!.data} />}
                </div>
            </div>
        </div>
    )
}

export default AnimesByGenre

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            animeId: context.params?.anime_id
        }
    }
}