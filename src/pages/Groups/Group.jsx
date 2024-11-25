import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import {
  fetchGroupById,
  fetchPlanningByGroupID,
  fetchUserById,
} from "../../utils/api";
import GroupTrip from "../../components/Groups/GroupTrip";

const Group = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [planningData, setPlanningData] = useState([]);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const data = await fetchGroupById(groupId);
      setGroup(data);

      const membersUsernames = await Promise.all(
        data.members.map(async (memberId) => {
          const user = await fetchUserById(memberId);
          return user.username;
        })
      );
      setUsernames(membersUsernames);
    };

    const fetchPlanningDetails = async () => {
      const data = await fetchPlanningByGroupID(groupId);
      setPlanningData(data);
    };

    fetchGroupDetails();
    fetchPlanningDetails();
  }, [groupId]);

  if (!group) {
    return <p>Loading...</p>;
  }

  return (
    <UserLayout>
      <div className="p-6">
        {/* Group Info Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{group.name}</h1>
              <p className="text-gray-600">{group.description}</p>
            </div>
            <Link
              to={`/user/group/${groupId}/plan`}
              className="w-[180px] text-center py-2 bg-[#05A8AA] text-white font-semibold rounded-lg hover:bg-[#028c8e] transition duration-300"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Members{" "}
            <span className="text-sm text-gray-500">
              ({group.members?.length} members)
            </span>
          </h3>

          <div className="flex space-x-4">
            {group.members?.map((memberId, index) => {
              const colors = [
                "bg-red-500",
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-pink-500",
                "bg-indigo-500",
                "bg-teal-500",
                "bg-orange-500",
                "bg-gray-500",
              ];

              const colorClass = colors[index % colors.length];

              return (
                <div className="relative group" key={memberId}>
                  <div
                    className={`flex items-center justify-center w-20 h-20 rounded-full text-white font-semibold ${colorClass} group-hover:scale-110 transform transition-all duration-200`}
                  >
                    {usernames[index]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Trips Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Future Trips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {planningData.filter((plan) => plan.status === "in-progress")
              .length > 0 ? (
              planningData
                .filter((plan) => plan.status === "in-progress")
                .map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 ease-in-out"
                  >
                    <GroupTrip plan={plan} />
                  </div>
                ))
            ) : (
              <p>No upcoming trips.</p>
            )}
          </div>
        </div>

        {/* Past Trips Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Past Trips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {planningData.filter((plan) => plan.status === "completed").length >
            0 ? (
              planningData
                .filter((plan) => plan.status === "completed")
                .map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 ease-in-out"
                  >
                    <GroupTrip plan={plan} />
                  </div>
                ))
            ) : (
              <p>No completed past trips.</p>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Group;
