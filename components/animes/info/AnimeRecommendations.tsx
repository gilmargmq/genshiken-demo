import useWindowSize from "@/hooks/useWindow";
import { AnimeRecommendationEntry } from "@/interfaces/animes"
import Image from "next/image";
import Link from "next/link";
import { FC, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion";

interface Props {
    data: AnimeRecommendationEntry[];
    genre: number
}

const AnimeRecommendations: FC<Props> = ({ data, genre }) => {
    const [curr, setCurr] = useState(0);
    const size = useWindowSize();
    const itemsPerSlide = size.width! >= 1024 ? 4 : size.width! >= 640 ? 3 : size.width! >= 440 ? 2 : 1;

    const dragSlider = useRef<HTMLDivElement>(null);
    const imagesSlider = useRef<HTMLDivElement>(null);
    const transform = useMotionValue(`translateX(0px) translateY(0px) translateZ(0px)`)

    const handleCurr = () => {
        if (imagesSlider.current && dragSlider.current) {
            const translateValues = imagesSlider.current.style.transform.match(/translateX\((-?[0-9]+(.[0-9]+)?(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/)
            translateValues ?
                setCurr(Math.round(parseFloat((translateValues[1])) / (dragSlider.current?.offsetWidth / itemsPerSlide) * -1))
                : setCurr(0)
        }
    }

    return (
        <div className="overflow-hidden flex flex-col space-y-3 py-10 px-3 -z-10">
            <span className="text-5xl font-bold">
                Recomendados
            </span>
            <div className="text-md text-gray-300 font-medium flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <span className="whitespace-nowrap">
                    ANIMES SIMILARES
                </span>
                <div className="bg-gray-300 w-full h-0.5 hidden sm:block"></div>
                <Link href={`/animes/genre/${genre}`}>
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
            <motion.div ref={dragSlider}>
                <motion.div
                    className="flex relative transition-transform ease-out duration-500 z-50"
                    ref={imagesSlider}
                    drag="x"
                    dragConstraints={dragSlider}
                    dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
                    onPanEnd={(e, { offset }) => {
                        if (imagesSlider.current && dragSlider.current) {
                            const translateValues = imagesSlider.current.style.transform.match(/translateX\((-?[0-9]+(.[0-9]+)?(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/)
                            translateValues ?
                                transform.set(`translateX(${parseFloat(translateValues[1]) + offset.x <= 0 ? parseFloat(translateValues[1]) + offset.x < -((dragSlider.current?.offsetWidth / itemsPerSlide) * (data.length - itemsPerSlide)) ? -((dragSlider.current?.offsetWidth / itemsPerSlide) * (data.length - itemsPerSlide)) : parseFloat((translateValues[1])) + offset.x : 0}px) translateY(0px) translateZ(0px)`)
                                : transform.set("")
                            handleCurr()
                        }
                    }}
                    style={{ width: `${data.length * (100 / itemsPerSlide)}%`, transform }}>
                    {
                        data.map((item) => (
                            <div key={item.entry.mal_id} className="h-[50vh] w-full relative overflow-hidden m-1 rounded-md cursor-pointer group">
                                <Link href={`/animes/${item.entry.mal_id}`} draggable={false}>
                                    <Image src={item.entry.images.jpg.image_url} alt={item.entry.title} layout="fill" objectFit="cover" />
                                    <div className="w-full h-full bg-gradient-to-t from-black relative cursor-pointer"></div>
                                    <div className="absolute p-6 flex flex-col inset-x-0 bottom-0">
                                        <span className='text-white text-3xl font-bold p-2'>
                                            {item.entry.title}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </motion.div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {data.slice(0, itemsPerSlide > 1 ? 1 - itemsPerSlide : undefined).map((_, index) => (
                        <div key={index}
                            className={`transition-all w-3 h-3 bg-gray-300 rounded-full cursor-pointer ${curr === index ? "p-2" : "bg-opacity-50"}`}
                            onClick={() => {
                                setCurr(index)
                                transform.set(`translateX(${index * (dragSlider.current!.offsetWidth / itemsPerSlide) * -1}px) translateY(0px) translateZ(0px)`)
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div >
    )
}

export default AnimeRecommendations