import ProductOrder from "@/app/components/ProductOrder";
import ProductSlider from "@/app/components/ProductSlider";
import Ratings from "@/app/components/Ratings";
import Review from "@/app/components/Review";
import { getProduct } from "@/app/utils/getProduct";

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
    } = product.data;


    const remainingArray = attributes.filter((attr) => attr.attribute_group.name !== 'Color' && attr.attribute_group.name !== 'Size');

    // Product Details
    // const colors = attributes[1];
    // const sizes = attributes[2];
    // const ziper = attributes[3][0];
    // const fabric = attributes[3][0].attribute_group.name;
    // const gher = attributes[4][0];
  return (
      <div className="py-20 product-details-page">
          <div className="product-details-area">
              <div className="container">
                  <div className="grid grid-cols-2 gap-[30px]">
                      <div className="product-details-gallary">
                          <ProductSlider product={product.data} />
                      </div>
                      <div className="product-details-content">
                          <div>
                              <h2 className="text-4xl leading-snug text-gray-900 font-medium mb-[18px]">
                                  {name}
                              </h2>
                              <p className="mb-5 text-3xl font-semibold text-gray-800 product-price">
                                  দাম : ৳{sale_price}
                              </p>
                          </div>
                          {/* <div className="flex items-center mb-5">
                              <div className="min-w-[90px]">
                                  <p className="text-base font-semibold text-gray-700 ">
                                      Size :
                                  </p>
                              </div>
                              <ul className="flex items-center gap-[18px]">
                                  {sizes.map((size) => (
                                      <li key={size.id}>
                                          <button
                                              type="button"
                                              className="px-6 py-4 text-base font-medium text-gray-600 border border-gray-600 rounded-md size-varient hover:text-white hover:bg-gray-700"
                                          >
                                              {size.name}
                                          </button>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="flex items-center">
                              <div className="min-w-[90px]">
                                  <p className="text-base font-semibold text-gray-700 ">
                                      Color :
                                  </p>
                              </div>
                              <ul className="flex items-center gap-[18px]">
                                  {colors.map((color) => (
                                      <li key={color.id}>
                                          <button
                                              type="button"
                                              className="px-6 py-4 text-base font-medium text-gray-600 border border-gray-600 rounded-md size-varient hover:text-white hover:bg-gray-700 "
                                          >
                                              {color.name}
                                          </button>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <hr className="my-6 border-gray-400" />
                          <div className="flex items-center gap-[18px] mb-[30px]">
                              <ProductCounter id={id} />
                              <button className="flex items-center gap-2 px-[30px] py-4 text-white bg-gray-900 rounded-md">
                                  অর্ডার করুন
                              </button>
                          </div> */}
                          <ProductOrder product={product.data} />
                          <hr className="my-6 border-gray-400" />
                          <div className="w-3/4">
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
              <Ratings />
              <Review reviews={reviews} />
          </div>
      </div>
  );
}

export default ProductDetails