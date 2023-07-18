import { Genre } from "@/interfaces/animes"
import Link from "next/link"
import { FC } from "react"

interface Props {
    data: Genre[]
}

const GenresList: FC<Props> = ({ data }) => {
    return (
        <div className="p-6">
            <div className="text-md text-gray-400 font-medium flex items-center space-x-4">
                <span>
                    GÉNEROS
                </span>
                <div className="bg-gray-400 w-full h-0.5"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-2">
                {data.map((genre) => (
                    <Link key={genre.mal_id} href={`/animes/genre/${genre.mal_id}`}>
                        <button className="w-full h-full border border-gray-500 rounded-md text-center p-2 hover:border-genshiken-red-500 hover:text-genshiken-red-500">
                            {genre.name}
                        </button>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default GenresList