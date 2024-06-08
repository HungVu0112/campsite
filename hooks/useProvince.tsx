'use client'

import { supabase } from "@/lib/supabase";
import { Province } from "@/types";
import { useState } from "react";

export interface UseProvinceProps {
    provinceId?: number
}

export const useProvince = ({ provinceId }: UseProvinceProps) => {
    const [province, setProvince] = useState<Province>({});

    const getProvince = async () => {
        const { data, error } = await supabase
            .from('province')
            .select()
            .eq('id', provinceId)
            .maybeSingle()

        if (data) setProvince(data);
        if (error) {
            console.log(error);
            return {}
        }
    }

    return {
        province,
        getProvince
    }
}