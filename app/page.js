
import HeroSlider from "./components/HeroSlider";
import ProductList from "./components/ProductList";
import { getAllCategories } from "./utils/categories";
import { getHeroImage } from "./utils/getHeroImage";

export const metadata = {
    title: 'Abaya | Home',
};

const Home = async () => {
    const categories = await getAllCategories();
    // const products = await getAllProduct();
    const heroImages = await getHeroImage();

    return (
        <>
            <HeroSlider images={heroImages.data} />
            <ProductList
                // products={products}
                categories={categories.data}
            />
            {/* <ReviewSlider /> */}
        </>
    );
};

export default Home;
