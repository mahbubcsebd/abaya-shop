const RadioButton = ({ label, value, name, checked, onChange }) => {

    return (
        <label
            htmlFor={value}
            className="inline-flex items-center mt-3 border border-gray-400 lg:border-0 p-3 lg:p-0 w-full lg:w-auto rounded-[4px]"
        >
            <input
                type="radio"
                id={value}
                className="w-5 h-5 text-blue-600 form-radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span
                className={`ml-2 text-base font-semibold cursor-pointer ${
                    checked ? 'text-gray-800' : 'text-gray-600'
                }`}
            >
                {label}
            </span>
        </label>
    );
};

export default RadioButton;
