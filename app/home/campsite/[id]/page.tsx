'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCampsite } from "@/hooks/useCampsite";
import Loading from "@/components/loading";
import { BsSignpost2Fill } from "react-icons/bs";
import StarRate from "@/components/star_rate";
import { FaCheckCircle } from "react-icons/fa";
import { FaGrinHearts } from "react-icons/fa";
import { usePlan } from "@/hooks/usePlan";
import { GiCampfire } from "react-icons/gi";
import { useRef } from "react";
import { Plan } from "@/types";
import PlanCard from "@/components/plan_card";
import { UseWentProps, useWent } from "@/hooks/useWent";
import { UseWantProps, useWant } from "@/hooks/useWant";
import { useUser } from "@/hooks/useUser";

export default function CampsitePage () {
    const plan = useRef<HTMLDivElement>(null);
    const params = useParams();
    const campsiteId = typeof params.id === 'string' ? parseInt(params.id) : undefined;
    const { campsite, getCampsite, addWant, addWent, destroyWant, destroyWent} = useCampsite({ campsiteId });
    const { campsitePlans, getCampsitePlans } = usePlan({ campsiteId });
    const userId = sessionStorage.getItem('userId');
    const { went, getWent, insertWent, deleteWent } = useWent({ userId ,campsiteId });
    const { want, getWant, insertWant, deleteWant } = useWant({ userId ,campsiteId });
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        getCampsite();
        getCampsitePlans();
        getWent();
        getWant();
    }, [])

    const handleWentClick = () => {
        if (!went.userId) {
            addWent();
            insertWent();
        } else {
            destroyWent();
            deleteWent();
        }
    }

    const handleWantClick = () => {
        if (!want.userId) {
            addWant();
            insertWant();
        } else {
            destroyWant();
            deleteWant();
        }
    }

    return (
        <div className="absolute w-full h-full p-16">
            {!campsite.image ? <Loading />
                :
                <>
                    <div className="w-full h-[450px] flex justify-between mochiy-pop-one">
                        <div className="flex flex-col justify-center">
                            <div className="h-[110px]">
                                <h1 className="font-bold text-3xl text-[#A67B5B]">{campsite.name}</h1>
                                <div className="flex gap-2 mt-4 items-center text-[#ECB176]">
                                    <BsSignpost2Fill className="text-lg"/>
                                    <p className="font-semibold">{campsite.detailLocation}</p>
                                </div>
                            </div>
                            <div className="w-full h-[26px] flex items-center gap-2">
                                <StarRate starNumb={campsite.star!} />
                                <p className="mt-[3px] text-[#ECB176]">{campsite.star}</p>
                            </div>
                            <div className="mt-8 w-[500px] h-[140px] bg-gray-100 shadow-md rounded-sm p-3">
                                <a href='#plan'  onClick={(e) => {
                                    e.preventDefault();
                                    if (plan.current) plan.current.scrollIntoView({ behavior: 'smooth' });
                                }} className="w-full h-[60px] rounded-md bg-green-500 flex items-center justify-center hover:opacity-80">
                                    <p className="text-white text-lg font-bold">予約へ進む</p>
                                </a>
                                <div className=" grid grid-cols-2 gap-2 mt-2">
                                    <div onClick={handleWentClick} className={`${went.userId ? "bg-green-400" : "bg-white"} h-[50px] rounded-md flex items-center justify-center gap-2 cursor-pointer`}>
                                        <FaCheckCircle className={`${went.userId ? "text-white" : "text-green-500"} text-[20px]`}/>
                                        <p className={`${went.userId ? "text-white" : "text-gray-600"} mt-[4px] text-sm font-bold`}>行った :</p>
                                        <p className={`${went.userId ? "text-white" : "text-gray-600"} mt-[4px] text-sm font-bold`}>{campsite.camePeople}</p>
                                    </div>
                                    <div onClick={handleWantClick} className={`${want.userId ? "bg-red-400" : "bg-white"} h-[50px] rounded-md flex items-center justify-center gap-2 cursor-pointer`}>
                                        <FaGrinHearts className={`${want.userId ? "text-white" : "text-red-500"} text-[20px]`}/>
                                        <p className={`${want.userId ? "text-white" : "text-gray-600"} mt-[4px] text-sm font-bold`}>行きたい :</p>
                                        <p className={`${want.userId ? "text-white" : "text-gray-600"} mt-[4px] text-sm font-bold`}>{campsite.wantPeople}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md shadow-lg overflow-hidden">
                            <img 
                                src={campsite.image}
                                alt="Image"
                                className="w-full h-full" 
                            />
                        </div>
                    </div>
                    <div id="line" className="w-full h-[1px] border my-14"></div>
                    <div ref={plan} id="plan" className="w-full p-16 bg-gray-100 rounded-md mochiy-pop-one">
                        <h1 className="font-bold text-3xl text-[#A67B5B]">プラン一覧</h1>
                        <div className="mt-4 flex items-center gap-2">
                            <GiCampfire className="text-[20px] text-orange-500"/>
                            <p className="text-sm mt-[4px] font-semibold text-[#ECB176]">{`${campsitePlans.length} 件のプランがあります。`}</p>
                        </div>
                        <div className="mt-5 w-full flex flex-col gap-6 items-center p-12">
                            {campsitePlans.map((plan: Plan, index: number) => (
                                <PlanCard key={index} plan={plan} />
                            ))}
                        </div>
                    </div>
                    <div className="h-[120px] w-full"></div>
                </>
            }
        </div>
    )
}