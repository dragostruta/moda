import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import SideBar from "../../components/nav/sidebar";
import ChartsContent from "../../components/content/charts";
import AddOperationsModal from "../../components/modals/addOperationsModal";
import getEmployeesAll from "../../components/fetcher/getEmployeesAll";
import { StoreContext } from "../../store/store-context";
import Preview from "../../components/content/preview";

const Dashboard = () => {
  // Context State initialization
  const { dispatch, state } = useContext(StoreContext);
  //Component State Bool Operation Modal Lever
  const [toggleOperationsModal, setToggleOperationsModal] = useState(false);
  //Employee list data fetched from the database
  const { employeesData, isLoading, isError } = getEmployeesAll();
  //Component State Current Selected Employee
  const [currentEmployee, setCurrentEmployee] = useState("");

  const [preview, setPreview] = useState(false);

  // At every change of the employeesData value we sort it.
  useEffect(() => {
    if (employeesData) {
      employeesData.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });
    }
  }, [employeesData]);

  // At the first render of the component we stop the loading spinner
  useEffect(() => {
    toggleLoadingSpinner(false, dispatch);
  }, []);

  // Handles the set in the state of the Current Employee
  const handleSelectCurrentEmployee = (value) => {
    setCurrentEmployee(value);
  };

  // Handles the Bool Operation Modal
  const handleToggleAddOperationsModal = (value) => {
    setToggleOperationsModal(value);
  };

  const handlePreview = (value) => {
    setPreview(value);
  };

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 pt-20">
      <section>
        <NavBar />
      </section>
      <SideBar />
      {preview ? (
        <Preview handlePreview={handlePreview} />
      ) : (
        <ChartsContent
          handleToggleAddOperationsModal={handleToggleAddOperationsModal}
          employeesList={employeesData}
          handleSelectCurrentEmployee={handleSelectCurrentEmployee}
          currentEmployee={currentEmployee}
          handlePreview={handlePreview}
        />
      )}
      {/* We check if the Bool Operation Modal is true, if so we display the modal.
      Otherwise we do not display anything */}
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
