import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutPage = () => (
  <>
    <Navbar />
    <div className="text-gray-800">
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://media.cntraveler.com/photos/63a4a9b5484f5d86dc05c9cc/master/w_1600%2Cc_limit/Highline%2520Trail%2C%2520Montana_GettyImages-1283964579.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Bringing friends together through unforgettable travel experiences.
            We believe that every journey is a story worth telling.
          </p>
        </div>
      </section>

      <section className="py-12 bg-green-50 text-center px-8">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Our mission is to make it easy for friends to plan, share, and cherish
          their adventures together, fostering connections through shared travel
          experiences.
        </p>
      </section>

      <section className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">What You Can Do</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-screen-lg mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <div className="h-40 w-full bg-green-100 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://thumbs.dreamstime.com/b/client-customer-journey-icon-vector-eps-file-easy-to-edit-337399248.jpg"
                alt="Share Your Journey"
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold my-4 text-green-600">
              Share Your Journey
            </h3>
            <p className="text-gray-700">
              Capture every moment and share your travel experiences with
              friends, fostering a community built on shared memories and
              adventures.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <div className="h-40 w-full bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://www.shutterstock.com/image-vector/logistics-optimization-icon-on-white-260nw-2071804025.jpg"
                alt="Plan Adventures Together"
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold my-4 text-blue-600">
              Seamless Trip Planning
            </h3>
            <p className="text-gray-700">
              Plan your travels effortlessly with friends. Organize itineraries,
              coordinate schedules, and enjoy a stress-free planning experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
            <div className="h-40 w-full bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDgEJs1rhlkwXr7ql14U6HK1Pwl34S8_NhsgqkV4uQj3puXiEhiYdt9W-W91to5DqV0pg&usqp=CAU"
                alt="Stay Connected"
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold my-4 text-yellow-600">
              Engage and Connect
            </h3>
            <p className="text-gray-700">
              Stay connected with a community of fellow travelers, sharing
              advice, inspiration, and experiences across the globe.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-8 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Explore Destinations</h2>
        <p className="text-lg max-w-2xl mx-auto mb-12">
          Our platform empowers groups to plan trips together, allowing each
          member to contribute their own experiences and insights. Create a
          shared adventure where everyone can inspire and connect through their
          personal journeys and memories.
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-200115-618833.jpg&fm=jpg"
              alt="Mountains"
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-white">Mountains</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://worldwildschooling.com/wp-content/uploads/2024/01/12-Exotic-Beaches_Navagio-Zakynthos-Greece_evannovostro_Adobe-Stock-Photo_122264479-1024x576.jpg"
              alt="Beach"
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-white">Beach</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://assets.voxcity.com/uploads/blog_images/Iconic%20Landmarks%20in%20Rome_original.jpg"
              alt="City"
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-white">City</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://www.montanahikes.com/wp-content/uploads/2022/02/Gallatin-Petrified-forest-main.jpg"
              alt="Forest"
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-white">Forest</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to Start Your Journey?
        </h2>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full transition duration-300"
        >
          Join Us Today
        </Link>
      </section>
    </div>
    <Footer />
  </>
);

export default AboutPage;
