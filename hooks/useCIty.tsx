'use client'

import { supabase } from "@/lib/supabase"
import { City } from "@/types"
import { useState } from "react"

export interface UseCityProps {
    cityId?: number
}

export const useCity = ({ cityId }: UseCityProps = {}) => {
    const [cities, setCities] = useState<City[]>([]);
    const [city, setCity] = useState<City>({});

    const getCities = async () => {
        const { data, error } = await supabase
            .from('city')
            .select()
        
        if (data) {
            // Use Promise.all to wait for all async operations to complete
            const newCityList = await Promise.all(data.map(async (city: City) => {
                const { data: provincesData, error: provincesError } = await supabase
                    .from('province')
                    .select()
                    .eq('cityId', city.id);
                
                if (provincesData) {
                    return {
                        ...city,
                        provinces: provincesData
                    }
                }
                return city; // Return the city even if provincesData is undefined
            }));
            
            // Set the cities state with the resolved data
            setCities(newCityList);
        }

        if (error) {
            console.log(error);
            return [];
        }
    }

    const getCity = async () => {
        if (cityId) {
            const { data, error } = await supabase
                .from('city')
                .select()
                .eq('id', cityId)
                .maybeSingle()

            if (data) {
                const { data: provincesData, error: provincesError } = await supabase
                    .from('province')
                    .select()
                    .eq('cityId', cityId);

                if (provincesData) {
                    setCity(
                        {
                            ...data,
                            provinces: provincesData
                        }    
                    ) 
                }
            }

            if (error) {
                console.log(error);
                return {};
            }
        }

        return {};
    }

    return {
        cities,
        getCities,
        city,
        getCity
    }
}
