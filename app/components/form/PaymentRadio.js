import Image from 'next/image';

const PaymentRadio = ({ value, name, icon, checked, onChange, imgClass }) => {
    return (
        <>
            <label
                htmlFor={value}
                className={`flex justify-center items-center gap-[18px] h-[70px] p-6 w-full bg-white border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 cursor-pointer ${
                    checked ? 'border-blue-500' : ''
                }`}
            >
                <input
                    type="radio"
                    id={value}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 form-radio absolute h-0 w-0 appearance-none"
                />
                <span className="flex items-center w-full gap-2">
                    <Image
                        src={icon}
                        alt="payment icon"
                        className={imgClass}
                    />
                </span>
            </label>
        </>
    );
};

export default PaymentRadio;
