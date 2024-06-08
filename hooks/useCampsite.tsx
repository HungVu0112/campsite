import { Campsite } from "@/types";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export interface UseCampsiteProps {
    cityId?: number,
    provinceId?: number,
    campsiteId?: number
    wantPeopleNumb?: number,
}

export const useCampsite = ({ cityId, provinceId, campsiteId }: UseCampsiteProps = {}) => {
    const [campsites, setCampsites] = useState<Campsite[]>([]);
    const [campsite, setCampsite] = useState<Campsite>({});
    const [cityCampsites, setCityCampsites] = useState<Campsite[]>([]);
    const [provinceCampsites, setProvinceCampsites] = useState<Campsite[]>([]);

    const addWant = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select()
            .eq('id', campsiteId)
            .maybeSingle();
        
        if (data) {
            const { data: updatedData, error } = await supabase
                .from('campsite')
                .update({
                    wantPeople: data.wantPeople + 1
                })
                .eq('id', data.id)
                .select()
                .single();
            
            if (updatedData) {
                setCampsite(updatedData);
            }
            if (error) console.log(error);
        }
    
        if (error) {
            console.log(error);
        }
    }
    
    const destroyWant = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select()
            .eq('id', campsiteId)
            .maybeSingle();
        
        if (data) {
            const { data: updatedData, error } = await supabase
                .from('campsite')
                .update({
                    wantPeople: data.wantPeople - 1
                })
                .eq('id', data.id)
                .select()
                .single();
            
            if (updatedData) {
                setCampsite(updatedData);
            }
            if (error) console.log(error);
        }
    
        if (error) {
            console.log(error);
        }
    }

    const addWent = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select()
            .eq('id', campsiteId)
            .maybeSingle();
        
        if (data) {
            const { data: updatedData, error } = await supabase
                .from('campsite')
                .update({
                    camePeople: data.camePeople + 1
                })
                .eq('id', data.id)
                .select()
                .single();
            
            if (updatedData) {
                setCampsite(updatedData);
            }
            if (error) console.log(error);
        }
    
        if (error) {
            console.log(error);
        }
    }
    
    const destroyWent = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select()
            .eq('id', campsiteId)
            .maybeSingle();
        
        if (data) {
            const { data: updatedData, error } = await supabase
                .from('campsite')
                .update({
                    camePeople: data.camePeople - 1
                })
                .eq('id', data.id)
                .select()
                .single();
            
            if (updatedData) {
                setCampsite(updatedData);
            }
            if (error) console.log(error);
        }
    
        if (error) {
            console.log(error);
        }
    }

    const getCampsite = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select()
            .eq('id', campsiteId)
            .maybeSingle();
        
        if (data) setCampsite(data);

        if (error) {
            console.log(error);
            return {};
        }
    }


    const getCampsites = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select(`
                *,
                city(name),
                province(name)
            `)
        
        if (data) {
            const campsites: Campsite[] = data.map((campsite: any) => ({
                ...campsite,
                cityName: campsite.city.name,
                provinceName: campsite.province.name
              }))
            
            setCampsites(campsites);
        }

        if (error) {
            console.log(error);
            return [];
        }
    }

    const getCityCampsites = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select(`
                *,
                city(name),
                province(name)
            `)
            .eq('cityId', cityId)
        
        if (data) {
            const campsites: Campsite[] = data.map((campsite: any) => ({
                ...campsite,
                cityName: campsite.city.name,
                provinceName: campsite.province.name
              }))
            
            setCityCampsites(campsites);
        }

        if (error) {
            console.log(error);
            return [];
        }
    }

    const getProvinceCampsites = async () => {
        const { data, error } = await supabase
            .from('campsite')
            .select(`
                *,
                city(name),
                province(name)
            `)
            .eq('provinceId', provinceId)
        
        if (data) {
            const campsites: Campsite[] = data.map((campsite: any) => ({
                ...campsite,
                cityName: campsite.city.name,
                provinceName: campsite.province.name
              }))
            
            setProvinceCampsites(campsites);
        }

        if (error) {
            console.log(error);
            return [];
        }
    }

    return {
        campsite,
        campsites,
        cityCampsites,
        provinceCampsites,
        getCampsite,
        getCampsites,
        getCityCampsites,
        getProvinceCampsites,
        addWant,
        addWent,
        destroyWant,
        destroyWent 
    }
}