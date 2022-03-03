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
  let list = [];
  const AllRecords1 = await table
    .select({
      filterByFormula: `AND(id>=0,id<=99)`,
    })
    .firstPage();
  const AllRecords2 = await table
    .select({
      filterByFormula: `AND(id>=100,id<=199)`,
    })
    .firstPage();
  const AllRecords3 = await table
    .select({
      filterByFormula: `id>=200`,
    })
    .firstPage();
  list = list.concat(getMinifiedRecords(AllRecords1));
  list = list.concat(getMinifiedRecords(AllRecords2));
  list = list.concat(getMinifiedRecords(AllRecords3));
  return list;
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
