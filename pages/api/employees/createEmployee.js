import {
  findEmployeeById,
  createEmployeeByFields,
} from "../../../components/database/employees";

const createEmployee = async (req, res) => {
  if (req.method === "POST") {
    const { id, FirstName, LastName } = req.body;

    try {
      if (id) {
        const records = await findEmployeeById(id);

        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          if (FirstName) {
            const records = await createEmployeeByFields({
              id,
              FirstName,
              LastName,
            });
            res.json(records);
          } else {
            res.json({ message: "FirstName is missing" });
            res.status(400);
          }
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error creating or finding employee");
      res.status(500);
      res.json({ message: "Error creating or finding employee", err });
    }
  }
};

export default createEmployee;
