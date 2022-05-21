import { gql, request, GraphQLClient } from "graphql-request";

const uploadFile = async (req, res) => {
  if (req.method === "POST") {
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(`${url}/upload`, {
      headers: {
        Authorization: process.env.GRAPH_CMS_TOKEN,
      },
    });

    try {
      const fileUpload = req.file;

      if (!fileUpload) {
        console.error(err.message);
        res.status(400);
        res.json({ message: "No file attached", err });
      }

      const form = new FormData();
      form.append("fileUpload", fileUpload.buffer, fileUpload.originalname);
      const data = await graphQLClient.request(form);
      console.log(data);
    } catch (err) {
      console.error(err.message);
      res.status(500);
      res.json({ message: "Error on uploading the file", err });
    }
  }
};

export default uploadFile;
