import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSpotifyStore } from "@/stores/spotifyStore";

export default function Pagination({ total }: any) {
    const setOffset = useSpotifyStore((state: any) => state.setOffset);
    const currentLimit = useSpotifyStore((state: any) => state.currentLimit);
    const currentOffset = useSpotifyStore((state: any) => state.currentOffset);
    const [activePage, setActivePage] = useState<number>(1);
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(total / currentLimit); i++) {
        paginationNumbers.push(i);
    }

    const prevPagination =
        activePage > 2
            ? [activePage - 3, activePage + 3]
            : activePage > 1
            ? [activePage - 2, activePage + 3]
            : [activePage - 1, activePage + 3];

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    onClick={() => {
                        if (currentOffset > 0) setOffset(currentOffset - currentLimit);
                        if (activePage !== 1) setActivePage(activePage - 1);
                    }}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    onClick={() => {
                        if (currentOffset < total) setOffset(currentOffset + currentLimit);
                        setActivePage(activePage + 1);
                    }}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">{currentLimit}</span> of{" "}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a
                            onClick={() => {
                                if (currentOffset > 0) setOffset(currentOffset - currentLimit);
                                if (activePage !== 1) setActivePage(activePage - 1);
                            }}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        {paginationNumbers.slice(prevPagination[0], prevPagination[1]).map((item, index) => (
                            <a
                                key={index}
                                onClick={() => {
                                    setOffset((item - 1) * currentLimit);
                                    setActivePage(item);
                                }}
                                aria-current="page"
                                className={`${
                                    activePage === item
                                        ? "relative px-4 py-2 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        : "relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex cursor-pointer"
                                }`}
                            >
                                {item}
                            </a>
                        ))}
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            ...
                        </span>
                        <a
                            onClick={() => {
                                if (currentOffset < total) setOffset(currentOffset + currentLimit);
                                setActivePage(activePage + 1);
                            }}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
}
