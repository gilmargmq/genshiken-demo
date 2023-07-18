import { Pagination } from "@/interfaces/animes"
import { FC } from "react"

interface Props {
    currentPage: number,
    setCurrentPage: Function,
    pagination: Pagination
}


const Pagination: FC<Props> = ({ currentPage, setCurrentPage, pagination }) => {
    return (
        <div className="items-center justify-center flex space-x-5 text-md font-semibold text-genshiken-red-600 p-4">
            {currentPage > 1 &&
                <div className="flex space-x-5">
                    <button className=""
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        {'<'}
                    </button>
                    {currentPage > 3 &&
                        <CustomButton pageNumber={1} setCurrentPage={setCurrentPage} />
                    }
                    {
                        currentPage > 4 &&
                        <span>
                            ...
                        </span>
                    }
                    {currentPage > 2 &&
                        <CustomButton pageNumber={currentPage - 2} setCurrentPage={setCurrentPage} />}

                    <CustomButton pageNumber={currentPage - 1} setCurrentPage={setCurrentPage} />
                </div>}

            <button className={`hover:bg-genshiken-yellow-600 bg-genshiken-red-600 text-white p-1 min-w-[28px] rounded-md`}>
                {currentPage}
            </button>

            {currentPage < pagination.last_visible_page &&
                <div className="flex space-x-5">
                    <CustomButton pageNumber={currentPage + 1} setCurrentPage={setCurrentPage} />
                    {currentPage < pagination.last_visible_page - 1 &&
                        <CustomButton pageNumber={currentPage + 2} setCurrentPage={setCurrentPage} />}
                    {
                        currentPage < pagination.last_visible_page - 3 &&
                        <span>
                            ...
                        </span>
                    }
                    {currentPage < pagination.last_visible_page - 2 &&
                        <CustomButton pageNumber={pagination.last_visible_page} setCurrentPage={setCurrentPage} />}
                    <button className=""
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        {'>'}
                    </button>
                </div>}

        </div>
    )
}

const CustomButton = ({ pageNumber, setCurrentPage }: { pageNumber: number, setCurrentPage: Function }) => {

    return (
        <button className={`hover:text-genshiken-yellow-600`}
            onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
        </button>
    )
}

export default Pagination