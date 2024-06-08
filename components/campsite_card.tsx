import { CampsiteCardProps } from "@/types";
import StarRate from "./star_rate";
import { useRouter } from "next/navigation";

export default function CampsiteCard({ campsite }: CampsiteCardProps) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/home/campsite/${campsite.id}`)} className="h-[350px] shadow-md rounded-md overflow-hidden cursor-pointer hover:opacity-80 bg-white">
            <div className="h-[200px]">
                <img 
                    src={campsite.image} 
                    alt="Image"
                    className="w-full h-full bg-cover" 
                />
            </div>
            <div className="h-[150px] p-3 font-semibold">
                <div className="h-[80px]">
                    <p className="text-[#A67B5B] text-sm text-center break-words whitespace-normal">{campsite.name}</p>
                    <p className="text-[#ECB176] text-xs text-center mt-1">{`${campsite.cityName} > ${campsite.provinceName}`}</p>
                </div>
                <div className="w-full h-[26px] flex justify-center items-center gap-2">
                    <StarRate starNumb={campsite.star!} />
                    <p className="mt-[3px] text-[#ECB176]">{campsite.star}</p>
                </div>
            </div>
        </div>
    )
}