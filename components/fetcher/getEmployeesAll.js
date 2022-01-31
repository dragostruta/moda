import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const GetEmployeesAll = () => {
  const { data, error } = useSWR("/api/employees/getEmployeeAll", fetcher);

  return {
    employeesData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default GetEmployeesAll;
