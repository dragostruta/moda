const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findById = async (id, table) => {
  const findOperationRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findOperationRecords);
};

const findAll = async (table) => {
  const AllRecords = await table
    .select({
      filterByFormula: `id>=0`,
    })
    .firstPage();

  return getMinifiedRecords(AllRecords);
};

const createByFields = async (params, table) => {
  const createdRecords = await table.create([
    {
      fields: params,
    },
  ]);

  return getMinifiedRecords(createdRecords);
};

const updateByFields = async (params, table) => {
  const updatedRecords = await table.update([params]);
  return getMinifiedRecords(updatedRecords);
};

const deleteById = async (id, table) => {
  await table.destroy(id);
};

export {
  getMinifiedRecords,
  findById,
  createByFields,
  findAll,
  updateByFields,
  deleteById,
  base,
  getMinifiedRecord,
};
