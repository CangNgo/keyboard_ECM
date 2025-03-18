import { useState, useEffect } from "react";
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import SelectBox from "./SelectBox";
import Spinner from "./Spinner";

interface TableProps<T> {
    data: T[]; // Data to display
    headers: string[]; // Table headers
    renderRow: (item: T) => React.ReactNode[]; // Function to render each row
    advanced?: boolean; // Show search bar, select box, and row count
    optionsValue?: Array<{ value: string | number | boolean | undefined, label: string | number, disable?: boolean, valueClassName?: string }>; // Options for select box
    selectBoxName?: string; // Name for select box
    maxRow?: number; // Max rows per page (default is 10)
    disableSelectBox?: boolean; // Disable select box
    advancedRowFilter?: boolean; // Enable advanced row filtering
    loading?: boolean; // Add a loading state
    nonDataMessage?: string;
    isNumberPagination?: boolean;
    numberPaginationLength?: number;
}

const Table = <T extends object>({
    data,
    headers,
    renderRow,
    advanced = false,
    optionsValue = [],
    selectBoxName = '',
    maxRow,
    disableSelectBox = false,
    advancedRowFilter = false,
    nonDataMessage = 'Không có dữ liệu',
    loading = false,
    isNumberPagination = false,
    numberPaginationLength = 5
}: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(maxRow ?? 10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(
            data.filter((item) =>
                (selectedFilter === '' || Object.values(item).some((val) => val?.toString().includes(selectedFilter))) &&
                Object.values(item).some((val) => val?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            )
        );
        setCurrentPage(0);
    }, [data, searchTerm, selectedFilter]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const renderNumberPagination = () => {
        const pageCount = Math.min(totalPages, numberPaginationLength ?? 5); // Sử dụng props hoặc mặc định là 5
        const startPage = Math.floor(currentPage / numberPaginationLength!) * numberPaginationLength!; // Tính toán trang bắt đầu để hiển thị
        const pages = Array.from({ length: pageCount }, (_, index) => startPage + index + 1).filter(page => page <= totalPages);

        return (
            <>
                {pages.length !== 0 &&
                    <div className="flex items-center">
                        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                            <FaAngleLeft className={`w-4 h-4 mt-[0.1rem] ${currentPage === 0 ? "fill-[#808EA1] dark:fill-[#A0A0B1] cursor-not-allowed" : "fill-[#000000] dark:fill-[#E0E0E0]"}`} />
                        </button>
                        <div className="flex mx-2">
                            {pages.map((page, index) => (
                                <button
                                    key={index}
                                    className={`px-2 ${page === currentPage + 1 ? 'font-bold text-black dark:text-white' : 'text-[#808EA1]'} transition`}
                                    onClick={() => handlePageClick(page - 1)} // Chuyển đổi 1 cho index
                                >
                                    {page}
                                </button>
                            ))}
                            {((pages.length < totalPages) && currentPage < totalPages - 1) && <span className="text-[#808EA1]">...</span>}
                        </div>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                            <FaAngleRight className={`w-4 h-4 mt-[0.1rem] ${currentPage === totalPages - 1 ? "fill-[#808EA1] dark:fill-[#A0A0B1] cursor-not-allowed" : "fill-[#000000] dark:fill-[#E0E0E0]"}`} />
                        </button>
                    </div>
                }
            </>
        );
    };

    const renderDefaultNumberPagination = () => {
        return (
            <>
                {totalPages !== 0 &&
                    <div className="flex items-center">
                        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                            <FaAngleLeft className={`w-4 h-4 mt-[0.1rem] ${currentPage === 0 ? "fill-[#808EA1] dark:fill-[#A0A0B1] cursor-not-allowed" : "fill-[#000000] dark:fill-[#E0E0E0]"}`} />
                        </button>
                        <p className="font-bold mx-3 text-md text-[#808EA1] dark:text-[#A0A0B1]">{currentPage + 1}/{totalPages}</p>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                            <FaAngleRight className={`w-4 h-4 mt-[0.1rem] ${currentPage === totalPages - 1 ? "fill-[#808EA1] dark:fill-[#A0A0B1] cursor-not-allowed" : "fill-[#000000] dark:fill-[#E0E0E0]"}`} />
                        </button>
                    </div>

                }
            </>
        )
    }



    const currentData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return (
        <div className="relative overflow-x-auto sm:rounded-lg bg-white dark:bg-darkSecondary">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner /> {/* Render Spinner while loading */}
                </div>
            ) : (
                <>
                    {advanced && (
                        <div className="flex md:flex-row flex-col md:justify-between justify-start mb-3">
                            <div className="flex-none text-sm text-[#808EA1] dark:text-white md:self-center ms-2">
                                Số lượng: {filteredData.length}
                            </div>
                            {/* Search Bar */}
                            <div className="relative mr-3 md:w-5/12 md:my-0 my-2 w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <FaSearch className="w-4 h-4 fill-[#808EA1] dark:fill-[#A0A0B1]" />
                                </div>
                                <input
                                    id="search"
                                    className="border border-gray-300 shadow-md text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none hover:border-[#434343] focus:border-[#434343] dark:bg-[#2d2d2d] dark:text-white dark:border-gray-900 transition duration-300"
                                    name="search"
                                    aria-label="Search Bar"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* Select Box */}
                            {!disableSelectBox && (
                                <SelectBox
                                    options={optionsValue}
                                    name={selectBoxName}
                                    disableDefaultOption={true}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                />
                            )}
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        {/* Desktop view */}
                        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300 hidden md:table">
                            <thead className="text-xs text-[#808EA1] dark:text-[#A0A0B1] bg-[#F8F8F8] dark:bg-darkSecondary">
                                <tr>
                                    <th scope="col" className="px-6 py-4">STT</th>
                                    {headers.map((header, index) => (
                                        <th key={index} scope="col" className="px-6 py-4">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index} className="bg-white dark:bg-darkSecondary border-t hover:text-black hover:bg-gray-100 dark:hover:bg-[#3C3C4F] text-[#808EA1] dark:text-[#A0A0B1] text-xs">
                                        <th className="px-6 py-4">{index + 1 + currentPage * rowsPerPage}</th>
                                        {renderRow(item)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile view */}
                        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300 md:hidden">
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index} className="bg-white dark:bg-darkSecondary border-2 rounded-lg mb-4 text-xs border-slate-300 dark:border-gray-300">
                                        <td className="px-6 py-2 flex justify-between">
                                            <span className="font-semibold">STT</span>
                                            <span className="px-6">{index + 1 + currentPage * rowsPerPage}</span>
                                        </td>
                                        {headers.map((header, headerIndex) => (
                                            <td key={headerIndex} className="px-6 py-2 flex justify-between border-t dark:border-gray-600">
                                                <span className="font-semibold self-center">{header}</span>
                                                <span className="self-center">{renderRow(item)[headerIndex]}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {currentData.length === 0 && <div className="border flex justify-center items-center w-full py-20 text-2xl dark:text-white">{nonDataMessage}</div>}
                    <section className={`flex items-center my-3 px-4 md:flex-row flex-col gap-2`}>
                        <div className="flex-grow flex justify-center items-center">
                            {isNumberPagination ? renderNumberPagination() : renderDefaultNumberPagination()}
                        </div>
                        {advancedRowFilter &&
                            <div className="flex items-center gap-3">
                                <span className="dark:text-white">Xem</span>
                                <SelectBox
                                    name="rowFilter"
                                    onChange={(event) => {
                                        setRowsPerPage(parseInt(event.target.value));
                                        setCurrentPage(0)
                                    }}
                                    options={rowFilterOptions}
                                    disableDefaultOption
                                />
                                <span className="dark:text-white">Mục</span>
                            </div>
                        }
                    </section>
                </>
            )}
        </div>

    );
};

const rowFilterOptions =
    [
        { label: '10', value: 10 },
        { label: '25', value: 25 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
        { label: '250', value: 250 },
        { label: '500', value: 500 }
    ]

export default Table;