import axios from "axios";
import { toast } from "react-toastify";

// Environment variables for server URLs
const jsonServerUrl = import.meta.env.VITE_JSON_SERVER_URL;
const expressServerUrl = import.meta.env.VITE_EXPRESS_SERVER_URL;

const api = axios.create({
  baseURL: jsonServerUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handling
const handleError = (error) => {
  console.error("API call error", error);
  toast.error("Something went wrong. Please try again.");
};

// Upload images to the Express server
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

// Create a new post (including image URLs)
export const createPost = async (postData) => {
  try {
    const response = await api.post(`${jsonServerUrl}/posts`, postData);
    toast.success("Post created successfully!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await api.get(`${jsonServerUrl}/posts`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch post by ID
export const fetchPostByID = async (postId) => {
  try {
    const response = await api.get(`${jsonServerUrl}/posts/${postId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch post by userId
export const fetchPostByUserID = async (userId) => {
  try {
    const response = await api.get(`${jsonServerUrl}/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update a post
export const updatePost = async (postId, updatedData) => {
  try {
    const response = await api.put(
      `${jsonServerUrl}/posts/${postId}`,
      updatedData
    );
    toast.success("Post updated successfully!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    await api.delete(`${jsonServerUrl}/posts/${postId}`);
    toast.success("Post deleted successfully!");
  } catch (error) {
    handleError(error);
  }
};

// Add a comment to post
export const addComment = async (postId, commentData) => {
  try {
    const response = await api.post(
      `${jsonServerUrl}/posts/${postId}/comments`,
      commentData
    );
    toast.success("Comment added successfully!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Like a post
export const likePost = async (postId, userId) => {
  try {
    const response = await api.post(`${jsonServerUrl}/posts/${postId}/likes`, {
      userId,
    });
    toast.success("Post liked!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Rate a post
export const ratePost = async (postId, ratingData) => {
  try {
    const response = await api.post(
      `${jsonServerUrl}/posts/${postId}/ratings`,
      ratingData
    );
    toast.success("Post rated!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/** ---------------------------------------GROUPS------------------------------------------------- */

// Fetch a single group by ID
export const fetchGroupById = async (groupId) => {
  try {
    const response = await api.get(`${jsonServerUrl}/groups/${groupId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch all groups
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
    // Fetch all groups
    const groupsResponse = await api.get(`${jsonServerUrl}/groups`);
    const userResponse = await api.get(`${jsonServerUrl}/users/${userId}`);

    const user = userResponse.data;

    if (!user) throw new Error("User not found");

    // Combine groups where user is a member or owner
    const userGroups = groupsResponse.data.filter(
      (group) =>
        group.ownerId === userId || // User owns the group
        (Array.isArray(group.members) && group.members.includes(userId)) // User is a member
    );

    return userGroups;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    throw error;
  }
};

// Create a group

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

    toast.success("Group created successfully!");
    return newGroup;
  } catch (error) {
    console.error("Error creating group:", error);
    toast.error("Failed to create the group.");
    throw error;
  }
};

// Edit a group
export const editGroup = async (groupId, updatedData) => {
  try {
    const response = await api.patch(
      `${jsonServerUrl}/groups/${groupId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing group:", error);
    throw error;
  }
};

// Delete group and update users
export const deleteGroupAndUpdateUsers = async (groupId) => {
  try {
    const usersResponse = await api.get(`${jsonServerUrl}/users`);
    const users = usersResponse.data;

    // Update users to remove the group ID from their `groupsMemberOf`
    const updatedUsers = users.map((user) => {
      if (user.groupsMemberOf?.includes(groupId)) {
        return {
          ...user,
          groupsMemberOf: user.groupsMemberOf.filter((id) => id !== groupId), // Remove group ID
        };
      }
      return user;
    });

    // Update each user on the server
    await Promise.all(
      updatedUsers.map((user) =>
        api.patch(`${jsonServerUrl}/users/${user.id}`, user)
      )
    );

    // Delete the group
    await api.delete(`${jsonServerUrl}/groups/${groupId}`);
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};

// Add a member to a group
export const addMemberToGroup = async (groupId, email) => {
  try {
    const userResponse = await api.get(`${jsonServerUrl}/users?email=${email}`);
    const user = userResponse.data[0];

    if (!user) throw new Error("User not found");

    // Add the group ID to the user's groupsMemberOf
    const updatedUser = {
      ...user,
      groupsMemberOf: [...new Set([...user.groupsMemberOf, groupId])], // Avoid duplicates
    };

    await api.patch(`${jsonServerUrl}/users/${user.id}`, updatedUser);

    // Fetch the group by ID
    const groupResponse = await api.get(`${jsonServerUrl}/groups/${groupId}`);
    const group = groupResponse.data;

    // Add the user ID to the group's members
    const updatedGroup = {
      ...group,
      members: [...new Set([...group.members, user.id])], // Avoid duplicates
    };

    await api.patch(`${jsonServerUrl}/groups/${groupId}`, updatedGroup);

    return { updatedUser, updatedGroup };
  } catch (error) {
    console.error("Error adding member to group:", error);
    throw error;
  }
};

// -----------------------------------Planning --------------------------------------------------

export const fetchPlanningByGroupID = async (groupId) => {
  try {
    const response = await axios.get(`${jsonServerUrl}/planning`);

    const groupPlans = response.data.filter((plan) => plan.groupId === groupId);

    return groupPlans;
  } catch (error) {
    console.error("Error fetching planning data:", error);
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${jsonServerUrl}/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    if (data && data.username) {
      return data;
    } else {
      console.error(`User with ID ${userId} does not have a username`);
      return { username: "Unknown User" };
    }
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return { username: "Error Fetching User" };
  }
};

export const saveGroupData = async (groupId, stepsData) => {
  try {
    // Prepare the payload for the entire trip plan
    const tripPayload = {
      groupId: groupId,
      steps: stepsData.map((step) => ({
        stepNumber: step.stepNumber,
        name: step.name,
        details: step.details,
        data: step.data || {}, // Populate the entered data for each step
        comments: step.comments || [],
      })),
      status: "in-progress",
    };
    console.log(tripPayload);
    // API call to save the trip planning data
    const response = await api.post(`${jsonServerUrl}/planning`, tripPayload);

    toast.success("Trip planning data saved successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to save trip planning data.");
    console.error("Error saving trip planning data:", error);
    throw error;
  }
};

export default api;
