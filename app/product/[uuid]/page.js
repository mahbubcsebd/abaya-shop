import ProductOrder from "@/app/components/ProductOrder";
import ProductSlider from "@/app/components/ProductSlider";
import ReviewBox from "@/app/components/ReviewBox";
import SocialShare from "@/app/components/SocialShare";
import { getProduct } from "@/app/utils/getProduct";

export async function generateMetadata({ params }) {
    const product = await getProduct(params.uuid);

    const { name } = product.data;

    return {
        title: `Abaya | ${name}`,
    };
}


const ProductDetails = async ({params}) => {
    const product = await getProduct(params.uuid);
    const {
        id,
        name,
        sale_price,
        category,
        attributes,
        sku_code,
        description,
        reviews,
        total_ratings,
        average_rating,
        total_five_stars,
        total_four_stars,
        total_three_stars,
        total_two_stars,
        total_one_stars,
    } = product.data;

    const remainingArray = attributes.filter((attr) => attr.attribute_group.name !== 'Color' && attr.attribute_group.name !== 'Size');

  return (
      <div className="py-6 md:py-20 product-details-page">
          <div className="product-details-area">
              <div className="container">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      <div className="product-details-gallary">
                          <ProductSlider product={product.data} />
                      </div>
                      <div className="product-details-content">
                          <div>
                              <h2 className="text-2xl lg:text-4xl leading-snug text-gray-900 font-medium mb-[18px]">
                                  {name}
                              </h2>
                              <p className="mb-5 font-semibold text-gray-800 text-2x lg:text-3xl product-price">
                                  দাম : ৳{sale_price}
                              </p>
                          </div>
                          <ProductOrder product={product.data} />
                          <hr className="my-6 border-gray-400" />
                          <div className="my-6">
                              <SocialShare />
                          </div>
                          <div className="md:w-3/4">
                              <h3 className="text-xl text-gray-900 font-medium mb-[30px]">
                                  Product Details :
                              </h3>
                              <ul className="">
                                  <li className="flex items-center py-[18px] border-b border-gray-500">
                                      <p className="text-lg text-gray-800 font-medium min-w-[160px]">
                                          প্রোডাক্ট কোড :
                                      </p>
                                      <p className="text-lg font-medium text-gray-700">
                                          {sku_code}
                                      </p>
                                  </li>
                                  {remainingArray.map((prodDetails, index) => (
                                      <li
                                          key={index}
                                          className="flex items-center py-[18px] border-b border-gray-500"
                                      >
                                          <p className="text-lg text-gray-800 font-medium min-w-[160px]">
                                              {prodDetails.attribute_group.name}{' '}
                                              :
                                          </p>
                                          <p className="text-lg font-medium text-gray-700">
                                              {prodDetails.attributes.map(
                                                  (attr) => attr.name
                                              )}
                                          </p>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div
                      className="pt-10 text-lg font-medium text-gray-800"
                      dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
              </div>
              <ReviewBox
                  reviews={reviews}
                  id={id}
                  ratings={{
                      total_ratings,
                      average_rating,
                      total_five_stars,
                      total_four_stars,
                      total_three_stars,
                      total_two_stars,
                      total_one_stars,
                  }}
              />
          </div>
      </div>
  );
}

export default ProductDetails