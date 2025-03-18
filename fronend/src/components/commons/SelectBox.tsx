import { useEffect, useState } from 'react';

interface SelectBoxProps {
    options?: Array<{ value: string | number | boolean | undefined, label: string | number, disable?: boolean, valueClassName?: string }>;
    name: string;
    id?: string;
    customClassName?: string;
    defaultValue?: string | number | boolean;
    centerText?: boolean;
    disable?: boolean;
    defaultOptionValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disableDefaultOption?: boolean;
    label?: string;
    loading?: boolean;
    onChangeString?: (e:string) => void ;
}

export default function SelectBox({
    options = [],
    id = "combobox",
    name,
    centerText = false,
    defaultValue = "",
    disable = false,
    defaultOptionValue = "-- Lọc theo --",
    customClassName = '',
    disableDefaultOption = false,
    label,
    onBlur,
    onChange,
    loading = false,
    onChangeString
}: SelectBoxProps) {
    const [selectedValue, setSelectedValue] = useState<string | number | boolean>(defaultValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue]);

    return (
        <div className='relative'>
            <p className='absolute text-xs text-textSecondary left-5 top-1'>{label}</p>
            <select
                id={id}
                name={name}
                className={
                    `flex-none border appearance-auto border-gray-300 text-[#808EA1] hover:border-[#434343] transition duration-300 text-sm rounded-lg block p-2.5 px-4 shadow-md ${centerText ? 'text-center' : ''} ${disable ? 'bg-[#e7e9eb] cursor-not-allowed' : ''} focus:outline-none focus:ring-0 ${customClassName} ${label ? 'pt-5' : ''}`
                }
                value={String(selectedValue)}
                onChange={handleChange || onChangeString}
                
                disabled={disable}
                onBlur={onBlur}
            >
                {loading ? (
                    <option value="-9999">
                        Đang tải...
                    </option>
                ) : (
                    <>
                        {!disableDefaultOption && (
                            <option disabled value="">
                                {defaultOptionValue}
                            </option>
                        )}
                        {options.map((option, index) => (
                            <option
                                key={index}
                                value={typeof option.value === 'boolean' ? String(option.value) : option.value}
                                disabled={option.disable}
                                className={option.valueClassName}
                            >
                                {option.label}
                            </option>
                        ))}
                    </>
                )}
            </select>
        </div>
    );
}
