'use client'

import { supabase } from "@/lib/supabase";
import { Plan } from "@/types";
import { useState } from "react";

export interface UsePlanProps {
    campsiteId?: number,
    typeId?: number,
    planId?: number
}

export const usePlan = ({ campsiteId, typeId, planId }: UsePlanProps = {}) => {
    const [campsitePlans, setCampsitePlans] = useState<Plan[]>([]);
    const [typePlans, setTypePlans] = useState<Plan[]>([]);
    const [plan, setPlan] = useState<Plan>({});

    const getPlan = async () => {
        const { data, error } = await supabase 
            .from('plan')
            .select()
            .eq('id', planId)
            .maybeSingle();

        if (data) setPlan(data);
        if (error) {
            console.log(error);
            return {};
        }
    }

    const getCampsitePlans = async () => {
        const { data, error } = await supabase
            .from('plan')
            .select()
            .eq('placeId', campsiteId);

        if (data) setCampsitePlans(data);
        if (error) {
            console.log(error);
            return [];
        }
    }

    const getTypePlans = async () => {
        const { data, error } = await supabase
            .from('plan')
            .select()
            .eq('classifyId', typeId);

        if (data) setTypePlans(data);
        if (error) {
            console.log(error);
            return [];
        }
    }

    return {
        plan,
        campsitePlans,
        typePlans,
        getPlan,
        getCampsitePlans,
        getTypePlans
    }
}