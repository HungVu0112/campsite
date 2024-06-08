import { supabase } from "@/lib/supabase";
import { Type } from "@/types";
import { useState } from "react";

export interface UseTypeProps {
    typeId?: number
}

export const useType = ({ typeId }: UseTypeProps = {}) => {
    const [types, setTypes] = useState<Type[]>([]);
    const [type, setType] = useState<Type>({});

    const getType = async () => {
        const { data, error } = await supabase
            .from('type')
            .select()
            .eq('id', typeId)
            .maybeSingle()
        
        if (data) setType(data);
        if(error) {
            console.log(error);
            return {};
        }
    }

    const getTypes = async () => {
        const { data, error } = await supabase
            .from('type')
            .select()
        
        if (data) setTypes(data);
        if(error) {
            console.log(error);
            return [];
        }
    }

    return {
        type,
        types,
        getType,
        getTypes
    }
}