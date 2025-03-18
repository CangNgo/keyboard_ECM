
import { FaCircleNotch } from 'react-icons/fa';
interface Spinner {
    className?: string;
}

export default function Spinner({className} : Spinner) {
    return (
        <FaCircleNotch className={`animate-spin w-8 h-8 fill-[#64748b] ` + className} />
    )
}