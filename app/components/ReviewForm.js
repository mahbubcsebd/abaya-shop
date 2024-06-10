import DropBox from './Dropbox';
import Input from './form/Input';
import ProductRating from './form/ProductRating';

const ReviewForm = () => {
  return (
      <div className="review-form-section pb-20">
          <form id="review-form">
              <div className="grid gap-6">
                  <div className="review-rating-box bg-white border border-[#D0D5DD] rounded-lg">
                      <div className="grid justify-center text-center p-[27px]">
                          <p className="text-sm text-gray-700 font-semibold mb-3">
                              আপনার রেটিং :
                          </p>
                          <ProductRating />
                      </div>
                  </div>
                  <div className="">
                      <label
                          htmlFor="review-comment"
                          className="block text-gray-700 text-sm font-semibold mb-[6px]"
                      >
                          আপনার মন্তব্য
                      </label>
                      <textarea
                          name="review-comment"
                          id="review-comment"
                          rows="5"
                          className="block w-full px-6 py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow"
                      ></textarea>
                  </div>
                  <div className="flex items-center gap-4">
                      <div>
                          <label
                              htmlFor="review-comment"
                              className="block text-gray-700 text-sm font-semibold mb-[6px] min-w-[170px]"
                          >
                              ফটো আপলোড করুন :
                          </label>
                      </div>
                      <DropBox />
                  </div>
                  <Input
                      label="আপনার নাম"
                      type="text"
                      name="fname"
                      placeholder="John Doe"
                  />
                  <Input
                      label="আপনার নাম"
                      type="email"
                      name="fname"
                      placeholder="demo@gmail.com"
                  />
              </div>
          </form>
      </div>
  );
}

export default ReviewForm