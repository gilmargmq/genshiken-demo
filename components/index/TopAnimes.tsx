import { AnimeData } from "@/interfaces/animes";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface Props {
    data: AnimeData[]
}

const TopAnimes: FC<Props> = ({ data }) => {

    const [curr, setCurr] = useState(0);
    const autoSlideInterval = 4000
    const itemsPerSlide = 3

    const next = () =>
        setCurr((curr) => (curr === (data.length - itemsPerSlide) ? 0 : curr + 1))

    useEffect(() => {
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

    return (
        <div className="overflow-hidden flex flex-col space-y-3 py-10 -z-10">
            <span className="text-6xl font-bold">
                Populares
            </span>
            <div className="text-md text-gray-300 font-medium flex items-center space-x-4">
                <span className="whitespace-nowrap">
                    ANIMES DESTACADOS
                </span>
                <div className="bg-gray-300 w-full h-0.5"></div>
                <div className="right-0 left-0">
                    <div className="flex items-center justify-center gap-2">
                        {data.slice(0, -itemsPerSlide + 1).map((_, index) => (
                            <div key={index}
                                className={`transition-all w-3 h-3 bg-gray-300 rounded-full cursor-pointer ${curr === index ? "p-2" : "bg-opacity-50"}`}
                                onClick={() => {
                                    setCurr(index)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex relative transition-transform ease-out duration-500 z-50"
                style={{ width: `${data.length * (100 / itemsPerSlide)}%`, transform: `translateX(-${curr * (100 / data.length)}%)` }}>
                {
                    data.map((item) => (
                        <div key={item.mal_id} className="h-[50vh] w-full relative overflow-hidden m-3 rounded-md cursor-pointer group">
                            <Link href={`/animes/${item.mal_id}`}>
                                <Image src={item.images.jpg.image_url} alt={item.title} layout="fill" objectFit="cover" />
                                <div className="w-full h-full bg-gradient-to-t from-black relative cursor-pointer"></div>
                                <div className="absolute p-6 flex flex-col inset-x-0 bottom-0">
                                    <span className="px-4 bg-white text-genshiken-red-600 font-medium rounded-md w-fit group-hover:bg-genshiken-red-400 group-hover:text-white">
                                        {item.genres[0].name}
                                    </span>
                                    <span className='text-white text-3xl font-bold p-2'>
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

export default TopAnimes