'use client'

import Nav from "@/components/navabar";
import { useCity } from "@/hooks/useCIty";
import { useCampsite } from "@/hooks/useCampsite";
import { useType } from "@/hooks/useType";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { Campsite, City, Province, Type } from "@/types";
import Link from "next/link";
import FortuneWheel from "@/components/fortune_wheel";
import Image from "next/image";
import CampsiteCard from "@/components/campsite_card";
import TypeCard from "@/components/type_card";

export default function Home() {
    const { cities, getCities } = useCity();
    const { campsites, getCampsites } = useCampsite();
    const { types, getTypes } = useType();
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

    function getRandomNumbers() {
        const numbers: number[] = [];
        while (numbers.length < 8) {
          const randomNum = Math.floor(Math.random() * 72); // Tạo số ngẫu nhiên từ 0 đến 71
          if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
          }
        }
        return numbers;
      }
      

    useEffect(() => {
        getCities();
        getCampsites();
        getTypes();
        const random = getRandomNumbers();
        setRandomNumbers(random);
    }, [])

    return (
        <div className="absolute w-full h-full">
            {cities.length == 0 ? <Loading /> 
                : (
                    <div className="p-16 mochiy-pop-one">
                        <div className="w-full flex justify-between">
                            <div>
                                <h1 className="text-[32px] font-bold text-[#A67B5B]">全国の地域から探す</h1>
                                <div className="flex flex-col gap-8 mt-8">
                                        {cities.map((city: City, index: number) => (
                                            <div key={index} className="h-[30px] flex gap-8 items-center">
                                                <Link href={`/home/city/${city.id}`} className="text-[#ECB176] font-semibold">{city.name}</Link>

                                                <div className="flex gap-4">
                                                    {city.provinces?.map((province: Province) => (
                                                        <div key={province.name} className="w-[80px] h-[30px] bg-[#ECB176] text-[#6F4E37] font-semibold flex items-center justify-center rounded-full shadow-md hover:opacity-80 cursor-pointer">
                                                            <Link href={`/home/province/${province.id}`} className="mt-[2px]">{province.name}</Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="w-[500px] h-[500px]">
                                <FortuneWheel />
                            </div>
                            <div className="ml-[40px] w-[300px] h-[500px] flex items-center">
                                <Image 
                                    src="/pic/talking_kagamihara.png"
                                    alt="Talking Kagamihara"
                                    width={300}
                                    height={200}
                                />
                            </div>
                        </div>
                        <div className="mt-[128px]">
                            <h1 className="text-[32px] font-bold text-[#A67B5B]">全国のおすすめキャンプ場</h1>
                            <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-10 p-8">
                                {randomNumbers.map((index: number) => (
                                    <CampsiteCard campsite={campsites[index]} key={index}/>
                                ))}
                            </div>
                        </div>
                        <div className="mt-[64px]">
                            <h1 className="text-[32px] font-bold text-[#A67B5B]">施設タイプから探す</h1>
                            <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-10 p-8">
                                {types.map((type: Type, index: number) => (
                                    <TypeCard key={index} type={type} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}