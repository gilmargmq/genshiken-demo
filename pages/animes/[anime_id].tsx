import { useQuery } from 'react-query';
import { getAnimeById, getAnimeGenres, getAnimeRecommendations } from '@/api/animesApi';
import GenresList from '@/components/animes/GenresList';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AnimeInfo from '@/components/animes/info/AnimeInfo';
import AnimeBanner from '@/components/animes/info/AnimeBanner';
import AnimeRecommendations from '@/components/animes/info/AnimeRecommendations';

const AnimesByGenre = ({ animeId }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const queryAnimeById = useQuery({ queryKey: ["anime", animeId], queryFn: () => getAnimeById({ animeId }) })
    const queryAnimeGenres = useQuery({ queryKey: ["anime_genres"], queryFn: getAnimeGenres });
    const queryAnimeRecommendations = useQuery({ queryKey: ["anime_recommendations", animeId], queryFn: () => getAnimeRecommendations({ animeId }) })

    return (
        <div className='flex flex-col'>
            <div>
                {!queryAnimeById.isLoading && <AnimeBanner data={queryAnimeById.data!.data} />}
            </div>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:w-3/4'>
                    {!queryAnimeById.isLoading && <AnimeInfo data={queryAnimeById.data!.data} />}
                </div>
                <div className='lg:w-1/4 px-6 lg:px-1.5'>
                    {!queryAnimeGenres.isLoading && <GenresList data={queryAnimeGenres.data!.data} />}
                </div>
            </div>
            <div className='px-6 lg:px-4'>
                {!queryAnimeRecommendations.isLoading && !queryAnimeById.isLoading && <AnimeRecommendations data={queryAnimeRecommendations.data!.data} genre={queryAnimeById.data!.data.genres[0].mal_id} />}
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