const DashboardContent = () => {
  return (
    <div className="p-10 text-2xl font-bold flex-1 ">
      <div className="grid lg:grid-cols-3 lg:gap-10 gap-4 grid-row-7">
        <div className="flex justify-evenly col-span-2 bg-white rounded-lg shadow border py-10 row-span-3">
          Prezentare
        </div>
        <div className="flex justify-evenly  bg-white rounded-lg shadow border py-10">
          Info
        </div>
        <div className="flex justify-evenly col-span-2 bg-white rounded-lg shadow border py-10 row-span-2">
          Charts
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
