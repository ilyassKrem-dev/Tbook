
import BlockedMessages from "./message/messagesBlock"


export default function BlockingTab() {

    return (
        <div className="p-8 lg:p-12">
            <h1 className="font-bold text-xl">Blocking</h1>
            <div  className="mt-4 flex flex-col gap-4">
                <h2 className="font-semibold text-lg">Manage Blocking</h2>
                <BlockedMessages />

            </div>
        </div>
    )
}