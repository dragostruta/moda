import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const GetModelOperationAll = () => {
  const { data, error } = useSWR(
    "/api/modelOperation/getModelOperationAll",
    fetcher
  );

  return {
    modelsOperationsData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default GetModelOperationAll;
