import { FaMapMarkerAlt } from "react-icons/fa";

const GroupTrip = ({ plan }) => {
  return (
    <li
      key={plan.id}
      className="flex items-start bg-white p-6 rounded-lg shadow-md mb-6 transition transform hover:scale-105 hover:shadow-lg"
    >
      <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 mr-4">
        <FaMapMarkerAlt className="text-[#05A8AA]" />
      </div>

      <div className="flex flex-1 justify-between items-start">
        <div>
          <h4 className="text-2xl font-semibold text-gray-800">{plan.title}</h4>
          <p className="text-sm text-gray-500">
            {new Date(plan.datePosted).toLocaleDateString()}
          </p>
        </div>
        <div className="text-gray-600 text-sm">
          <p>
            Destination:{" "}
            <span className="font-semibold">{plan.destination}</span>
          </p>
          <p className="font-medium">
            Status:
            <span
              className={`ml-2 ${
                plan.status === "completed" ? "text-green-500" : "text-blue-500"
              }`}
            >
              {plan.status}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default GroupTrip;
