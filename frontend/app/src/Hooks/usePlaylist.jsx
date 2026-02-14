import { useState,useEffect } from "react";
import { getAllPlaylists } from "../Api/Playlistapi";
export const usePlaylist = () => {
  const [allPlaylist, setallPlaylist] = useState([]);
  const getAllPlaylist = async () => {
    const result = await getAllPlaylists();
    setallPlaylist(result.data.data.sortedPlaylists);
    console.log("playlist of dts", result.data.data);
  };
  useEffect(() => {
    getAllPlaylist();
  }, []);
  return { allPlaylist, setallPlaylist, getAllPlaylist };
};
