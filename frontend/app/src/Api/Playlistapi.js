import axios from "axios";


const BASE_URL = "http://localhost:8000/api/v1/playlists";

export const createPlaylists = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/create-playlist`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("create-playlist", response.data);
    return response;
  } catch (err) {
    console.log("Playlist creation failed", err);
     throw err;
  }
};
export const addVideoToPlayList = async (playlistId, videoIds) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/add/${playlistId}`,
      { videoIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("create-playlist", response.data);
    return response;
  } catch (err) {
    console.log("Playlist creation failed", err);
     throw err;
  }
};
export const getPlaylistByUserId = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/user-playlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("cplaylist of user", response.data);
    return response;
  } catch (err) {
    console.log("playlist upload by user", err);
     throw err;
  }
};

export const getPlaylistByUsingUserId = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/user-playlist/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("playlist fetch by user id", response.data);
    return response;
  } catch (err) {
    console.log("playlist upload by user", err);
     throw err;
  }
};
export const getAllPlaylist = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/user-playlist/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("playlist fetch by user id", response.data);
    return response;
  } catch (err) {
    console.log("playlist upload by user", err);
     throw err;
  }
};

export const getPlaylistByPlaylistId = async (playlistId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/playlist-video/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("playlist of playlist by id ", response.data);
    return response;
  } catch (err) {
    console.log("playlist by id failed", err);
     throw err;
  }
};
export const getAllPlaylists = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/all-playlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("playlist all video ", response.data);
    return response;
  } catch (err) {
    console.log("playlist upload by user", err);
     throw err;
  }
};
export const deletePlaylist = async (playlistId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${BASE_URL}/playlist-delete/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("delete playlist ", response.data);
    return response;
  } catch (err) {
    console.log("playlist deleted failed", err);
     throw err;
  }
};
export const editPlaylist = async (userdata, playlistId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/playlist-edit/${playlistId}`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("edit playslist successfully ", response.data);
    return response;
  } catch (err) {
    console.log("playlist upload by user", err);
     throw err;
  }
};

export const deleteVideoFromPlaylist = async (playlistId, videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${BASE_URL}/delete/${playlistId}/video/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("delete video to playlist ", response.data);
    return response;
  } catch (err) {
    console.log("playlist deleted failed", err);
     throw err;
  }
};
