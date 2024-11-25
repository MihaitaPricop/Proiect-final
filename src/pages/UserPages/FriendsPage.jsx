import { fetchPosts } from "../../utils/api";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UserLayout from "../../layouts/UserLayout";
import TripPost from "../../components/Trips/TripPost";

const AllPosts = () => {
  const { user } = useAuth();
  const [friendsTrips, setFriendsTrips] = useState([]);

  useEffect(() => {
    const loadFriendsTrips = async () => {
      try {
        const allPosts = await fetchPosts();
        const filteredTrips = allPosts.filter(
          (post) => post.userId !== user?.id
        );
        setFriendsTrips(filteredTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    loadFriendsTrips();
  }, [user?.id]);

  return (
    <UserLayout>
      <section className="bg-white p-6 rounded-lg shadow-md w-11/12 mx-auto mt-10 min-h-screen">
        <h2 className="text-2xl font-bold text-[#DC602E] mb-6">
          Explore Other Users' Trips
        </h2>
        <h2>To DO: search/filter by destination</h2>

        {friendsTrips.length === 0 ? (
          <p className="text-gray-600">No other trips available.</p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {friendsTrips.map((trip) => (
              <TripPost
                key={trip.id}
                id={trip.id}
                title={trip.title}
                description={trip.description}
                images={trip.images}
              />
            ))}
          </div>
        )}
      </section>
    </UserLayout>
  );
};

export default AllPosts;
