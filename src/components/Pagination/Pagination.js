import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const PAGINATION_PER_PAGE = 5;

function Pagination({ currentPage, totalPages, getNextPage }) {

    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const startIndex = Math.max(0, currentPage - PAGINATION_PER_PAGE) + 1;
    const lastIndex = Math.min((startIndex + PAGINATION_PER_PAGE) + 2, +totalPages - 1);

    const currentPaginationGroup = allPages.slice(startIndex, lastIndex);

    return (
        <div className='flex flex-wrap justify-center mb-14'>
            <div className={`p-2 m-1 h-10 w-10 rounded-lg text-center`} onClick={() => { currentPage > 1 && getNextPage(+currentPage - 1) }}>
                <ChevronLeftIcon className={currentPage > 1 ? 'fill-gray-900 cursor-pointer hover:fill-orange-500' : 'fill-gray-500'} />
            </div>
            <div key={0}
                className={`p-2 m-1 h-10 w-10 rounded-lg font-medium text-center border-2 ${currentPage == 1 ? 'bg-orange-500 text-white drop-shadow-xl border-white' : 'bg-white hover:bg-orange-500 hover:text-white cursor-pointer drop-shadow-sm hover:drop-shadow-lg'}`}
                onClick={() => { currentPage != 1 && getNextPage(1) }}
            >
                {1}
            </div>
            {currentPage > PAGINATION_PER_PAGE && <div className={`p-2 m-1 h-10 w-10 rounded-lg text-center bg-white`}>...</div>}

            {currentPaginationGroup.map(page => {
                return (
                    <div key={page}
                        className={`p-2 m-1 h-10 w-10 rounded-lg font-medium text-center border-2 ${page == currentPage ? 'bg-orange-500 text-white drop-shadow-xl border-white' : 'bg-white hover:bg-orange-500 hover:text-white cursor-pointer drop-shadow-sm hover:drop-shadow-lg'}`}
                        onClick={() => { currentPage != page && getNextPage(page) }}
                    >
                        {page}
                    </div>
                )
            })}
            {lastIndex != totalPages - 1 && <div className={`p-2 m-1 h-10 w-10 rounded-lg text-center bg-white`}>...</div>}

            {totalPages > 1 &&
                <div key={totalPages}
                    className={`p-2 m-1 h-10 w-10 rounded-lg font-medium text-center border-2 ${currentPage == totalPages ? 'bg-orange-500 text-white drop-shadow-xl border-white' : 'bg-white hover:bg-orange-500 hover:text-white cursor-pointer drop-shadow-sm hover:drop-shadow-lg'}`}
                    onClick={() => { currentPage != totalPages && getNextPage(totalPages) }}
                >
                    {totalPages}
                </div>
            }

            <div className={`p-2 m-1 h-10 w-10 rounded-lg text-center`} onClick={() => { currentPage < totalPages && getNextPage(+currentPage + 1) }}>
                <ChevronRightIcon className={currentPage < totalPages ? 'fill-gray-900 cursor-pointer hover:fill-orange-500' : 'fill-gray-500'} />
            </div>
        </div>);
}

export default Pagination;
