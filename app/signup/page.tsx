'use client'

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Toast from "@/components/toast_message";
import { useRef } from "react";
import Image from "next/image";

export default function Signup() {
    const router = useRouter();
    const slide = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<{
        email: string,
        password: string,
        username: string,
        image: string
    }>({
        email: '',
        password: '',
        username: '',
        image: ''
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [appear, setAppear] = useState<boolean>(false);

    const signup = () => {
        try {
            setLoading(true);

            setTimeout(async () => {
                let { error } = await supabase
                    .auth
                    .signUp({
                        email: formData.email,
                        password: formData.password
                    })
                
                setLoading(false);
                
                if (error) {
                    setAppear(true);
                    setTimeout(() => {
                        setAppear(false)
                    }, 2000);
                } else {
                    if (slide.current) slide.current.classList.add('slide');
                }
                
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleUploadImage = async (e: any) => {
        let file = e.target.files[0];

        if (!file) {
            console.error("No file selected");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        const imagePath = `/${user?.id}/user_avatar`;
        
        const { data, error } = await supabase
            .storage
            .from('avatars')
            .upload(
                imagePath,
                file, 
                { upsert: true }
            )
        
        if (data) {
            let { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(imagePath);
            
            let imageUrl = `${publicUrl}?timestamp=${new Date().getTime()}`;    
            setFormData((prev) => ({
                ...prev,
                image: imageUrl
            }));
        }
                
        if (error) console.log(error)
    }

    const handleAddUser = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        let { error } = await supabase
            .from('user')
            .insert({
                'id': user?.id,
                'email': formData.email,
                'username': formData.username,
                'avatar': formData.image || "/pic/default_avatar.svg"
            })
        
        if (error) console.log(error);

        setTimeout(() => {
            setLoading(false);
            router.replace('/login');
        }, 1000)
    }

    return (
        <>
            <div className="w-full h-[100vh] flex items-center justify-center">
                <img 
                    src="/pic/auth_bg.jpg"
                    alt="pic" 
                    className="absolute top-0 left-0 w-full h-full -z-10"
                />
                <div className="w-[400px] h-[500px] relative overflow-hidden">
                    <div className="w-full h-full bg-white-transparent text-gray-600 rounded-md mochiy-pop-one flex flex-col items-center p-6">
                        <h1 className="mt-8 font-bold text-[40px]">サインアップ</h1>
                        <form className="mt-[48px]">
                            <input name="email" value={formData?.email} onChange={handleChange} className="mb-8 w-full h-[40px] p-3 bg-transparent border-b-2 border-gray-600" type="email" placeholder="メール" autoComplete="false"/>
                            <input name="password" value={formData?.password} onChange={handleChange} className="w-full h-[40px] p-3 bg-transparent border-b-2 border-gray-600" type="password" placeholder="パスワード" autoComplete="false"/>
                        </form>
                        <button onClick={signup} className="flex items-center justify-center mt-12 w-[50%] h-[60px] bg-slate-600 rounded-full text-white hover:opacity-80 font-bold gap-2">
                            次へ
                            {loading && <AiOutlineLoading className="text-sm animate-spin" />}
                        </button>
                        <p className="text-sm mt-6">
                            アカウントもう作った ? <Link href='/login' className="hover:underline">ロギング</Link>
                        </p>
                    </div>
                    <div ref={slide} className="flex flex-col items-center w-full h-full bg-white absolute right-[-400px] top-0 rounded-md p-10">
                        <div className="flex items-center justify-center w-[150px] h-[150px] rounded-full border-2 border-slate-400 shadow-md overflow-hidden relative">
                            <Image 
                                src={formData.image || "/pic/default_avatar.svg"}
                                alt="avatar"
                                layout="fill"
                            />
                        </div>
                        <div className="relative overflow-hidden">
                            <button className="mt-4 w-[120px] h-[30px] rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-semibold">
                                アップロード
                            </button>
                            <input type="file" onChange={(e) => handleUploadImage(e)} accept="image/png, image/jpeg" className="hover:cursor-pointer w-[80px] h-[30px] absolute top-0 left-0 opacity-0"/>
                        </div>
                        <form className="mt-[48px]">
                            <input name="username" value={formData?.username} onChange={handleChange} className="mb-8 w-full h-[40px] p-3 bg-transparent border-b-2 border-gray-600" type="email" placeholder="Username" autoComplete="false"/>
                        </form>
                        <button onClick={handleAddUser} className="flex items-center justify-center mt-12 w-[60%] h-[60px] bg-slate-600 rounded-full text-white hover:opacity-80 font-bold gap-2">
                            サブミット 
                            {loading && <AiOutlineLoading className="text-sm animate-spin" />}
                        </button>
                    </div>
                </div>
            </div>
            {appear && <Toast type="warning" message="アカウントはすでにサインアップしています! ログインしてみてください！" setAppear={setAppear}/>}
        </>
    )
}