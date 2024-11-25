import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const onGetStarted = () => {
    navigate("/about");
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://media.cntraveler.com/photos/63a4a9b5484f5d86dc05c9cc/master/w_1600%2Cc_limit/Highline%2520Trail%2C%2520Montana_GettyImages-1283964579.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
      </div>

      <section className="relative flex justify-center items-center h-screen text-center text-white px-6">
        <div className="z-10 flex flex-col items-center max-w-screen-lg gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            We create great memories that will last forever!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-lg">
            Welcome to our website! Explore the beauty of the world and nature
            with friends.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
