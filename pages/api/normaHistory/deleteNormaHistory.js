import {
  findEmployeeById,
  deleteEmployeeById,
} from "../../../components/database/employees";

const deleteEmployee = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      if (id) {
        const recordsFound = await findEmployeeById(id);
        if (recordsFound.length !== 0) {
          await deleteEmployeeById(recordsFound[0].id);
          res.json({ message: "Success" });
          res.status(200);
        } else {
          res.json({ message: "Employee could not be found" });
          res.status(400);
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error deleting or finding employee");
      res.status(500);
      res.json({ message: "Error deleting or finding employee", err });
    }
  }
};

export default deleteEmployee;
