'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCity } from "@/hooks/useCIty";
import { useCampsite } from "@/hooks/useCampsite";
import Loading from "@/components/loading";
import { Campsite, Province } from "@/types";
import CampsiteCard from "@/components/campsite_card";

export default function CityPage () {
    const params = useParams();
    const router = useRouter();
    const cityId = typeof params.id === 'string' ? parseInt(params.id) : undefined;
    const { city, getCity } = useCity({ cityId });
    const { cityCampsites, getCityCampsites } = useCampsite({ cityId });

    useEffect(() => {
        getCity();
        getCityCampsites();
    }, [])

    return (
        <div className="absolute w-full h-full">
            {!city.image ? <Loading /> 
                :
                <>
                    <div className="relative w-full h-[500px]">
                        <div className="absolute w-full h-full bg-black opacity-30"></div>
                        <img 
                            src={city.image}
                            alt="Image" 
                            className="w-full h-full"
                        />
                        <h1 className="absolute top-[50%] -translate-y-[50%] left-[200px] text-white text-[64px] font-semibold">{city.name}</h1>
                    </div>
                    <div className="p-16">
                        {city.provinces?.map((province: Province, index: number) => {
                            let count = 0;
                            return (
                                <div key={index} className="mb-14">
                                    <h1 className="text-[32px] font-bold text-[#A67B5B]">{province.name}</h1>
                                    <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-10 p-8">
                                        {cityCampsites.map((campsite: Campsite) => {
                                            if (count < 4) {
                                                if (campsite.provinceId == province.id) {
                                                    count++;
                                                    return <CampsiteCard key={campsite.name} campsite={campsite} />
                                                }
                                            }
                                            return <></>
                                        })}
                                    </div>
                                    <div className="flex justify-center w-full">
                                        <button onClick={() => router.push(`/home/province/${province.id}`)} className="w-[150px] h-[50px] bg-[#FED8B1] text-[#6F4E37] font-bold rounded-full shadow-md hover:opacity-80">
                                            もっと見る
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </div>
    )
}