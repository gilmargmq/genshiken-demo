import { AnimeData } from "@/interfaces/animes";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
    data: AnimeData[]
}

const AnimeList: FC<Props> = ({ data }) => {
    return (
        <div className="overflow-hidden flex flex-col space-y-3 py-4">
            <span className="text-5xl font-bold">
                Animes
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    data.map((item) => (
                        <div key={item.mal_id} className="h-[30vh] w-full relative overflow-hidden rounded-md cursor-pointer group">
                            <Link href={`/animes/${item.mal_id}`}>
                                <Image src={item.images.jpg.image_url} alt={item.title} layout="fill" objectFit="cover" />
                                <div className="w-full h-full bg-gradient-to-t from-black relative cursor-pointer"></div>
                                <div className="absolute p-2 flex flex-col inset-x-0 bottom-0">
                                    <span className="px-4 bg-white text-genshiken-red-600 font-medium rounded-md w-fit group-hover:bg-genshiken-red-400 group-hover:text-white">
                                        {item.genres[0]?.name}
                                    </span>
                                    <span className='text-white text-xl font-semibold p-2'>
                                        {item.title}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default AnimeList