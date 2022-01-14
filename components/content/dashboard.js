import { Chart } from "react-google-charts";

const DashboardContent = () => {
  const data = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];

  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <div className="p-10 text-2xl font-bold flex-1 ">
      <main>
        <div className="pt-6 px-4">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
              <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardContent;
