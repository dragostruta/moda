import {
  findModelById,
  createModelByFields,
} from "../../../components/database/model";
import { gql, request, GraphQLClient } from "graphql-request";
import FormData from "form-data";

const micro = require("micro");
const fs = require("fs");
const formidable = require("formidable");

const createGraphCMSObject = async ({ name, category, price, id, files }) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const data = await graphQLClient.request(`
    mutation {
      createProduct(data: { name: "${name}", category: "${category}", price: "${price}", airtableModelId: "${id}"}) {
        id
        name
        category
        price
        airtableModelId
      }
    }
  `);

  const publishData = await graphQLClient.request(`
    mutation {
      publishProduct(where: {id: "${data.createProduct.id}"}, to: PUBLISHED) {
        id
      }
    }
  `);

  const form = new FormData();

  form.append("fileUpload", fs.createReadStream(files.image.filepath));

  const result = await fetch(`${url}/upload`, {
    method: "POST",
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
    body: form,
  }).then(async () => {
    const assetsQuery = gql`
      query MyQuery {
        assets {
          id
          fileName
          imageProduct {
            id
          }
        }
      }
    `;

    const assetsData = await graphQLClient.request(assetsQuery);
    const newAddedAsset = assetsData.assets.find(
      (element) => element.id === "cl33bdlgfw38k0cuoen2g0vco"
    );
    console.log(assetsData.assets);
  });

  return data;
};

const createModel = async (req, res) => {
  if (req.method === "POST") {
    const data = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const { fields, files } = data;
    const { id, name, category, price } = fields;

    try {
      if (id) {
        const records = await findModelById(id);
        if (records.length !== 0) {
          res.json(records);
          res.status(200);
        } else {
          if (name) {
            const records = await createModelByFields({
              id,
              name,
              category,
              price,
            });
            createGraphCMSObject({
              id,
              name,
              category,
              price,
              files,
            });
            res.json(records);
          } else {
            res.json({ message: "name is missing" });
            res.status(400);
          }
        }
      } else {
        res.json({ message: "id is missing" });
        res.status(400);
      }
    } catch (err) {
      console.error("Error creating or model model");
      res.status(500);
      res.json({ message: "Error creating or finding model", err });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createModel;
