"use client"

import { useState,useEffect } from "react"

type SizeType = {
    h:number;
    w:number
}

export const useSize =() => {
    const [size,setSize] = useState<SizeType>({
        h:0,
        w:0
    })
    useEffect(() => {
        if(typeof window === undefined) return
        const handleSize = () => {
            setSize(prev =>(
                {...prev,
                    h:window.innerHeight,
                    w:window.innerWidth
                }))
        }
        window.addEventListener('resize',handleSize)
        handleSize()
        return () => window.removeEventListener('resize',handleSize)
    },[])

    return size
}

