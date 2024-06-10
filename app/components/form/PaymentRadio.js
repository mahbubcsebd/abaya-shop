import Image from "next/image";

const PaymentRadio = ({ value, name, icon, checked, onChange, imgClass }) => {

        return (
            <>
                <label
                    htmlFor={value}
                    class="flex items-center gap-[18px] h-[60px] lg:h-[92px] p-6 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 cursor-pointer"
                >
                    <input
                        type="radio"
                        id={value}
                        className="w-5 h-5 text-blue-600 form-radio"
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 form-radio h-5 w-5"
                    />
                    <span class="flex items-center gap-2 w-full">
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
