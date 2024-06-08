'use client'

import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

export default function Nav() {
    const homeRef = useRef<HTMLAnchorElement>(null);
    const guideRef = useRef<HTMLAnchorElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { user, getUserInfo, signOut } = useUser();

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (pathname == "/home") {
            homeRef.current?.classList.add("text-[#A67B5B]");
            guideRef.current?.classList.remove("text-[#A67B5B]");
        } else if (pathname == "/home/rule") {
            homeRef.current?.classList.remove("text-[#A67B5B]");
            guideRef.current?.classList.add("text-[#A67B5B]");
        } else {
            homeRef.current?.classList.remove("text-[#A67B5B]");
            guideRef.current?.classList.remove("text-[#A67B5B]");
        }
        if (pathname.startsWith('/home/account/')) {
            menuRef.current?.classList.toggle('hidden');
        }
    }, [pathname]);

    return (
        <div className="fixed w-full h-[60px] flex items-center justify-between px-8 shadow-md z-[1] bg-white">
            <div className="flex gap-2 mochiy-pop-one">
                <img 
                    src="/pic/logo.svg" 
                    alt="logo"
                    width={20}
                    height={20} 
                />
                <p className="mt-[4px] font-bold text-[12px] text-slate-600">キャンプサイト</p>
            </div>
            <div className="flex items-center gap-[120px]">
                <div className="flex">
                    <Link replace={true} ref={homeRef} href="/home" className="text-[#A67B5B] flex items-center justify-center min-w-[100px] font-bold h-[20px] cursor-pointer hover:underline underline-offset-4 relative before:absolute before:content-[''] before:w-full before:h-full before:border-r-2 before:border-slate-600 before:-skew-x-12">
                        ホーム
                    </Link>
                    <Link replace={true} ref={guideRef} href="/home/rule" className="flex items-center justify-center min-w-[100px] h-[20px] font-bold cursor-pointer hover:underline underline-offset-4 relative before:absolute before:content-[''] before:w-full before:h-full before:border-r-2 before:border-slate-600 before:-skew-x-12">
                        ルール
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-green-100 overflow-hidden">
                        <img 
                            src={user?.avatar}
                            alt="Avatar"
                            className="w-full h-full select-none"
                        />
                    </div>
                    <TiThMenu onClick={() => { menuRef.current?.classList.toggle("hidden") }} className="text-gray-600 cursor-pointer"/>
                </div>
            </div>
            <div ref={menuRef} className="text-[#543310] mochiy-pop-one p-3 hidden fade-in absolute top-[54px] right-[20px] w-[100px] rounded-sm bg-[#F8F4E1] shadow-md z-[10000]">
                <Link replace={true} href={`/home/account/${user.id}`} className="flex items-center gap-2 cursor-pointer">
                    <IoPerson className="text-[18px]"/>
                    <p className="text-[8px] font-bold">アカウント</p>
                </Link>
                <div onClick={signOut} className="flex items-center gap-2 mt-3 cursor-pointer">
                    <HiOutlineLogout className="text-[18px]"/>
                    <p className="text-[8px] mt-[2px] font-bold">ログアウト</p>
                </div>
            </div>
        </div>
    )
}