


export default function LoadingAnimation({className}:{
    className?:string;
}) {

    return (
        <div className="loading-container">
            <div className={`spinner ${className}`} />
        </div>
    )
}