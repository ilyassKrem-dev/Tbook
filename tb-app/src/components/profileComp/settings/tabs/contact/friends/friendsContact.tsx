import ContactFriends from "./contactFriends";
import ContactFriendsList from "./contactFriendsList";




export default function FriendsContact({reqSend,friendsList}:{
    reqSend:"all"|"fff";
    friendsList:"all"|"fff"|"friends"|"me"
}) {

    return (
        <div className="mt-4 bg-white rounded-lg p-3">
            <h1 className="text-xl font-bold">Your friends</h1>
            <div className="flex flex-col gap-6 mt-4">
                <ContactFriends reqSend={reqSend}/>
                <ContactFriendsList friendsList={friendsList}/>
            </div>
            
            
        </div>
    )
}