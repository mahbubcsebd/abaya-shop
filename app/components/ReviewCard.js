import { FaUserCircle } from 'react-icons/fa';

const ReviewCard = () => {
  return (
      <div className="single-review-card bg-white rounded-[10px] px-5 py-[30px] border border-[#E3E3E3]">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <div>
                      <div className="w-10 h-10 rounded-full">
                          <FaUserCircle />
                      </div>
                  </div>
                  <div>
                      <h2 className="text-base font-medium text-gray-700 mb-[10px]">
                          Babor Hossain
                      </h2>
                      <p className="text-[18px] font-bold text-[#333333]">
                          Customer
                      </p>
                  </div>
              </div>
              <div>
                  <p className='text-base font-medium text-gray-700'>
                      অসাধারণ কালেকশন, দারুণ সার্ভিস! এই শপের কাস্টমার সাপোর্ট
                      টিম অনেক হেল্পফুল। 😊 যেকোনো প্রশ্নের উত্তর তারা খুব দ্রুত
                      দিয়েছে। সব মিলিয়ে দারুণ অভিজ্ঞতা! 😍
                  </p>
              </div>
          </div>
      </div>
  );
}

export default ReviewCard