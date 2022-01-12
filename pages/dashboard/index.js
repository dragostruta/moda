import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import { StoreContext } from "../../store/store-context";
import SideBar from "../../components/nav/sidebar";
import DashboardContent from "../../components/content/dashboard";

const Dashboard = () => {
  const { dispatch, state } = useContext(StoreContext);

  useEffect(() => {
    toggleLoadingSpinner(false, dispatch);
  }, []);

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 lg:pt-20">
      <section>
        <NavBar />
      </section>
      <SideBar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
