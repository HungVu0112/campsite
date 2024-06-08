'use client'

import { useParams } from "next/navigation";
import { usePlan } from "@/hooks/usePlan";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { AiOutlineLoading } from "react-icons/ai";
import Toast from "@/components/toast_message";
import { useBook } from "@/hooks/useBook";

export default function PlanPage () {
    const params = useParams();
    const planId = typeof params.id === 'string' ? parseInt(params.id) : undefined;
    const { plan, getPlan } = usePlan({ planId });
    const [appear, setAppear] = useState<boolean>(false);
    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const userId = sessionStorage.getItem('userId');
    const { book, getBook, addBook, deleteBook } = useBook({ planId, userId });

    useEffect(() => {
        getPlan();
        getBook();
    }, [])

    const handeClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            addBook();
            setAppear(true);
            setTimeout(() => {
                setAppear(false)
            }, 2000);
        }, 1000)
    }

    const handleDeleteBook = () => {
        setLoadingDelete(true);
        setTimeout(() => {
            setLoadingDelete(false);
            deleteBook();
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false);
            }, 2000);
        }, 1000)
    }

    return (
        <div className="absolute w-full h-full p-20 mochiy-pop-one">
            {!plan.image ? <Loading />
                : 
                <>
                    <div className="w-full h-[300px] flex items-center justify-between">
                        <div>
                            <h1 className="font-bold text-3xl text-[#A67B5B]">{plan.title}</h1>
                            <div className="flex items-center gap-2 w-[150px] mt-4">
                                <p className="font-semibold mt-[2px]">一泊</p>
                                <p className="text-[28px] text-orange-500">{plan.price}</p>
                            </div>
                            <div className="flex gap-4">
                                <div onClick={book.id ? ()=>{} : handeClick} className={`w-[200px] h-[60px] flex gap-2 items-center justify-center mt-5 text-lg rounded-md shadow-md font-bold ${book.id ? "bg-gray-200 text-gray-500" : "bg-green-500 text-white  hover:opacity-80 cursor-pointer"}`}>
                                    <p>{book.id ? "予約した": "予約"}</p>
                                    {loading && <AiOutlineLoading className="text-sm animate-spin" />}
                                </div>
                                {book.id &&
                                    <div onClick={handleDeleteBook} className="w-[200px] h-[60px] flex items-center justify-center text-lg rounded-md shadow-md font-bold bg-red-400 text-white mt-5 gap-2 cursor-pointer hover:opacity-80">
                                        <p>キャンセル</p>
                                        {loadingDelete && <AiOutlineLoading className="text-sm animate-spin" />}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="h-full rounded-md shadow-lg overflow-hidden">
                            <img 
                                src={plan.image}
                                alt="Image" 
                                className="h-full"
                            />
                        </div>  
                    </div>
                    <div className="w-full mt-16">
                        <div className="w-[600px]">
                            <h1 className="font-bold text-2xl text-[#A67B5B]">施設</h1>
                            <div className="w-full grid grid-cols-5 gap-x-2 gap-y-4 mt-3">
                                {plan.facility?.split(',').map((facility: string, index: number) => (
                                    <div className="h-[20px] bg-[#FED8B1] font-bold text-[12px] text-[#6F4E37] p-3 flex items-center justify-center rounded-full">
                                        <p>{facility}</p>
                                    </div>
                                ))}
                            </div>
                        </div>  
                        <div className="w-fit mt-16 border border-gray-300">
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>種別</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.classify}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>定員</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.capacity}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>広さ</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.width}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>チェックイン	</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.checkIn}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>チェックアウト</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.checkOut}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>アーリーチェックイン</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.earlyCheckIn}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>車両乗入</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.parking}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>AC電源</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.AC}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>ペット同伴</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.pet}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>朝食</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.breakfast}</p>
                                </div>
                            </div>
                            <div className="flex border border-b-gray-300 border-t-0 border-l-0 border-r-0">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>夕食</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.dinner}</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="text-gray-500 font-bold w-[200px] h-[40px] bg-gray-200 p-4 flex items-center">
                                    <p>地面</p>
                                </div>
                                <div className="w-[600px] h-[40px] flex items-center p-4 font-bold">
                                    <p>{plan.ground}</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-[100px] w-full"></div>
                    </div>
                    {appear && <Toast type="success" message="予約完了しました。" setAppear={setAppear}/>}
                    {deleteSuccess && <Toast type="success" message="予約がキャンセルしました。" setAppear={setAppear}/>}
                </>
            }
        </div>
    )
}