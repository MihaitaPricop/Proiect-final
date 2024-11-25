import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserLayout from "../../layouts/UserLayout";
import { fetchGroupById, saveGroupData } from "../../utils/api";

const PlanGroupTripPage = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [stepsData, setStepsData] = useState(
    Array(8).fill({
      comments: [],
      input: "",
      newComment: "",
    })
  );
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await fetchGroupById(groupId);
        setGroup(data);

        if (user && data.ownerId === user.id) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId, user]);

  if (!group) {
    return <p>Loading...</p>;
  }

  const steps = [
    {
      id: 1,
      title: "Pick a Destination",
      inputPlaceholder: "Enter destination...",
    },
    {
      id: 2,
      title: "Set Dates",
      inputPlaceholder: "Enter start and end dates...",
    },
    {
      id: 3,
      title: "Set a Budget",
      inputPlaceholder: "Enter budget amount...",
    },
    {
      id: 4,
      title: "Book Accommodation",
      inputPlaceholder: "Enter accommodation details...",
    },
    {
      id: 5,
      title: "Arrange Transport",
      inputPlaceholder: "Enter transport details...",
    },
    {
      id: 6,
      title: "Plan Key Activities",
      inputPlaceholder: "Enter key activities...",
    },
    {
      id: 7,
      title: "Prepare & Pack",
      inputPlaceholder: "Enter packing notes...",
    },
    { id: 8, title: "Review and Save" },
  ];

  const handleInputChange = (stepId, value) => {
    setStepsData((prev) =>
      prev.map((step, index) =>
        index === stepId - 1 ? { ...step, input: value } : step
      )
    );
  };

  const handleCommentChange = (stepId, value) => {
    setStepsData((prev) =>
      prev.map((step, index) =>
        index === stepId - 1 ? { ...step, newComment: value } : step
      )
    );
  };

  const handleAddComment = (stepId) => {
    setStepsData((prev) =>
      prev.map((step, index) => {
        if (index === stepId - 1 && step.newComment.trim()) {
          return {
            ...step,
            comments: [...step.comments, step.newComment],
            newComment: "",
          };
        }
        return step;
      })
    );
  };

  const handleSaveAll = async () => {
    const formattedData = steps.map((step, index) => ({
      stepNumber: step.id,
      name: step.title,
      details: step.inputPlaceholder || "",
      data: { input: stepsData[index].input },
      comments: stepsData[index].comments,
    }));

    try {
      await saveGroupData(groupId, formattedData);
    } catch (error) {
      console.error("Failed to save trip data:", error);
    }
  };

  return (
    <UserLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
        <p>{group.description}</p>
      </div>

      <section className="text-gray-700 body-font">
        <div className="container px-5 py-12 mx-auto flex flex-wrap">
          <div className="flex w-full text-center justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex-grow text-center cursor-pointer"
                onClick={() => setActiveStep(step.id)}
              >
                <div
                  className={`h-10 w-10 rounded-full ${
                    activeStep === step.id ? "bg-[#028C8E]" : "bg-[#05A8AA]"
                  } inline-flex items-center justify-center text-white mx-2`}
                >
                  <span className="font-bold text-sm">{step.id}</span>
                </div>
                <h2
                  className={`font-medium title-font text-lg mt-2 ${
                    activeStep === step.id ? "text-[#028C8E]" : "text-gray-600"
                  }`}
                >
                  {step.title}
                </h2>
              </div>
            ))}
          </div>

          <div className="w-full mt-8">
            {steps
              .filter((step) => step.id === activeStep)
              .map((step) => (
                <div key={step.id} className="pl-6">
                  {step.id < 8 ? (
                    <>
                      <input
                        type="text"
                        placeholder={step.inputPlaceholder}
                        className="border p-2 w-full mt-4"
                        value={stepsData[step.id - 1].input}
                        onChange={(e) =>
                          handleInputChange(step.id, e.target.value)
                        }
                      />
                      <textarea
                        placeholder="Add a comment..."
                        className="border p-2 w-full mt-4"
                        value={stepsData[step.id - 1].newComment}
                        onChange={(e) =>
                          handleCommentChange(step.id, e.target.value)
                        }
                      ></textarea>
                      <button
                        onClick={() => handleAddComment(step.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
                      >
                        Add Comment
                      </button>
                      <ul className="mt-4">
                        {stepsData[step.id - 1].comments.map((comment, idx) => (
                          <li key={idx} className="text-gray-700">
                            - {comment}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold">Review:</h3>
                      {stepsData.map((data, index) => (
                        <div key={index} className="mt-4">
                          <h4 className="font-bold">
                            Step {index + 1}: {steps[index].title}
                          </h4>
                          <p className="text-gray-600">{data.input}</p>
                          <ul>
                            {data.comments.map((comment, idx) => (
                              <li key={idx} className="text-gray-700">
                                - {comment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <button
                        onClick={handleSaveAll}
                        className="px-4 py-2 bg-green-500 text-white rounded mt-6"
                      >
                        Save
                      </button>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default PlanGroupTripPage;
