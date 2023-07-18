import { AnimeData } from "@/interfaces/animes";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
    data: AnimeData[]
}

const SeasonAnimes: FC<Props> = ({ data }) => {

    return (
        <div className="flex flex-col space-y-3 py-10">
            <span className="text-6xl font-bold">
                Temporada
            </span>
            <div className="text-md text-gray-300 font-medium flex items-center space-x-4">
                <span className="whitespace-nowrap">
                    LOS ÚLTIMOS ANIMES DE TEMPORADA
                </span>
                <div className="bg-gray-300 w-full h-0.5"></div>
                <Link href='/animes'>
                    <div className="flex items-center space-x-1 group cursor-pointer hover:bg-genshiken-yellow-600 rounded-md p-1">
                        <div className="p-1 flex items-center justify-center h-fit w-fit rounded-md bg-genshiken-red-600 text-white group-hover:bg-transparent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 32 32"
                            >
                                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                                    <g fill="currentColor" transform="translate(-362 -1037)">
                                        <path d="M390 1049h-8v-8a4 4 0 10-8 0v8h-8a4 4 0 100 8h8v8a4 4 0 108 0v-8h8a4 4 0 100-8"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <span className="whitespace-nowrap text-genshiken-red-600 group-hover:text-white">
                            Más animes
                        </span>
                    </div>
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {
                    data.map((item) => (
                        <div key={item.mal_id} className="h-[30vh] w-full relative overflow-hidden rounded-md cursor-pointer group">
                            <Link href={`/animes/${item.mal_id}`}>
                                <Image src={item.images.jpg.image_url} alt={item.title} layout="fill" objectFit="cover" />
                                <div className="w-full h-full bg-gradient-to-t from-black relative cursor-pointer"></div>
                                <div className="absolute p-2 flex flex-col inset-x-0 bottom-0">
                                    <span className="px-4 bg-white text-genshiken-red-600 font-medium rounded-md w-fit group-hover:bg-genshiken-red-400 group-hover:text-white">
                                        {item.genres[0].name}
                                    </span>
                                    <span className='text-white text-2xl font-semibold p-2'>
                                        {item.title}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SeasonAnimes