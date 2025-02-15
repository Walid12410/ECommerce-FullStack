import Countdown from 'react-countdown';


const OfferCard = ({offer}) => {
    
    // Custom Countdown renderer with design
    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-lg font-bold text-primary ">Offer Expired</span>;
        } else {
            return (
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="p-1">
                        <div className="text-xs font-semibold ">Days</div>
                        <div className="text-xl font-bold rounded-lg shadow-lg ">{days}</div>
                    </div>
                    <div className="p-1">
                        <div className="text-xs font-semibold ">Hours</div>
                        <div className="text-xl font-bold rounded-lg shadow-lg ">{hours}</div>
                    </div>
                    <div className="p-1">
                        <div className="text-xs font-semibold ">Minutes</div>
                        <div className="text-xl font-bold rounded-lg shadow-lg ">{minutes}</div>
                    </div>
                    <div className="p-1">
                        <div className="text-xs font-semibold ">Seconds</div>
                        <div className="text-xl font-bold rounded-lg shadow-lg ">{seconds}</div>
                    </div>
                </div>
            );
        }
    };

    return ( 
        <div key={offer?.OfferNo} className="p-4">
        <div className="card w-full max-w-xs bg-base-100 shadow-xl">
            <figure>
                <img
                    src={offer?.ProductImage}
                    alt={offer?.ProductName}
                    className="w-full h-96 object-cover rounded-t-lg cursor-pointer"
                />
            </figure>
            <div className="card-body">
                <h3 className="card-title">{offer?.ProductName}</h3>
                <p className="text-xs font-bold">{offer?.SubCategoryName} {offer?.ColorName}</p>
                <p className="text-xs font-bold underline cursor-pointer">{offer?.BrandName}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-primary">{`$${offer?.Price - offer?.DiscountAmt}`}</span>
                    <span className="text-sm line-through">{`$${offer?.Price}`}</span>
                </div>
                <div className="mt-3">
                    <div className="bg-base-200 rounded-2xl text-center">
                        <span className="text-sm font-semibold">Time Left:</span>
                        <Countdown date={new Date(offer?.EndDate)} renderer={countdownRenderer} />
                    </div>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default OfferCard;