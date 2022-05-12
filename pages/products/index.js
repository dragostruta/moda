import NavBar from "../../components/nav/navbar";
import ProductsSideBar from "../../components/nav/ProductsSideBar";
import { gql, request, GraphQLClient } from "graphql-request";
import ProductList from "../../components/content/productList";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const productsQuery = gql`
    query MyQuery {
      products {
        id
        price
        name
        category
        image {
          url
        }
        airtableModelId
      }
    }
  `;

  const data = await graphQLClient.request(productsQuery);
  const products = data.products;

  return {
    props: { products },
  };
};

const ProductsPage = ({ products }) => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-100 pt-20">
      <section>
        <NavBar />
      </section>
      <ProductsSideBar />
      <section className="w-full">
        <div className="p-5 text-2xl font-bold flex-1">
          <section className="antialiased">
            <div className="flex flex-col justify-center h-full">
              <div className="w-full mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <ProductList products={products} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
