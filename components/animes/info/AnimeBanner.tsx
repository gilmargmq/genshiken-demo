import { AnimeData } from "@/interfaces/animes"
import Image from "next/image"
import { FC } from "react"

interface Props {
    data: AnimeData
}

const AnimeBanner: FC<Props> = ({ data }) => {
    return (
        <div>
            <div className="w-full h-[40vh] overflow-hidden relative">
                <Image src={data.images.jpg.large_image_url} alt={data.title} layout="fill" objectFit="cover" />
                <div className="w-full h-full bg-gradient-to-r from-black relative"></div>

                <div className="absolute p-8 flex left-0 bottom-0 w-3/5 space-x-4">
                    <div className="h-auto w-1 bg-genshiken-red-600 "></div>
                    <div className="flex flex-col">
                        <span className="px-4 bg-white text-genshiken-red-600 font-medium rounded-md w-fit">
                            {data.genres[0]?.name}
                        </span>
                        <span className='text-white text-5xl font-bold p-2'>
                            {data.title}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimeBanner