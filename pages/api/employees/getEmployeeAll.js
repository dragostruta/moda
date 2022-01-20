import { findEmployeeAll } from "../../../components/database/employees";

const getEmployeeAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findEmployeeAll();

      if (records.length !== 0) {
        res.json(records);
        res.status(200);
      } else {
        res.json({ message: "employee could not be found" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding employee");
      res.status(500);
      res.json({ message: "Error finding employee", err });
    }
  }
};

export default getEmployeeAll;
