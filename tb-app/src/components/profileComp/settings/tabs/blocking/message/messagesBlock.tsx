import { useState } from "react"
import MsgBlockOverlay from "./assets/msgBlocklOverlay"

export default function BlockedMessages() {
    const [show,setShow] = useState<boolean>(false)
    return (
        <div className="flex items-center justify-between">
            <div>
                <h6 className="font-semibold">Block messages</h6>
                <p className="text-sm font-normal break-words text-black/70">If you block someone's profile on Facebook, they won't be able to contact you in Messenger either. Unless you block someone's Facebook profile and any others they may create, they may be able to post on your timeline, tag you, and comment on your posts or comments.</p>
            </div>
            <button 
            className="bg-gray-300/70 p-2 rounded-lg px-3 font-[500] hover-opacity active:scale-95" onClick={() => setShow(true)}>Edit</button>
            {show&&<MsgBlockOverlay setShow={setShow}/>}
        </div>
    )
}