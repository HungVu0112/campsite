import { supabase } from "@/lib/supabase";
import { Book } from "@/types"
import { useId, useState } from "react"

export interface UseBookProps {
    planId?: number,
    userId?: string | null,
}

export const useBook = ({ planId, userId }: UseBookProps) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [book, setBook] = useState<Book>({});

    const getBook = async () => {
        const { data, error } = await supabase
            .from('book')
            .select()
            .eq('planId', planId)
            .eq('userId', userId)
            .maybeSingle()
        
        if (data) setBook(data);
        if (error) {
            console.log(error);
            setBook({})
        }
    }

    const getBooks = async () => {
        const { data, error } = await supabase
            .from('book')
            .select(`
                *,
                plan( title, capacity, pet, price, checkIn, checkOut, AC, image )    
            `)
            .eq('userId', userId)
            .order('id', { ascending: false });

        if (data) {
            const books: Book[] = data.map((book: any) => ({
                ...book,
                planTitle: book.plan.title,
                planImage: book.plan.image,
                planCheckIn: book.plan.checkIn,
                planCheckOut: book.plan.checkOut,
                planPrice: book.plan.price,
                planAC: book.plan.AC,
                planPet: book.plan.pet,
                planCapicity: book.plan.capacity
              }))
            
            setBooks(books);
        }
        if (error) {
            console.log(error);
            setBooks([]);
        }
    }

    const addBook = async () => {
        const { data, error } = await supabase
            .from('book')
            .insert({
                'useId': useId,
                'planId': planId
            })
            .select()
        
        if (data) setBook(data[0]);
        if (error) console.log(error);
    }

    const deleteBook = async () => {
        const { error } = await supabase
            .from('book')
            .delete()
            .eq('planId', planId)
            .eq('userId', userId)

        if (error) {
            console.log(error)
        } else {
            setBook({});
        }
    }

    return {
        books,
        book,
        getBook,
        getBooks,
        addBook,
        deleteBook
    }
}