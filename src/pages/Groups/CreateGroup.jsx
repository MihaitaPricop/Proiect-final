import { useState } from "react";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import useForm from "../../hooks/useForm";
import { createGroup, fetchGroupsForUser } from "../../utils/api";
import { toast } from "react-toastify";

const CreateGroup = ({ onGroupCreated, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State pentru modal-ul de creare grup

  const { values, handleChange, resetForm } = useForm({
    name: "",
    description: "",
  });

  // Functia pentru crearea grupului
  const handleCreateGroup = async (e) => {
    e.preventDefault(); // Prevenim comportamentul default al formularului
    const existingGroups = await fetchGroupsForUser(userId);
    console.log(existingGroups, values);
    const matchedGroup = existingGroups.filter(
      (group) => group.name === values.name
    ).length;
    if (matchedGroup) {
      alert("A group with the same name already exists!");
      return;
    }

    try {
      const newGroup = await createGroup(values, userId); // Apelam API-ul pentru crearea grupului
      onGroupCreated(newGroup); // Notificam componenta parinte despre grupul nou

      resetForm(); // Resetam formularul
      setIsModalOpen(false); // Inchidem modal-ul
      toast.success("Group created successfully!");
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create the group.");
    }
  };

  return (
    <>
      {/* Buton pentru deschiderea modal-ului */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#05A8AA] hover:bg-[#048f91] text-white font-semibold py-2 px-4 mb-8 rounded-lg shadow-md transition duration-300"
      >
        + Create Group
      </button>

      {/* Modal pentru crearea grupului */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Create a New Group</h2>
        <form onSubmit={handleCreateGroup}>
          {/* Input pentru numele grupului */}
          <InputField
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Group Name"
          />
          {/* Input pentru descrierea grupului */}
          <InputField
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Description"
            type="textarea"
          />
          {/* Buton pentru trimiterea formularului */}
          <button
            type="submit"
            className="w-full py-2 bg-[#05A8AA] text-white font-semibold rounded-lg hover:bg-[#028c8e] transition duration-300"
          >
            Create Group
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateGroup;
