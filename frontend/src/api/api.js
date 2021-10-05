import axios from 'axios';

const fetchNotes = async userInfo => {
  const config = {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  };
  const { data } = await axios.get('/api/notes', config);
  return data;
};

const addNote = async (userInfo, title, content, category) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { data } = await axios.post(
    `/api/notes/create`,
    { title, content, category },
    config,
  );

  return data;
};

const updateNote = async (userInfo, id, title, content, category) => {
  //
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { data } = await axios.put(
    `/api/notes/${id}`,
    { title, content, category },
    config,
  );

  return data;
};

const removeNote = async (userInfo, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { data } = await axios.delete(`/api/notes/${id}`, config);

  return data;
};

export default {
  fetchNotes,
  addNote,
  updateNote,
  removeNote,
};
