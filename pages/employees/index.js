import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import { StoreContext } from "../../store/store-context";
import SideBar from "../../components/nav/sidebar";

const Dashboard = () => {
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    toggleLoadingSpinner(false, dispatch);
  }, []);

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 pt-20">
      <section>
        <NavBar />
      </section>
      <SideBar />
      <div className="p-10 text-2xl font-bold flex-1 ">Employees</div>
    </div>
  );
};

export default Dashboard;
