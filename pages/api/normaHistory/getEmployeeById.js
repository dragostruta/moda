import { findEmployeeById } from "../../../components/database/employees";

const getEmployeeById = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const records = await findEmployeeById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          res.json({ message: "employee could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error finding employee");
      res.status(500);
      res.json({ message: "Error finding employee", err });
    }
  }
};

export default getOperationById;
