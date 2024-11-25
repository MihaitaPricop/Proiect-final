import { createGroup } from "../../utils/api";
import Modal from "../../components/Modal";
import useForm from "../../utils/useForm";
import InputField from "../../components/InputField";

const CreateGroupModal = ({ isOpen, onClose, onGroupCreated }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGroup = await createGroup(values);
      onGroupCreated(newGroup);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Create a New Group</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Group Name"
        />
        <InputField
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Description"
          type="textarea"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Create Group
        </button>
      </form>
    </Modal>
  );
};

export default CreateGroupModal;
