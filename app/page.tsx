'use client'

import Image from "next/image";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-[64px] mochiy-pop-one">
        <img 
          src="/pic/start_view_bg.jpg"
          alt="pic" 
          className="absolute top-0 left-0 w-full h-full -z-10"
        />
        <div>
          <h1 className="text-[84px] font-bold text-white">キャンプサイトへ</h1>
          <h2 className="text-[74px] text-white text-center">ようこそ</h2>
        </div>
        <button onClick={() => {
          router.replace('/login');
        }} className="w-[240px] h-[70px] text-[#3572EF] bg-[#A7E6FF] rounded-full flex items-center justify-center gap-3 hover:opacity-80">
          <p className="font-bold">
            始めましょう
          </p>
          <FaRegArrowAltCircleRight className="text-[24px]"/>
        </button>
    </div>
  );
}
