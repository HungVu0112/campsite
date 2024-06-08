'use client'

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Toast from "@/components/toast_message";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [appear, setAppear] = useState<boolean>(false);

    const login = () => {
        try {
            setLoading(true);

            setTimeout(async () => {
                let { error } = await supabase
                    .auth
                    .signInWithPassword({
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
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user != null) {
                        sessionStorage.setItem('userId', user.id);
                    }
                    router.replace('/home');
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

    return (
        <>
            <div className="w-full h-[100vh] flex items-center justify-center">
                <img 
                    src="/pic/auth_bg.jpg"
                    alt="pic" 
                    className="absolute top-0 left-0 w-full h-full -z-10"
                />
                <div className="w-[400px] h-[500px] bg-white-transparent text-gray-600 rounded-md mochiy-pop-one flex flex-col items-center p-6">
                    <h1 className="mt-8 font-bold text-[40px]">ロギング</h1>
                    <form className="mt-[48px]">
                        <input name="email" value={formData?.email} onChange={handleChange} className="mb-8 w-full h-[40px] p-3 bg-transparent border-b-2 border-gray-600" type="email" placeholder="メール" autoComplete="false"/>
                        <input name="password" value={formData?.password} onChange={handleChange} className="w-full h-[40px] p-3 bg-transparent border-b-2 border-gray-600" type="password" placeholder="パスワード" autoComplete="false"/>
                    </form>
                    <button onClick={login} className="flex items-center justify-center mt-12 w-[80%] h-[60px] bg-slate-600 rounded-full text-white hover:opacity-80 font-bold gap-2">
                        ロギング
                        {loading && <AiOutlineLoading className="text-sm animate-spin" />}
                    </button>
                    <p className="text-sm mt-6">
                        アカウントまだ作らなかった？ <Link href='/signup' className="hover:underline">サインアップ</Link>
                    </p>
                </div>
            </div>
            {appear && <Toast type="warning" message="アカウントが存在しません!もう一度試すか、サインアップしてください。" setAppear={setAppear}/>}
        </>
    )
}