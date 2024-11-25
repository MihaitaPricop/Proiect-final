import { Link } from "react-router-dom";

const GroupList = ({ groups }) => {
  return (
    <>
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <p className="text-gray-600">{group.description}</p>
              <Link
                to={`/user/group/${group.id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                View Group
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No groups found</p>
      )}
    </>
  );
};

export default GroupList;
