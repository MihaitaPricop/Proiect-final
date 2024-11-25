const TravelSugestions = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Explore Destinations</h2>
      <p className="text-lg max-w-2xl mx-auto mb-12">
        Discover these beautiful destinations in Romania, perfect for your next
        adventure.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {/* Recommendation 1: The Majestic Carpathian Mountains */}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h2 className="card-title text-2xl font-semibold mb-4">
              The Majestic Carpathian Mountains, Romania
            </h2>
            <p className="text-base text-justify leading-relaxed">
              For Romanians seeking an escape into nature, the Carpathian
              Mountains offer an incredible adventure right in the heart of the
              country. Known for their dramatic peaks, lush valleys, and rich
              wildlife, these mountains are perfect for hiking, skiing, or
              simply taking in breathtaking views.
            </p>
          </div>
          <figure>
            <img
              src="/images/carpati1.jpg"
              alt="Carpathian Mountains 1"
              className="w-full h-48 object-cover rounded-lg"
            />
          </figure>
        </div>

        {/* Recommendation 2: The Historic Town of Sibiu */}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h2 className="card-title text-2xl font-semibold mb-4">
              The Historic Town of Sibiu, Romania
            </h2>
            <p className="text-base text-justify leading-relaxed">
              Sibiu, often considered one of the most beautiful cities in
              Romania, is a perfect blend of medieval charm and modern-day
              culture. Located in the heart of Transylvania, the city boasts
              cobblestone streets, colorful buildings, and impressive
              architecture.
            </p>
          </div>
          <figure>
            <img
              src="/images/sibiu1.jpg"
              alt="Sibiu 1"
              className="w-full h-48 object-cover rounded-lg"
            />
          </figure>
        </div>

        {/* Recommendation 3: The Enchanting Danube Delta */}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h2 className="card-title text-2xl font-semibold mb-4">
              The Enchanting Danube Delta, Romania
            </h2>
            <p className="text-base text-justify leading-relaxed">
              For those in search of tranquility and unspoiled nature, the
              Danube Delta is a hidden gem located in Romania’s southeast. A
              UNESCO World Heritage site, this vast wetland is one of Europe’s
              most biodiverse regions, home to hundreds of species of birds,
              including pelicans and eagles.
            </p>
          </div>
          <figure>
            <img
              src="/images/delta1.jpg"
              alt="Danube Delta 1"
              className="w-full h-48 object-cover rounded-lg"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default TravelSugestions;
