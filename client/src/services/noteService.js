import API from "./api";

export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

export const getNoteById = async (id) => {
  const res = await API.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data) => {
  const res = await API.post("/notes", data);
  return res.data;
};

export const updateNote = async (id, data) => {
  const res = await API.put(`/notes/${id}`, data);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};

export const searchNotes = async (query) => {
  const res = await API.get(`/notes/search?q=${encodeURIComponent(query)}`);
  return res.data;
};

export const addCollaborator = async (id, email) => {
  const res = await API.post(`/notes/${id}/add-collaborator`, { email });
  return res.data;
};

export const removeCollaborator = async (id, userId) => {
  const res = await API.delete(`/notes/${id}/remove-collaborator`, {
    data: { userId },
  });
  return res.data;
};