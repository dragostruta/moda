import { base } from "../../lib/airtable";
import {
  findAll,
  findById,
  createByFields,
  updateByFields,
  deleteById,
} from "../../lib/airtable";

const table = base("norma_history");

export const findNormaHistoryById = async (id) => {
  return await findById(id, table);
};

export const findNormaHistoryAll = async () => {
  return await findAll(table);
};

export const createNormaHistoryByFields = async (params) => {
  return await createByFields(params, table);
};

export const updateNormaHistoryByFields = async (params) => {
  return await updateByFields(params, table);
};

export const deleteNormaHistoryById = async (id) => {
  return await deleteById(id, table);
};
