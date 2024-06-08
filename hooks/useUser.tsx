'use client'

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";

export const useUser = () => {
    const router = useRouter();

    const [user, setUser] = useState<User>({
        id: '',
        email: '',
        username: '',
        avatar: ''
    });

    const getUserInfo = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('user')
            .select()
            .eq(
                'id',
                user?.id
            )
            .maybeSingle()
        
        if (data) setUser(data);
        if (error) {
            console.log(error);
            return [];
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut();
        router.replace("/login");
    }

    return {
        user,
        getUserInfo,
        signOut,
    }
}