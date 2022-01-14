import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ChartsContent = () => {
  const { data, error } = useSWR("/api/operation/getOperationAll", fetcher);

  useEffect(() => {
    if (data) {
      data.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });
    }
  }, [data]);
  return (
    <div className="p-10 text-2xl font-bold flex-1 ">
      <section className="antialiased bg-gray- px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Norma</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap ">
                        <div className="font-semibold text-center">Angajat</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Operatiune
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Timp</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Tarf</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Manopera
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr>
                      <td className="p-5 whitespace-nowrap w-24">
                        <div className="font-medium text-center">
                          <div className="font-medium text-center">
                            <div className="flex justify-center">
                              <div className="mb-3 xl:w-96">
                                <select
                                  className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  aria-label="Default select example"
                                >
                                  <option defaultValue>
                                    Open this select menu
                                  </option>
                                  <option defaultValue="1">One</option>
                                  <option defaultValue="2">Two</option>
                                  <option defaultValue="3">Three</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap w-24">
                        <div className="font-medium text-center">
                          <div className="flex justify-center">
                            <div className="mb-3 xl:w-96">
                              <select
                                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example"
                              >
                                <option defaultValue>
                                  Open this select menu
                                </option>
                                {data &&
                                  data.map((item, key) => {
                                    return (
                                      <option key={key} defaultValue="1">
                                        {" "}
                                        {item.fields.Name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">03:00</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center font-medium text-teal-400">
                          2,890.66
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">2,890.66</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-5 whitespace-nowrap w-24">
                        <div className="font-medium text-center">
                          <div className="font-medium text-center">
                            <div className="flex justify-center">
                              <div className="mb-3 xl:w-96">
                                <select
                                  className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  aria-label="Default select example"
                                >
                                  <option defaultValue>
                                    Open this select menu
                                  </option>
                                  <option defaultValue="1">One</option>
                                  <option defaultValue="2">Two</option>
                                  <option defaultValue="3">Three</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap w-24">
                        <div className="font-medium text-center">
                          <div className="flex justify-center">
                            <div className="mb-3 xl:w-96">
                              <select
                                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example"
                              >
                                <option defaultValue>
                                  Open this select menu
                                </option>
                                {data &&
                                  data.map((item, key) => {
                                    return (
                                      <option key={key} defaultValue="1">
                                        {" "}
                                        {item.fields.Name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">03:00</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center font-medium text-teal-400">
                          2,890.66
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">2,890.66</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 ">
                <div className="font-medium text-center">
                  Total: 5781.32 Lei
                </div>
              </h2>
            </footer>
          </div>
        </div>
      </section>
      <div className="flex float-right font-semibold text-sm bg-teal-400 text-white rounded-md mt-4 p-3 cursor-pointer mr-5">
        Next
      </div>
    </div>
  );
};

export default ChartsContent;
