import { useEffect, useState } from "react";
import { fetchPostByUserID } from "../../utils/api";
import TripPost from "../../components/Trips/TripPost";
import { useAuth } from "../../context/AuthContext";
import UserLayout from "../../layouts/UserLayout";
import AddNewPost from "../../components/Trips/AddNewPost";
import Modal from "../../components/Modal";
import Select from "react-select";

const UserTripPostsPage = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (user?.id) {
        try {
          const posts = await fetchPostByUserID(user.id);
          setUserPosts(posts);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      }
    };

    if (user) {
      loadUserPosts();
    }
  }, [user]);

  const handlePostCreated = (newPost) => {
    console.log("New post created:", newPost);
    setUserPosts((prevPosts) => [...prevPosts, newPost]);
    setIsModalOpen(false);
  };

  const sortingOptions = [
    { value: "name-asc", label: "Name Asc" },
    { value: "name-desc", label: "Name Desc" },
  ];

  const setSelectedOption = (selectedOption) => {
    console.log(selectedOption);
    console.log("User Posts", userPosts);

    // cream o clona a state-ului de userPosts pentru a evita direct mutation
    let sortedUserPosts = [...userPosts].sort((a, b) => {
      const selectedSort = selectedOption.value;
      if (selectedSort === "name-asc") {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      } else if (selectedSort === "name-desc") {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      }
    });

    setUserPosts(sortedUserPosts);
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-100 ">
        <section className="bg-white p-6 rounded-lg shadow-md w-11/12 mx-auto mt-10">
          <div className="flex items-center justify-between w-full mb-4">
            <h2 className="text-2xl font-bold text-[#DC602E] mb-6">
              Explore Your Trips
            </h2>

            <div className="flex items-center space-x-4 ml-auto">
              <button
                className="bg-[#05A8AA] hover:bg-[#048f91] text-white font-semibold py-2 px-4 mb-8 rounded-lg shadow-md transition duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                + Add New Trip
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mb-4">
            <Select
              options={sortingOptions}
              placeholder="Sort By"
              onChange={setSelectedOption}
            />
          </div>
          {userPosts.length === 0 ? (
            <p className="text-gray-600">No trips available.</p>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {userPosts.map((post) => (
                <TripPost
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  images={post.images}
                />
              ))}
            </div>
          )}
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddNewPost userId={user?.id} onPostCreated={handlePostCreated} />
        </Modal>
      </div>
    </UserLayout>
  );
};

export default UserTripPostsPage;
