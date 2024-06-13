const Input = ({ label, name, type = 'text', placeholder, optional }) => {
    return (
        <div className="single-input">
            {label && (
                <label className="block text-gray-700 text-sm font-semibold mb-[6px]">
                    {label} {optional && <span className="text-gray-600">{`(${optional})`}</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow bg-white"
            />
        </div>
    );
};

export default Input;
