



export default function LeftTemplate({children}:{
    children:React.ReactNode
}) {

    return (
        <div className="bg-white md:w-[400px] fixed top-14 left-0 md:bottom-0 right-0 py-1 z-40">
            {children}
        </div>
    )
}