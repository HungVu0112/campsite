import { IoIosCloseCircle } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export default function Toast({ type, message, setAppear } : { type: string, message: string, setAppear: (arg: boolean) => void }) {
    return (
        <div className={`flex items-center justify-between fixed top-4 right-4 p-4 w-[380px] h-[80px] rounded-lg shadow fade-in z-10 ${type}`}>
            <div className="flex gap-2 items-center text-[14px] mochiy-pop-one">
                {type === 'warning' && <IoWarning size={30} />}
                {type === 'success' && <FaCheckCircle size={30} />}
                {message}
            </div>
            <IoIosCloseCircle size={40} className="cursor-pointer" onClick={() => setAppear(false)}/>
        </div>
    )
}