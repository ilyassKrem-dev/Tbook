import { changeContentToLinks } from "@/lib/utils/textUtils";
import { useRef, useState, useEffect, SetStateAction, useCallback } from "react";
import { FaMinus, FaPlus, FaArrowRotateLeft } from "react-icons/fa6";



export default function PhotoPreview({photoStory,setPhotoStory,textStory,selectedColor}:{
    photoStory:{
        media:string;
        file:File[];
        class:{
            scale:number;
            rotate:number
        }
    };
    setPhotoStory:React.Dispatch<SetStateAction<{
        media:string;
        file:File[];
        class:{
            scale:number;
            rotate:number
        }
    }>>;
    textStory:string;
    selectedColor:{
        bgColor:string;
        textColor:"black"|"white"; 
    };
}) {

    const divRef = useRef<HTMLDivElement>(null)
    const [zoom,setZoom] = useState<number>(50)
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [rotation,setRotation] = useState<number>(photoStory.class.rotate)
    const handleMove = (clientX: number) => {
        if (!isDragging || !divRef.current) return;
    
        const container = divRef.current.parentElement;
        if (!container) return;
    
        const containerRect = container.getBoundingClientRect();
        const x = clientX - containerRect.left; 
        const newLeftPercent = Math.min(Math.max((x / containerRect.width) * 100, 0), 95);
        setZoom(newLeftPercent);
        setPhotoStory(prev => ({ ...prev, class: { ...prev.class, scale: newLeftPercent } }));
      };
    const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleTouchStart = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);
    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.addEventListener("touchmove", handleTouchMove, { passive: false });
            document.addEventListener("touchend", handleTouchEnd);
          }
      
          return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
          };
    }, [isDragging]);
    const handleRotation  = () => {
        if(rotation ===240) {
            setPhotoStory(prev => ({...prev,class:{...prev.class,rotate:0}}))
            return setRotation(0)
        }
        setPhotoStory(prev => ({...prev,class:{...prev.class,rotate:prev.class.rotate + 90}}))
        return setRotation(prev => prev+90)
    }
    const text = changeContentToLinks(textStory)
    
    return (
        <div className="max-w-[450px] flex justify-center items-center h-full flex-col w-full gap-3">
            <div className="max-w-[400px] h-full  flex justify-center items-center rounded-md bg-blue-300 w-full relative">
                <div className="absolute top-0 bottom-0 right-0 left-0  border-2 rounded-md border-white z-30">

                </div>
                <div className="absolute flex justify-center items-center break-words max-w-[300px] text-center z-30 top-10  text-lg font-semibold "
                style={{color:selectedColor.textColor}} dangerouslySetInnerHTML={{__html:text}} />
                <img 
                src={photoStory.media} 
                alt="photo" 
                className={`h-full w-full rounded-md object-contain`}
                style={{
                    scale:(zoom+70)/100,
                    rotate:`${rotation}deg`
                }}/>
            </div>
            <div className="relative z-40 flex items-center gap-2">
                <div className="flex items-center text-white gap-2">
                    <div className="cursor-pointer active:scale-95" onClick={() => setZoom(prev => Math.max(0,prev-10))}>
                        <FaMinus />
                    </div>
                    <div className="max-[420px]:w-[100px] max-[450px]:w-[150px] w-[200px] md:w-[180px] lg:w-[300px] relative h-[4px] bg-white rounded-full flex  items-center">
                        <div className="absolute bg-blue-400 h-[4px] rounded-full self-start"
                        style={{width:`${zoom}%`}}>

                        </div>
                        <div className="absolute rounded-full p-2 cursor-pointer bg-white"
                        style={{left:`${zoom}%`}} 
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        ref={divRef}>

                        </div>
                    </div>
                    <div className="cursor-pointer active:scale-95" onClick={() => setZoom(prev => Math.min(prev+10,95))}>
                        <FaPlus />
                    </div>
                </div>
                <button className="p-2 bg-white text-black flex gap-1 items-center rounded-md px-3 font-medium active:scale-95" onClick={handleRotation}>
                    <div>
                        <FaArrowRotateLeft />
                    </div>
                    <span className=" cursor-pointer">Rotate</span>
                </button>
            </div>

        </div>
    )
}