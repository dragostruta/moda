import { base } from "../../lib/airtable";
import {
  findAll,
  findById,
  createByFields,
  updateByFields,
  deleteById,
} from "../../lib/airtable";

const table = base("model");

export const findModelById = async (id) => {
  return await findById(id, table);
};

export const findModelAll = async () => {
  return await findAll(table);
};

export const createModelByFields = async (params) => {
  return await createByFields(params, table);
};

export const updateModelByFields = async (params) => {
  return await updateByFields(params, table);
};

export const deleteModelById = async (id) => {
  return await deleteById(id, table);
};
