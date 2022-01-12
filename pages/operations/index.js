import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import { StoreContext } from "../../store/store-context";
import SideBar from "../../components/nav/sidebar";
import Operations from "../../components/content/operations";

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
      <Operations />
    </div>
  );
};

export default Dashboard;
