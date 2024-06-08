'use client'

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useProvince } from "@/hooks/useProvince";
import { useCampsite } from "@/hooks/useCampsite";
import Loading from "@/components/loading";
import { Campsite } from "@/types";
import CampsiteCard from "@/components/campsite_card";

export default function ProvincePage () {
    const params = useParams();
    const provinceId = typeof params.id === 'string' ? parseInt(params.id) : undefined;
    const { province, getProvince } = useProvince({ provinceId });
    const { provinceCampsites, getProvinceCampsites } = useCampsite({ provinceId });

    useEffect(() => {
        getProvince();
        getProvinceCampsites();
    }, [])

    console.log(provinceCampsites);

    return (
        <div className="absolute w-full h-full">
            {!province.image ? <Loading />
                : 
                <>
                    <div className="relative w-full h-[500px]">
                        <div className="absolute w-full h-full bg-black opacity-30"></div>
                        <img 
                            src={province.image}
                            alt="Image" 
                            className="w-full h-full"
                        />
                        <h1 className="absolute top-[50%] -translate-y-[50%] left-[200px] text-white text-[64px] font-semibold">{province.name}</h1>
                    </div>
                    <div className="p-16">
                        <h1 className="text-[32px] font-bold text-[#A67B5B]">キャンプサイト</h1>
                        <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-10 p-8">
                            {provinceCampsites.map((campsite: Campsite, index: number) => (
                                <CampsiteCard campsite={campsite} />
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}