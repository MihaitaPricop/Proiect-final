import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPostByID } from "../../utils/api";
import TripPost from "../../components/Trips/TripPost";
import UserLayout from "../../layouts/UserLayout";

const TripPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const fetchedTrip = await fetchPostByID(id);
        setTrip(fetchedTrip);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    if (id) loadTrip();
  }, [id]);

  if (!trip) return <p>Loading...</p>;

  return (
    <UserLayout>
      <div className="w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <TripPost
          title={trip.title}
          description={trip.description}
          images={trip.images}
          isFullView={true} // Pass a prop to indicate full view
        />
      </div>
    </UserLayout>
  );
};

export default TripPage;
