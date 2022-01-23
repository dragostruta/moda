import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getOperationAll = () => {
  const { data, error } = useSWR("/api/operation/getOperationAll", fetcher);

  return {
    operationsData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default getOperationAll;
