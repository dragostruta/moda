import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import SideBar from "../../components/nav/sidebar";
import ChartsContent from "../../components/content/charts";
import AddOperationsModal from "../../components/modals/addOperationsModal";
import getEmployeesAll from "../../components/fetcher/getEmployeesAll";
import { StoreContext } from "../../store/store-context";

const Dashboard = () => {
  const { dispatch, state } = useContext(StoreContext);
  const [toggleOperationsModal, setToggleOperationsModal] = useState(false);
  const { employeesData, isLoading, isError } = getEmployeesAll();
  const [employeesList, setEmployeesList] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState("");

  useEffect(() => {
    if (employeesData) {
      employeesData.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });
      setEmployeesList(employeesData);
    }
  }, [employeesData]);

  useEffect(() => {
    toggleLoadingSpinner(false, dispatch);
  }, []);

  const handleSelectCurrentEmployee = (value) => {
    if (value) {
      setCurrentEmployee(value);
    }
  };

  const handleToggleAddOperationsModal = (value) => {
    setToggleOperationsModal(value);
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 pt-20">
      <section>
        <NavBar />
      </section>
      <SideBar />
      <ChartsContent
        handleToggleAddOperationsModal={handleToggleAddOperationsModal}
        employeesList={employeesList}
        handleSelectCurrentEmployee={handleSelectCurrentEmployee}
        currentEmployee={currentEmployee}
      />
      {toggleOperationsModal ? (
        <AddOperationsModal
          handleToggleAddOperationsModal={handleToggleAddOperationsModal}
          currentEmployee={currentEmployee}
          handleSelectCurrentEmployee={handleSelectCurrentEmployee}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
