import useForm from "../../hooks/useForm";
import { useState } from "react";
import { createPost, uploadImages } from "../../utils/api";

const AddNewPost = ({ userId, onPostCreated }) => {
  const { values, handleChange, resetForm } = useForm({
    title: "",
    description: "",
    destination: "",
  });
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TO DO validare valori
    // for (const key in values) {
    //   const val = values[key];
    //   console.log(key, val);
    // }
    //TO DO validare valori
    try {
      let imagePaths = [];
      if (images.length > 0) {
        imagePaths = await uploadImages(images);
      }

      const newPost = {
        ...values,
        userId,
        images: imagePaths,
        datePosted: new Date().toISOString(),
      };

      const savedPost = await createPost(newPost);
      onPostCreated(savedPost);

      resetForm();
      setImages([]);
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-[#05A8AA] mb-4">
        Create a New Trip Post
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Trip Title*
          </label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A8AA]"
            placeholder="Enter trip title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A8AA]"
            placeholder="Describe your experience"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destination*
          </label>
          <input
            type="text"
            name="destination"
            value={values.destination}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A8AA]"
            placeholder="Enter destination"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Photos
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <p>*Required fields</p>
        <button
          type="submit"
          className="w-full py-2 bg-[#05A8AA] text-white font-semibold rounded-lg hover:bg-[#028c8e] transition duration-300"
        >
          Post Your Trip
        </button>
      </form>
    </section>
  );
};

export default AddNewPost;
