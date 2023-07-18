import { AnimeData } from "@/interfaces/animes"
import { FC } from "react"

interface Props {
    data: AnimeData
}

const AnimeInfo: FC<Props> = ({ data }) => {
    return (
        <div className="text-justify p-10 text-lg font">
           {data.synopsis} 
        </div>
    )
}

export default AnimeInfo