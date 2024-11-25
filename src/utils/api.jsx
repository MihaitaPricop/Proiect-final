import axios from "axios";
import { toast } from "react-toastify";

// Variabile de mediu pentru URL-urile serverului
const jsonServerUrl = import.meta.env.VITE_JSON_SERVER_URL;
const expressServerUrl = import.meta.env.VITE_EXPRESS_SERVER_URL;

const api = axios.create({
  baseURL: jsonServerUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gestionarea erorilor
const handleError = (error) => {
  console.error("Eroare la apelul API", error);
  toast.error("Ceva nu a mers bine. Vă rugăm să încercați din nou.");
};

// Încărcăm imagini pe serverul Express
export const uploadImages = async (images) => {
  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));

  try {
    const response = await axios.post(`${expressServerUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.filePaths;
  } catch (error) {
    handleError(error);
  }
};

// Creăm un post nou (inclusiv URL-uri pentru imagini)
export const createPost = async (postData) => {
  try {
    const response = await api.post(`${jsonServerUrl}/posts`, postData);
    toast.success("Postare creată cu succes!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Obținem toate postările
export const fetchPosts = async () => {
  try {
    const response = await api.get(`${jsonServerUrl}/posts`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Obținem postare după ID
export const fetchPostByID = async (postId) => {
  try {
    const response = await api.get(`${jsonServerUrl}/posts/${postId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Obținem postare după userId
export const fetchPostByUserID = async (userId) => {
  try {
    const response = await api.get(`${jsonServerUrl}/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Actualizăm o postare
export const updatePost = async (postId, updatedData) => {
  try {
    const response = await api.put(
      `${jsonServerUrl}/posts/${postId}`,
      updatedData
    );
    toast.success("Postare actualizată cu succes!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Ștergem o postare
export const deletePost = async (postId) => {
  try {
    await api.delete(`${jsonServerUrl}/posts/${postId}`);
    toast.success("Postare ștearsă cu succes!");
  } catch (error) {
    handleError(error);
  }
};

// Adăugăm un comentariu la postare
export const addComment = async (postId, commentData) => {
  try {
    const response = await api.post(
      `${jsonServerUrl}/posts/${postId}/comments`,
      commentData
    );
    toast.success("Comentariu adăugat cu succes!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Apreciem o postare
export const likePost = async (postId, userId) => {
  try {
    const response = await api.post(`${jsonServerUrl}/posts/${postId}/likes`, {
      userId,
    });
    toast.success("Postare apreciată!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Evaluăm o postare
export const ratePost = async (postId, ratingData) => {
  try {
    const response = await api.post(
      `${jsonServerUrl}/posts/${postId}/ratings`,
      ratingData
    );
    toast.success("Postare evaluată!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/** ---------------------------------------GRUPURI------------------------------------------------- */

// Obținem un grup după ID
export const fetchGroupById = async (groupId) => {
  try {
    const response = await api.get(`${jsonServerUrl}/groups/${groupId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Obținem toate grupurile
export const fetchGroups = async () => {
  try {
    const response = await api.get(`${jsonServerUrl}/groups`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchGroupsForUser = async (userId) => {
  try {
    // Obținem toate grupurile
    const groupsResponse = await api.get(`${jsonServerUrl}/groups`);
    const userResponse = await api.get(`${jsonServerUrl}/users/${userId}`);

    const user = userResponse.data;

    if (!user) throw new Error("Utilizatorul nu a fost găsit");

    // Combinăm grupurile unde utilizatorul este membru sau proprietar
    const userGroups = groupsResponse.data.filter(
      (group) =>
        group.ownerId === userId || // Utilizatorul deține grupul
        (Array.isArray(group.members) && group.members.includes(userId)) // Utilizatorul este membru
    );

    return userGroups;
  } catch (error) {
    console.error("Eroare la obținerea grupurilor utilizatorului:", error);
    throw error;
  }
};

// Creăm un grup

export const createGroup = async (groupData, userId) => {
  try {
    const groupPayload = {
      ...groupData,
      ownerId: userId,
      members: [userId],
      posts: [],
      createdAt: new Date().toISOString(),
    };

    const groupResponse = await api.post("/groups", groupPayload);
    const newGroup = groupResponse.data;

    const userResponse = await api.get(`/users/${userId}`);
    const user = userResponse.data;
    console.log(user);
    const updatedUser = {
      ...user,
      groupsOwned: user.groupsOwned.includes(newGroup.id)
        ? user.groupsOwned
        : [...user.groupsOwned, newGroup.id],
      groupsMemberOf: user.groupsMemberOf.includes(newGroup.id)
        ? user.groupsMemberOf
        : [...user.groupsMemberOf, newGroup.id],
    };

    await api.patch(`/users/${userId}`, updatedUser);

    toast.success("Grup creat cu succes!");
    return newGroup;
  } catch (error) {
    console.error("Eroare la crearea grupului:", error);
    toast.error("Eșec la crearea grupului.");
    throw error;
  }
};

// Edităm un grup
export const editGroup = async (groupId, updatedData) => {
  try {
    const response = await api.patch(
      `${jsonServerUrl}/groups/${groupId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Eroare la editarea grupului:", error);
    throw error;
  }
};

// Stergem grupul si facem update la utilizatori
export const deleteGroupAndUpdateUsers = async (groupId) => {
  try {
    const usersResponse = await api.get(`${jsonServerUrl}/users`);
    const users = usersResponse.data;

    // Actualizăm utilizatorii pentru a elimina ID-ul grupului din `groupsMemberOf`
    const updatedUsers = users.map((user) => {
      if (user.groupsMemberOf?.includes(groupId)) {
        return {
          ...user,
          groupsMemberOf: user.groupsMemberOf.filter((id) => id !== groupId), // Eliminăm ID-ul grupului
        };
      }
      return user;
    });

    // Actualizăm fiecare utilizator pe server
    await Promise.all(
      updatedUsers.map((user) =>
        api.patch(`${jsonServerUrl}/users/${user.id}`, user)
      )
    );

    // Ștergem grupul
    await api.delete(`${jsonServerUrl}/groups/${groupId}`);
  } catch (error) {
    console.error("Eroare la ștergerea grupului:", error);
    throw error;
  }
};

// Adaugam membru nou in grup
export const addMemberToGroup = async (groupId, email) => {
  try {
    const userResponse = await api.get(`${jsonServerUrl}/users?email=${email}`);
    const user = userResponse.data[0];

    if (!user) throw new Error("Utilizatorul nu a fost găsit");

    // adaugam group ID la groupsMemberOf
    const updatedUser = {
      ...user,
      groupsMemberOf: [...new Set([...user.groupsMemberOf, groupId])], // evitam duplicate
    };

    await api.patch(`${jsonServerUrl}/users/${user.id}`, updatedUser);

    const groupResponse = await api.get(`${jsonServerUrl}/groups/${groupId}`);
    const group = groupResponse.data;

    // Adaugam user ID ul now la membrii grupului
    const updatedGroup = {
      ...group,
      members: [...new Set([...group.members, user.id])], // Evităm duplicate
    };

    await api.patch(`${jsonServerUrl}/groups/${groupId}`, updatedGroup);

    return { updatedUser, updatedGroup };
  } catch (error) {
    console.error("Eroare la adăugarea membrului în grup:", error);
  }
};

// -----------------------------------Planificare --------------------------------------------------

export const fetchPlanningByGroupID = async (groupId) => {
  try {
    const response = await axios.get(`${jsonServerUrl}/planning`);

    const groupPlans = response.data.filter((plan) => plan.groupId === groupId);

    return groupPlans;
  } catch (error) {
    console.error("Eroare la obținerea datelor de planificare:", error);
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${jsonServerUrl}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Eșec la obținerea datelor utilizatorului");
    }
    const data = await response.json();
    if (data && data.username) {
      return data;
    } else {
      console.error(`Utilizatorul cu ID-ul ${userId} nu are un username`);
      return { username: "Utilizator Necunoscut" };
    }
  } catch (error) {
    console.error(
      `Eroare la obținerea utilizatorului cu ID-ul ${userId}:`,
      error
    );
    return { username: "Eroare la obținerea utilizatorului" };
  }
};

export const saveGroupData = async (groupId, stepsData) => {
  try {
    // Date pentru planul întreg
    const tripPayload = {
      groupId: groupId,
      steps: stepsData.map((step) => ({
        stepNumber: step.stepNumber,
        name: step.name,
        details: step.details,
        data: step.data || {}, // Se populează pentru fiecare pas
        comments: step.comments || [],
      })),
      status: "în progres",
    };
    console.log(tripPayload);
    // API pentru salvarea datelor despre planificare
    const response = await api.post(`${jsonServerUrl}/planning`, tripPayload);

    toast.success("Datele planificării au fost salvate cu succes!");
    return response.data;
  } catch (error) {
    toast.error("Eroare la salvarea datelor planificării.");
    console.error("Eroare la salvarea datelor planificării:", error);
    throw error;
  }
};

export default api;
