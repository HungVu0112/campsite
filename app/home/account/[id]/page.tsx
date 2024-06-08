'use client'

import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import Loading from "@/components/loading";
import { useBook } from "@/hooks/useBook";
import { GiCampfire } from "react-icons/gi";
import { Book } from "@/types";
import PlanCard from "@/components/plan_card";

export default function Account () {
    const { user, getUserInfo } = useUser();
    const userId = sessionStorage.getItem('userId');
    const { books, getBooks } = useBook({ userId });

    useEffect(() => {
        getUserInfo();
        getBooks();
    }, [])
    return (
        <div className="absolute w-full h-full py-16 px-20">
            {user.email == "" ? <Loading /> : 
                <>
                    <div className="w-full flex justify-end gap-6">
                        <div className="w-[400px] fixed top-[124px] left-20">
                            <div className="w-[200px] h-[200px] rounded-full shadow-md overflow-hidden border-2 border-gray-400">
                                <img 
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="w-full h-full" 
                                />
                            </div>
                            <div className="mt-4 text-[#A67B5B] font-bold">
                                <p>{`@${user.username}`}</p>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="w-[1000px]">
                            <h1 className="font-bold text-3xl text-[#A67B5B]">プラン一覧</h1>
                            <div className="mt-4 flex items-center gap-2">
                                <GiCampfire className="text-[20px] text-orange-500"/>
                                <p className="text-sm mt-[4px] font-semibold text-[#ECB176]">{`${books.length} 件のプランがあります。`}</p>
                            </div>
                            <div className="mt-5 w-full flex flex-col gap-6 items-center">
                                {books.map((book: Book, index: number) => (
                                    <PlanCard plan={{
                                        id: book.planId,
                                        title: book.planTitle,
                                        image: book.planImage,
                                        checkIn: book.planCheckIn,
                                        checkOut: book.planCheckOut,
                                        pet: book.planPet,
                                        AC: book.planAC,
                                        capacity: book.planCapicity,
                                        price: book.planPrice
                                    }} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[120px]"></div>
                </>
            }
        </div>
    )
}