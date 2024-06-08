import React from "react";
import Nav from "@/components/navabar";

export default function HomeLayout ({ children } : { children : React.ReactNode}) {
    return (
        <div className="relative w-full min-h-[100vh]">
           <Nav />
           <div className="absolute top-[60px] w-full min-h-[calc(100%-60px)]">
            {children} 
           </div>
        </div>
    )
}