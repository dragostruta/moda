import { useContext, useEffect } from "react";
import { toggleLoadingSpinner } from "../../lib/utils";
import { StoreContext } from "../../store/store-context";

const Dashboard = () => {
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    toggleLoadingSpinner(false, dispatch);
  }, []);

  return (
    <div className="p-2 bg-teal-400 cursor-pointer mx-3 my-2">Dashboard</div>
  );
};

export default Dashboard;
