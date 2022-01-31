import { base } from "../../lib/airtable";
import {
  findAll,
  findById,
  createByFields,
  updateByFields,
  deleteById,
} from "../../lib/airtable";

const table = base("operations");

export const findOperationById = async (id) => {
  return await findById(id, table);
};

export const findOperationAll = async () => {
  return await findAll(table);
};

export const createOperationByFields = async (params) => {
  return await createByFields(params, table);
};

export const updateOperationByFields = async (params) => {
  return await updateByFields(params, table);
};

export const deleteOperationById = async (id) => {
  return await deleteById(id, table);
};
