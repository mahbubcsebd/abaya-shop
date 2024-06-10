
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import { getAllProduct } from "./utils/getProduct";

const Home = async () => {
  const products = await getAllProduct();
    return (
        <>
            <Hero />
            <ProductList products={products.data} show={8} />
        </>
    );
};

export default Home;
