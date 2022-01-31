import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useEffect } from "react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Items = ({
  currentItems,
  handleSetToggleModalDelete,
  handleToBeDeletedId,
}) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item, key) => {
          return (
            <tr key={key}>
              <td className="p-2 whitespace-nowrap">
                <div className="font-medium text-center">{item.fields.id}</div>
              </td>
              <td className="p-5 whitespace-nowrap">
                <div className="font-medium text-center">
                  {item.fields.Name}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-center">{item.fields.time}</div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-center font-medium text-teal-400">
                  {item.fields.cost}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="font-medium text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => {
                      handleToBeDeletedId(item.fields.id);
                      handleSetToggleModalDelete(true);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          );
        })}
    </>
  );
};

const Operations = ({
  handleSetToggleModalAdd,
  handleSetToggleModalDelete,
  handleToBeDeletedId,
}) => {
  const { data, error } = useSWR("/api/operation/getOperationAll", fetcher);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    if (data) {
      data.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });

      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="p-10 text-2xl font-bold flex-1 ">
      <section className="antialiased px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100 flex">
              <h2 className="font-semibold text-gray-800">Operatiuni</h2>
              <div className="flex-1"></div>
              <button
                onClick={() => {
                  handleSetToggleModalAdd(true);
                }}
                className="font-semibold text-white bg-teal-400 rounded p-2 text-base hover:bg-teal-300"
              >
                Adauga
              </button>
            </header>

            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Nr.</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Nume</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Timp</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Tarif</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-xl divide-y divide-gray-100">
                    <Items
                      currentItems={currentItems}
                      handleSetToggleModalDelete={handleSetToggleModalDelete}
                      handleToBeDeletedId={handleToBeDeletedId}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReactPaginate
            nextLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            }
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item pt-1"
            previousLinkClassName="page-link"
            nextClassName="page-item pt-1"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active bg-teal-400 rounded-full px-3 py-0.5 border-1.5 shadow text-white"
            renderOnZeroPageCount={null}
            className="flex justify-evenly px-[30rem] py-6 text-md"
          />
        </div>
      </section>
    </div>
  );
};

export default Operations;
