import { useState } from "react";
import {
  addMemberToGroup,
  editGroup,
  deleteGroupAndUpdateUsers,
} from "../../utils/api";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const GroupsList = ({ group, onUpdate, userId }) => {
  // State pentru modalele de invitare si editare
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State pentru valorile editarii unui grup
  const [editValues, setEditValues] = useState({
    name: group.name,
    description: group.description,
  });

  // Form handling pentru functionalitatea de invitare
  const {
    values: inviteValues,
    handleChange: handleInviteChange,
    resetForm: resetInviteForm,
  } = useForm({
    email: "",
  });

  // Verificam daca utilizatorul curent este proprietarul grupului
  const isOwner = group.ownerId === userId;

  // Functie pentru inchiderea modalelor
  const closeModal = (setModalState) => () => setModalState(false);

  // Functie pentru gestionarea invitarii unui membru in grup
  const handleInviteMember = async (e) => {
    e.preventDefault();
    try {
      if (group.id) {
        await addMemberToGroup(group.id, inviteValues.email); // Apel API pentru adaugarea unui membru
        toast.success("Member added successfully!");
        onUpdate(); // Actualizam lista grupurilor
      }
      resetInviteForm(); // Resetam formularul
      closeModal(setIsInviteModalOpen)(); // Inchidem modalul
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error(
        error.message === "User not found"
          ? "User with this email not found."
          : "Failed to invite member."
      );
    }
  };

  // Functie pentru gestionarea editarii unui grup
  const handleEditGroup = async (e) => {
    e.preventDefault();
    try {
      await editGroup(group.id, editValues); // Apel API pentru editarea unui grup
      toast.success("Group updated successfully!");
      onUpdate(); // Actualizam lista grupurilor
      closeModal(setIsEditModalOpen)(); // Inchidem modalul
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Failed to update group.");
    }
  };

  // Functie pentru stergerea unui grup
  const handleDeleteGroup = async () => {
    // Prompt pentru confirmarea userului
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (!isConfirmed) {
      return; // Daca userul anuleaza iesim din functie
    }

    try {
      await deleteGroupAndUpdateUsers(group.id); // API call pentru stergerea grupului
      toast.success("Group deleted successfully!");
      onUpdate(); // Actualizam lista grupurilor
      closeModal(setIsEditModalOpen)(); // Inchidem modalul
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error("Failed to delete group.");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Link
        to={`/user/group/${group.id}`}
        className="text-blue-500 hover:underline"
      >
        <h2 className="text-3xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200 cursor-pointer ">
          {group.name}
          {isOwner && (
            <span className="text-red-500 ml-2 font-light text-xs text-center">
              (Owner)
            </span>
          )}
        </h2>
      </Link>
      <p className="text-gray-600">{group.description}</p>

      {isOwner && (
        <div className="mt-2 flex space-x-4">
          {/* Buton pentru invitarea membrilor */}
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="text-green-500 hover:underline"
          >
            Invite Members
          </button>
          {/* Buton pentru editarea grupului */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-yellow-500 hover:underline"
          >
            Edit Group
          </button>
        </div>
      )}

      {/* Modal pentru invitarea membrilor */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={closeModal(setIsInviteModalOpen)}
        title="Invite Members"
      >
        <form onSubmit={handleInviteMember}>
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={inviteValues.email}
            onChange={handleInviteChange}
            placeholder="Enter email address"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white rounded-lg mt-4"
          >
            Send Invitation
          </button>
        </form>
      </Modal>

      {/* Modal pentru editarea grupului */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeModal(setIsEditModalOpen)}
        title="Edit Group"
      >
        <form onSubmit={handleEditGroup}>
          <InputField
            label="Group Name"
            type="text"
            name="name"
            value={editValues.name}
            onChange={(e) =>
              setEditValues((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Group Name"
          />
          <InputField
            label="Group Description"
            type="textarea"
            name="description"
            value={editValues.description}
            onChange={(e) =>
              setEditValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Group Description"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDeleteGroup}
              className="py-2 px-4 bg-red-500 text-white rounded-lg"
            >
              Delete Group
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GroupsList;
