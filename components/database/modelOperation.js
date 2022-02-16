import { base } from "../../lib/airtable";
import {
  findAll,
  findById,
  createByFields,
  updateByFields,
  deleteById,
} from "../../lib/airtable";

const table = base("model_operation");

export const findModelOperationById = async (id) => {
  return await findById(id, table);
};

export const findModelOperationAll = async () => {
  return await findAll(table);
};

export const createModelOperationByFields = async (params) => {
  return await createByFields(params, table);
};

export const updateModelOperationByFields = async (params) => {
  return await updateByFields(params, table);
};

export const deleteModelOperationById = async (id) => {
  return await deleteById(id, table);
};
