import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import SideBar from "../../components/nav/sidebar";
import ChartsContent from "../../components/content/charts";
import AddOperationsModal from "../../components/modals/addOperationsModal";
import GetEmployeesAll from "../../components/fetcher/getEmployeesAll";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";
import Preview from "../../components/content/preview";

const Dashboard = () => {
  // Context State initialization
  const { dispatch, state } = useContext(StoreContext);
  //Component State Bool Operation Modal Lever
  const [toggleOperationsModal, setToggleOperationsModal] = useState(false);
  //Employee list data fetched from the database
  const { employeesData, isLoading, isError } = GetEmployeesAll();
  //Component State Current Selected Employee
  const [currentEmployee, setCurrentEmployee] = useState("");

  const [preview, setPreview] = useState(false);

  const [currentModel, setCurrentModel] = useState("");

  // Component State The id of the current empolyee selected.
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");

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

  const handleSelectCurrentModel = (value) => {
    setCurrentModel(value);
  };

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

  const handleCurrentEmployeeId = (value) => {
    setCurrentEmployeeId(value);
  };

  // Saves the current Employee in the Context State and resets the current employee id
  const handleAddEmployeeToFinalObject = (employeeObject) => {
    if (
      state.finalObject.find(
        (item) =>
          item.id === employeeObject.id && item.fields.model === currentModel
      )
    ) {
      let stateClone = _.cloneDeep(state);
      let employeeList = [];
      let trueIndex = null;
      stateClone.finalObject.map((item, index) => {
        if (
          item.id === employeeObject.id &&
          item.fields.model === currentModel
        ) {
          trueIndex = index;
        }
        if (employeeList.indexOf(item.fields.id)) {
          employeeList.push(item.fields.id);
        }
      });

      dispatch({
        type: ACTION_TYPES.SET_FINAL_EMPLOYEE_LIST,
        payload: { finalEmployeeList: employeeList },
      });

      stateClone.finalObject[trueIndex] = employeeObject;
      stateClone.finalObject[trueIndex].fields["model"] = currentModel;

      dispatch({
        type: ACTION_TYPES.SET_FINAL_OBJECT,
        payload: { finalObject: stateClone.finalObject },
      });
    } else {
      if (employeeObject) {
        employeeObject.fields["model"] = currentModel;
        dispatch({
          type: ACTION_TYPES.SET_FINAL_OBJECT,
          payload: { finalObject: state.finalObject.concat(employeeObject) },
        });

        if (state.finalEmployeeList.indexOf(employeeObject.fields.id) === -1) {
          dispatch({
            type: ACTION_TYPES.SET_FINAL_EMPLOYEE_LIST,
            payload: {
              finalEmployeeList: state.finalEmployeeList.concat(
                employeeObject.fields.id
              ),
            },
          });
        }
      }
      handleSelectCurrentEmployee("");
      handleCurrentEmployeeId("");
    }
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
          handleAddEmployeeToFinalObject={handleAddEmployeeToFinalObject}
          currentEmployeeId={currentEmployeeId}
          handleCurrentEmployeeId={handleCurrentEmployeeId}
          handleSelectCurrentModel={handleSelectCurrentModel}
          currentModel={currentModel}
        />
      )}
      {/* We check if the Bool Operation Modal is true, if so we display the modal.
      Otherwise we do not display anything */}
      {toggleOperationsModal ? (
        <AddOperationsModal
          handleToggleAddOperationsModal={handleToggleAddOperationsModal}
          currentEmployee={currentEmployee}
          handleSelectCurrentEmployee={handleSelectCurrentEmployee}
          handleAddEmployeeToFinalObject={handleAddEmployeeToFinalObject}
          handleCurrentEmployeeId={handleCurrentEmployeeId}
          currentModel={currentModel}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
