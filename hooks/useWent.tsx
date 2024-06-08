import { supabase } from "@/lib/supabase";
import { Went } from "@/types";
import { useState } from "react";

export interface UseWentProps {
    userId?: string | null,
    campsiteId?: number
}

export const useWent = ({ userId, campsiteId }: UseWentProps) => {
    const [went, setWent] = useState<Went>({});

    const getWent = async () => {
        const { data, error } = await supabase
            .from('went')
            .select()
            .eq('userId', userId)
            .eq('campsiteId', campsiteId)
            .maybeSingle()

        if (data) setWent(data);
        if (error) {
            console.log(error);
            setWent({});
        }
            
    }

    const insertWent = async () => {
        const { data, error } = await supabase
            .from('went')
            .insert({
                'userId': userId,
                'campsiteId': campsiteId
            })
            .select()
    
        if (data) setWent(data[0]);
        if (error) console.log(error);
    };
    
    const deleteWent = async () => {
        const { error } = await supabase
            .from('went')
            .delete()
            .eq('userId', userId)
            .eq('campsiteId', campsiteId);
    
        if (error) {
            console.log(error);
        } else {
            setWent({});
        }
    };

    return {
        went,
        getWent,
        insertWent,
        deleteWent
    }
}