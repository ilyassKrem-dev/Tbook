

import FriendsContact from "./friends/friendsContact";
import SearchContact from "./search/searchContact";
export default function ContactTab({reqSend,friendsList,searchPr}:{
    reqSend:"all"|"fff";
    friendsList:"all"|"fff"|"friends"|"me";
    searchPr:"all"|"fff"|'me'
}) {

    return (
        <div className="p-5 bg-gray-1">
            <h1 className="font-bold text-xl">How people find and contact you</h1>
            <FriendsContact reqSend={reqSend} friendsList={friendsList}/>
            <SearchContact searchPr={searchPr}/>
            
        </div>
    )
}