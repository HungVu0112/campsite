import { TypeCardProps } from "@/types";
import { useRouter } from "next/navigation";

export default function TypeCard ({ type }: TypeCardProps) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/home/type/${type.id}`)} className="h-[200px] shadow-md rounded-md overflow-hidden cursor-pointer hover:opacity-80 bg-white">
            <div className="h-[150px]">
                <img 
                    src={type.image} 
                    alt="Image"
                    className="w-full h-full bg-cover" 
                />
            </div>
            <div className="h-[50px] p-3 font-semibold">
                <p className="text-[#A67B5B] text-sm text-center break-words whitespace-normal">{type.name}</p>
            </div>
        </div>
    )
}