import { findNormaHistoryAll } from "../../../components/database/normaHistory";

const getNormaHistoryAll = async (req, res) => {
  if (req.method === "GET") {
    try {
      const records = await findNormaHistoryAll();
      res.json(records);
      res.status(200);
    } catch (err) {
      console.error("Error finding norma history ");
      res.status(500);
      res.json({ message: "Error finding norma history ", err });
    }
  }
};

export default getNormaHistoryAll;
