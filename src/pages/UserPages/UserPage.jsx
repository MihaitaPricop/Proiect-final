import UserLayout from "../../layouts/UserLayout";
import { useAuth } from "../../context/AuthContext";
import L from "leaflet";
import { useEffect, useRef } from "react";
import TravelSugestions from "../../components/Trips/TravelSugestions";

const UserPage = () => {
  const { user } = useAuth();

  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapContainerRef.current._leaflet_id) {
      const map = L.map(mapContainerRef.current).setView(
        [47.151726, 27.587914],
        13
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const src = [
        [47.151723, 27.587924],
        [47.151223, 27.587224],
        [47.1511, 27.5871],
      ];

      src.forEach((pin) => {
        L.circle(pin, {
          color: "blue",
          fillColor: "#0000ff",
          fillOpacity: 0.5,
          radius: 30,
        }).addTo(map);
      });
    }
  }, []);

  return (
    <UserLayout>
      <div className=" bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-[#05A8AA] mb-8">
          Welcome, {user?.username}
        </h1>
      </div>
      <hr />
      <h1>
        To DO: link weather location with travel sugestions. Use API de travel
        sugestion
      </h1>
      <section className="w-full mx-auto mt-2 bg-white p-6 rounded-lg shadow-md ">
        <h3>Your trips map!</h3>
        <div ref={mapContainerRef} className="h-[400px] w-full "></div>
      </section>
      <section className="w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        {/* <h3>Looking for a new destination?</h3> */}
        <TravelSugestions />
      </section>
      <section className="w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3>Find your accomodation easier with Booking!</h3>
      </section>
    </UserLayout>
  );
};

export default UserPage;
