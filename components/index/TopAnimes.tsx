import useWindowSize from "@/hooks/useWindow";
import { AnimeData } from "@/interfaces/animes";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

interface Props {
    data: AnimeData[]
}

const TopAnimes: FC<Props> = ({ data }) => {
    const [curr, setCurr] = useState(0);
    const autoSlideInterval = 4000
    const [autoSlide, setAutoSlide] = useState(true)

    const size = useWindowSize();
    const dragSlider = useRef<HTMLDivElement>(null);
    const imagesSlider = useRef<HTMLDivElement>(null);
    const transform = useMotionValue(`translateX(0px) translateY(0px) translateZ(0px)`)

    const [isDragging, setIsDragging] = useState(false);

    const itemsPerSlide = size.width! >= 1024 ? 3 : size.width! >= 440 ? 2 : 1;

    const next = () => {
        setCurr((curr) => (curr === (data.length - itemsPerSlide) ? 0 : curr + 1))
    }

   const handleCurr = () => {
        if (imagesSlider.current && dragSlider.current) {
            const translateValues = imagesSlider.current.style.transform.match(/translateX\((-?[0-9]+(.[0-9]+)?(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/)
            translateValues ?
                setCurr(Math.round(parseFloat((translateValues[1])) / (dragSlider.current?.offsetWidth / itemsPerSlide) * -1))
                : setCurr(0)
        }
    }
    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [itemsPerSlide, autoSlide])

    return (
        <div className="overflow-hidden flex flex-col space-y-3 py-10 px-3 -z-10">
            <span className="text-6xl font-bold">
                Populares
            </span>
            <div className="text-md text-gray-300 font-medium flex items-center space-x-4">
                <span className="whitespace-nowrap">
                    ANIMES DESTACADOS
                </span>
                <div className="bg-gray-300 w-full h-0.5"></div>
                <div className="right-0 left-0">
                    <div className="sm:flex items-center justify-center gap-2 hidden">
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
                </div>
            </div>
            <motion.div ref={dragSlider}>
                <motion.div
                    className="flex relative transition-transform ease-out duration-500 z-50"
                    ref={imagesSlider}
                    drag="x"
                    dragConstraints={dragSlider}
                    onDrag={() => {
                        setIsDragging(true)
                        handleCurr()
                    }}
                    onDragEnd={() => setIsDragging(false)}
                    onTransitionEnd={() => handleCurr()}
                    onMouseDown={() => setAutoSlide(false)}
                    onTouchStart={() => setAutoSlide(false)}
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
                            <motion.div
                                key={item.mal_id}
                                className="h-[50vh] w-full relative overflow-hidden m-3 rounded-md cursor-pointer group" >
                                <Link href={`/animes/${item.mal_id}`} className={`${isDragging && 'pointer-events-none'}`} draggable={false}>
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
                            </motion.div>
                        ))
                    }
                </motion.div>
            </motion.div>

            <div className="flex items-center justify-center gap-2 sm:hidden">
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

        </div >
    )
}

export default TopAnimes