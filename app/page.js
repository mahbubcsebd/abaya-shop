
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import { getAllCategories } from "./utils/categories";
import { getAllProduct } from "./utils/getProduct";

const Home = async () => {

    const categories = await getAllCategories();
    const products = await getAllProduct();

    return (
        <>
            <Hero />
            <ProductList
                products={products}
                categories={categories.data}
            />
        </>
    );
};

export default Home;
