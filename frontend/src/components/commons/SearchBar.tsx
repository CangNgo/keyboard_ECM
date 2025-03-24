import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from './Button'; // Import Button component

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    buttonLabel?: string;
    buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;
    inputClassName?: string;
    formClassName?: string;
    buttonClassName?: string;
    autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Tìm kiếm sản phẩm...',
    onSearch,
    buttonLabel = '',
    buttonProps = {},
    inputClassName = '',
    formClassName = '',
    buttonClassName = '',
    autoFocus = false,
}) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className={`flex items-center border rounded-lg overflow-hidden ${formClassName}`}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className={`flex-1 px-4 py-2 border-none outline-none ${inputClassName}`}
            />
            <Button
                type="submit"
                className={`px-4 py-2 rounded-l-none hover:bg-yellow-100 ${buttonClassName}`}
                onClick={() => onSearch(query)}
                {...buttonProps}
            >
                <FontAwesomeIcon icon={faSearch} />
            </Button>
        </form>
    );
};

export default SearchBar;
