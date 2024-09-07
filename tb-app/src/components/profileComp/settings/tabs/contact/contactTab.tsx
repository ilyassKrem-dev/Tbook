


import ContactFriends from "./contactFriends/contactFriends"

export default function ContactTab({reqSend}:{
    reqSend:"all"|"fff"
}) {

    return (
        <div className="p-5 bg-gray-1">
            <h1 className="font-bold text-xl">How people find and contact you</h1>

            <ContactFriends reqSend={reqSend}/>
        </div>
    )
}