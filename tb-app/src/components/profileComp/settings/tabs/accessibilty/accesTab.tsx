

import Display from "./display/display"

export default function AccesTab() {


    return (
        <div className="p-8 lg:p-12">
            <h1 className="font-bold text-xl">Accessibilty</h1>
            <p className="mt-1 text-base text-black/60">These options enhance accessibility.</p>
            <div className="flex flex-col gap-3 mt-9">
                <Display />
            </div>
        </div>
    )
}