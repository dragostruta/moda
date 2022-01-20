import { base } from "../../lib/airtable";
import {
  findAll,
  findById,
  createByFields,
  updateByFields,
  deleteById,
} from "../../lib/airtable";

const table = base("employees");

export const findEmployeeById = async (id) => {
  return await findById(id, table);
};

export const findEmployeeAll = async () => {
  return await findAll(table);
};

export const createEmployeeByFields = async (params) => {
  return await createByFields(params, table);
};

export const updateEmployeeByFields = async (params) => {
  return await updateByFields(params, table);
};

export const deleteEmployeeById = async (id) => {
  return await deleteById(id, table);
};
