import Image from 'next/image'
import { Inter } from 'next/font/google'
import TopAnimes from '@/components/index/TopAnimes'
import { useQuery } from 'react-query';
import { getLatestAnimes, getTopAnimes } from '@/api/animesApi';
import SeasonAnimes from '@/components/index/SeasonAnimes';

export default function Home() {
  const queryTopAnimes = useQuery({ queryKey: ["top_animes"], queryFn: () => getTopAnimes({ limit: 10 }) });
  const queryLatestAnimes = useQuery({ queryKey: ["latest_animes"], queryFn: getLatestAnimes });
  return (
    <>
      {!queryTopAnimes.isLoading && <TopAnimes data={queryTopAnimes.data!.data} />}
      {!queryLatestAnimes.isLoading && <SeasonAnimes data={queryLatestAnimes.data!.data} />}
    </>
  )
}
