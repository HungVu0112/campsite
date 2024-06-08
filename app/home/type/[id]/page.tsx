'use client'

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useType } from "@/hooks/useType";
import { usePlan } from "@/hooks/usePlan";
import Loading from "@/components/loading";
import { GiCampfire } from "react-icons/gi";
import PlanCard from "@/components/plan_card";
import { Plan } from "@/types";

export default function TypePage () {
    const params = useParams();
    const typeId = typeof params.id === 'string' ? parseInt(params.id) : undefined;
    const { type, getType } = useType({ typeId });
    const { typePlans, getTypePlans } = usePlan({ typeId });

    useEffect(() => {
        getType();
        getTypePlans();
    }, [])

    return (
        <div className="absolute w-full h-full">
            {!type.image ? <Loading />
                :
                <>
                    <div className="relative w-full h-[500px]">
                        <div className="absolute w-full h-full bg-black opacity-30"></div>
                        <img 
                            src={type.image}
                            alt="Image" 
                            className="w-full h-full"
                        />
                        <h1 className="absolute top-[50%] -translate-y-[50%] left-[200px] text-white text-[64px] font-semibold">{type.name}</h1>
                    </div>
                    <div className="w-full p-16 bg-gray-100 rounded-md mochiy-pop-one">
                        <h1 className="font-bold text-3xl text-[#A67B5B]">プラン一覧</h1>
                        <div className="mt-4 flex items-center gap-2">
                            <GiCampfire className="text-[20px] text-orange-500"/>
                            <p className="text-sm mt-[4px] font-semibold text-[#ECB176]">{`${typePlans.length} 件のプランがあります。`}</p>
                        </div>
                        <div className="mt-5 w-full flex flex-col gap-6 items-center p-12">
                            {typePlans.map((plan: Plan, index: number) => (
                                <PlanCard plan={plan} />
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}