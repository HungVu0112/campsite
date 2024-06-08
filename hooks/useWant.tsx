import { supabase } from "@/lib/supabase";
import { Want } from "@/types";
import { useState } from "react";

export interface UseWantProps {
    userId?: string | null,
    campsiteId?: number
}

export const useWant = ({ userId, campsiteId }: UseWantProps) => {
    const [want, setWant] = useState<Want>({});

    const getWant = async () => {
        const { data, error } = await supabase
            .from('want')
            .select()
            .eq('userId', userId)
            .eq('campsiteId', campsiteId)
            .maybeSingle()

        if (data) setWant(data);
        if (error) {
            console.log(error);
            return {};
        }
            
    }

    const insertWant = async () => {
        const { data, error } = await supabase
            .from('want')
            .insert({
                'userId': userId,
                'campsiteId': campsiteId
            })
            .select()
    
        if (data) setWant(data[0]);
        if (error) console.log(error);
    };
    
    const deleteWant = async () => {
        const { error } = await supabase
            .from('want')
            .delete()
            .eq('userId', userId)
            .eq('campsiteId', campsiteId);
    
        if (error) {
            console.log(error);
        } else {
            setWant({});
        }
    };

    return {
        want,
        getWant,
        insertWant,
        deleteWant
    }
}