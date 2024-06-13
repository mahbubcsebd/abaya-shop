
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import { getAllCategories } from "./utils/categories";
import { getAllProduct } from "./utils/getProduct";

const Home = async () => {
<<<<<<< HEAD
=======

>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7
    const categories = await getAllCategories();
    const products = await getAllProduct();

    return (
        <>
            <Hero />
            <ProductList
<<<<<<< HEAD
                products={products.data}
=======
                products={products}
>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7
                categories={categories.data}
            />
        </>
    );
};

export default Home;
