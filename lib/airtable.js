const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("operations");

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findOperationById = async (id) => {
  const findOperationRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findOperationRecords);
};

const findOperationAll = async () => {
  const AllRecords = await table
    .select({
      filterByFormula: `id>=0`,
    })
    .firstPage();

  return getMinifiedRecords(AllRecords);
};

const createOperationByFields = async (params) => {
  const createdRecords = await table.create([
    {
      fields: params,
    },
  ]);

  return getMinifiedRecords(createdRecords);
};

const updateOperationByFields = async (params) => {
  const updatedRecords = await table.update([params]);
  return getMinifiedRecords(updatedRecords);
};

const deleteOperationById = async (id) => {
  await table.destroy(id);
};

export {
  table,
  getMinifiedRecords,
  findOperationById,
  createOperationByFields,
  findOperationAll,
  updateOperationByFields,
  deleteOperationById,
};
