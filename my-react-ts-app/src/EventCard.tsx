import PropTypes from 'prop-types';

 export interface EventProps {
    eventName: string; //char
    eventType: string; //varchar
    price: number; // float
    date: string; // integer
    duration: number; // double
    downpaymentStatus: boolean; // boolean
}

function Event(props: EventProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-xl flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 truncate">{props.eventName}</h3>
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                    {props.eventType}
                </span>
            </div>
            <div className="flex-1 space-y-2 text-gray-700 text-base mb-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="font-semibold text-green-600">₱{props.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{props.date}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Duration:</span>
                    <span>{props.duration} hrs</span>
                </div>
            </div>
            <div className="mt-auto pt-2">
                <span className={`inline-block px-4 py-1 text-xs font-semibold rounded-full shadow-sm ${
                    props.downpaymentStatus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                    {props.downpaymentStatus ? "Downpayment Paid" : "No Downpayment"}
                </span>
            </div>
        </div>
    );
}

Event.propTypes = {
    eventName: PropTypes.string,
    eventType: PropTypes.string,
    price: PropTypes.number,
    date: PropTypes.string,
    duration: PropTypes.number,
    downpaymentStatus: PropTypes.bool
};


export default Event;
