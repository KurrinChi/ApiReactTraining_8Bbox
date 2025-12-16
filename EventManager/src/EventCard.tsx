export interface EventCardProps {
  eventName: string; //char
  eventType: string; //varchar
  price: number; //float
  date: string; //int
  duration: number; //double
  downpaymentStatus: boolean; // boolean
}

const EventCard = ({
  eventName,
  eventType,
  price,
  date,
  duration,
  downpaymentStatus,
}: EventCardProps) => {
  return (
    <div className="w-full h-full rounded-xl border p-4 bg-white border-gray-200 shadow-sm hover:shadow-md transition hover:scale-110 flex flex-col justify-between">
      {/* Event Title */}
      <h2 className="text-lg font-semibold text-gray-800">{eventName}</h2>

      {/* Event Type */}
      <p className="text-sm text-gray-900 bg-amber-100 italic p-1 rounded-md">
        {eventType}
      </p>

      {/* Details */}
      <div className="mt-3 space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-medium">Date:</span> {date}
        </p>
        <p>
          <span className="font-medium">Duration:</span> {duration} hrs
        </p>
        <p>
          <span className="font-medium">Price:</span> ₱{price.toLocaleString()}
        </p>
      </div>

      {/* Status */}
      <div className="mt-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium
            ${
              downpaymentStatus
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {downpaymentStatus ? "Downpayment Paid" : "Pending Downpayment"}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
