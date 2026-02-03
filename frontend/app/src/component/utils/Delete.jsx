import { useContext } from "react";
import { getDB } from "../../../../../src/utils/indexdb";
import { AppContext } from "./contextApi";

useContext;
const Delete = ({ videoId,setDownloads }) => {

  const handleDelete = async () => {
    const db = await getDB();

    // Ensure videoId is a string
    typeof videoId === "object" ? true : false;
    const key = typeof videoId === "object" ? videoId._id : videoId;
    if (!key) {
      console.error("Invalid key for delete:", videoId);
      return;
    }

    await db.delete("files", key);

    const saved = JSON.parse(localStorage.getItem("downloads")) || [];
    const updated = saved.filter((s) => s._id !== key);

    localStorage.setItem("downloads", JSON.stringify(updated));
    setDownloads(updated);
  };

  return <button onClick={handleDelete}>delete</button>;
};
export default Delete;
