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
        unit_price,
        category,
        stock,
        attributes,
        sku_code,
        description,
        reviews,
        summary,
        total_ratings,
        average_rating,
        total_five_stars,
        total_four_stars,
        total_three_stars,
        total_two_stars,
        total_one_stars,
        variants,
    } = product.data;

    // console.log('product' + unit_price);



    // const remainingArray = attributes.filter((attr) => attr.attribute_group.name !== 'Color' && attr.attribute_group.name !== 'Size');

  return (
      <div className="pt-[68px] pb-6 lg:pt-[170px] md:pb-20 product-details-page">
          <div className="product-details-area">
              <div className="container">
                  <div className="grid grid-cols-12 gap-[30px] lg:gap-[60px] xl:gap-[60px] 2xl:gap-20">
                      <div className="col-span-12 lg:col-span-6 xl:col-span-5">
                          <div className="product-details-gallary">
                              <ProductSlider product={product.data} />
                          </div>
                      </div>
                      <div className="col-span-12 lg:col-span-6 xl:col-span-7">
                          <div className="product-details-content">
                              <div>
                                  <h2 className="text-2xl lg:text-4xl leading-snug text-gray-900 font-medium mb-[24px] lg:mb-[40px]">
                                      {name}
                                  </h2>
                                  <p className="mb-5 lg:mb-[30px] font-semibold text-gray-800 text-2xl lg:text-3xl product-price">
                                      মূল্য :{' '}
                                      <span
                                          className={`inline-block ${
                                              sale_price > 0
                                                  ? 'line-through text-xl lg:text-2xl'
                                                  : ''
                                          }`}
                                      >
                                          ৳{unit_price}
                                      </span>{' '}
                                      {sale_price > 0 && (
                                          <span className="text-2xl lg:text-3xl">
                                              ৳{sale_price}
                                          </span>
                                      )}
                                  </p>
                                  {stock < 1 && (
                                      <p className="mb-5 text-red-500">
                                          দুঃখিত প্রোডাকটি স্টকে নেই।
                                      </p>
                                  )}
                              </div>
                              <ProductOrder product={product.data} />
                              <hr className="my-6 border-gray-400" />
                              <ul className="flex flex-col gap-3 mb-[30px] md:gap-[30px]">
                                  <li className="flex items-center gap-3">
                                      <p className="text-xl font-medium text-gray-900">
                                          ক্যাটাগরি :
                                      </p>
                                      <p className="text-xl font-medium text-gray-700">
                                          {category}
                                      </p>
                                  </li>
                                  <li className="flex items-center gap-3">
                                      <p className="text-xl font-medium text-gray-900">
                                          প্রোডাক্ট কোড :
                                      </p>
                                      <p className="text-xl font-medium text-gray-700">
                                          {sku_code}
                                      </p>
                                  </li>

                                  {/* {remainingArray.map((prodDetails, index) => (
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
                                  ))} */}
                              </ul>
                              <div className="">
                                  <SocialShare />
                              </div>
                              {summary && (
                                  <div>
                                      <hr className="my-6 border-gray-400" />
                                      <div className="md:w-3/4">
                                          <h3 className="mb-10 text-xl font-medium text-gray-900">
                                              প্রোডাক্টের বিস্তারিত :
                                          </h3>
                                          <div
                                              className=""
                                              dangerouslySetInnerHTML={{
                                                  __html: summary,
                                              }}
                                          ></div>
                                      </div>
                                  </div>
                              )}
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