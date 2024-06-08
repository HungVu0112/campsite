import { StarRateProps } from "@/types";
import { IconType } from "react-icons";
import { FaStar } from "react-icons/fa";

export default function StarRate ({ starNumb }: StarRateProps) {
    const starList: number[] = [1,2,3,4,5]

    return (
        <div className="flex gap-[2px]">
            {starList.map((index: number) => (
                index <= starNumb ? <FaStar key={index} className="text-yellow-300"/> : <FaStar key={index} />
            ))}
        </div>
        
    )
}