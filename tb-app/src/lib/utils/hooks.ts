"use client"

import { useState,useEffect, SetStateAction } from "react"

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


export const useRemoveOverlay =({tab,setShow}:{
    tab:string;
    setShow:React.Dispatch<SetStateAction<boolean>>
}) => {
    useEffect(() => {
        const removeOv = (e:any) => {
            const overlay = document.querySelector(tab)
            
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('click',removeOv)
    
        return () => document.removeEventListener('click',removeOv)
  
    },[setShow,tab])
}

export const ScrollDetector = () => {
    const [scrollingStarted, setScrollingStarted] = useState(false);
  
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0 && !scrollingStarted) {
            setScrollingStarted(true);
          } else if (window.scrollY === 0 && scrollingStarted) {
            setScrollingStarted(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [scrollingStarted]);
    return scrollingStarted
}