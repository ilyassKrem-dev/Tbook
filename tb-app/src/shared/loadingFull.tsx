"use client"

import LoadingReload from "./loadingReload";
export default function LaodingFullScreen() {
    
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50">
            <LoadingReload />
            
        </div>
    )
}