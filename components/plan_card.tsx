import { Plan } from "@/types";
import { useRouter } from "next/navigation";

export interface PlanCardProps {
    plan: Plan
}

export default function PlanCard ({ plan }: PlanCardProps) {
    const router = useRouter();
    return (
        <div className="w-full h-[160px] bg-white shadow-md rounded-sm p-4 flex justify-between">
            <div className="flex gap-6">
                <div className="w-[200px] h-full overflow-hidden rounded-md">
                    <img 
                        src={plan.image}
                        alt="Image" 
                        className="w-full h-full"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-lg text-[#A67B5B] font-bold">{plan.title}</h1>
                    <div className="flex gap-4 text-sm text-gray-500 font-semibold">
                        <p>{`チェックイン : ${plan.checkIn}`}</p>
                        <p>{`チェックアウト : ${plan.checkOut}`}</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <div className="h-[26px] p-3 font-semibold bg-[#6F4E37] text-[10px] flex items-center justify-center text-[#FED8B1] rounded-full">
                            <p>{`AC ${plan.AC}`}</p>
                        </div>
                        <div className="h-[26px] p-3 bg-[#6F4E37] font-semibold text-[10px] flex items-center justify-center text-[#FED8B1] rounded-full">
                            <p>{`ペット ${plan.pet}`}</p>
                        </div>
                        <div className="h-[26px] p-3 bg-[#6F4E37] font-semibold text-[10px] flex items-center justify-center text-[#FED8B1] rounded-full">
                            <p>{`${plan.capacity}人まで`}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-[150px]">
                    <p className="font-semibold">一泊</p>
                    <p className="text-[28px] text-orange-500">{plan.price}</p>
                </div>
                <button onClick={() => router.push(`/home/plan/${plan.id}`)} className="w-[150px] h-[70px] rounded-md bg-blue-400 text-white font-bold hover:opacity-80">
                    プランの詳細
                </button>
            </div>
        </div>
    )
}