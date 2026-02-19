// import React from "react";
import { useForm } from "react-hook-form";
import { addVideoToPlayList } from "../../../Api/Playlistapi.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/contextApi.js";
import { Navigate } from "react-router-dom";
import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import Heading from "../../utils/form/Heading.jsx";
const AddPlaylist = () => {
  const { playlistId } = useParams();
  const { video, onHandleVideo, user } = useContext(AppContext);
  const location = useLocation();
  const { playlist } = location.state || {};
  const {
    register: registerPlaylistVideo,
    handleSubmit: handlePlaylistVideoSubmit,
    formState: { errors, isSubmitting: issubmittingPlaylistVideo },
  } = useForm();
  const navigate = useNavigate();
  const handleclick = async () => {
    await onHandleVideo();
  };
  const [isOpen, setIsOpen] = useState(null);
  const [Open, setOpen] = useState(null);
  const [preview, setPreview] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [length, setlength] = useState(false);
  useEffect(() => {
    setPreview([]);
    setPrevData(
      playlist?.videos?.map((p) => ({
        thumbnail: p.thumbnail,
        title: p.title,
      })),
    );
  }, [playlist]);

  const onSubmit = async (data) => {
    try {
      const result = await addVideoToPlayList(playlistId, data.videoId);
      console.log("add video to playlist", result);
      if (result.data.success === true) {
        navigate(`/playlist/${result.data.data._id}`);
      }
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <form
        onSubmit={handlePlaylistVideoSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-2/3   space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add Video to Playlist
        </h2>

        {prevData && preview?.length > 0 && (
          <>
            <Heading label="Your Playlist Collection" />
            <div
              className="overflow-x-auto whitespace-nowrap scroll-smooth [&::-webkit-scrollbar]:hidden flex gap-4 bg-gradient-to-r from-gray-100 via-white to-blue-50 rounded-xl mx-5 p-4 shadow-md  "
              onMouseLeave={() => setIsOpen(null)}
            >
              {preview.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-36 p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-blue-100 transition-all duration-300 cursor-pointer"
                  onClick={() => setIsOpen(index)}
                >
                  <img
                    src={item.thumbnail}
                    alt="Current thumbnail"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-300 hover:border-blue-500 transition   "
                  />
                  <p
                    className={`mt-2 text-[11px] text-gray-700 text-center w-28 truncate ${
                      isOpen === index
                        ? "whitespace-normal line-clamp-none"
                        : "line-clamp-1"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Select Video */}
        <div>
          <label
            htmlFor="videoId"
            className="block text-gray-700 font-medium mb-2"
          ></label>

          {length && (
            <h1 className="text-lg font-semibold text-gray-700  ml-5 mb-1">
              Recently Added
            </h1>
          )}
          {prevData?.length !== 0 && (
            <>
              <div
                className=" overflow-x-auto whitespace-nowrap scroll-smooth [&::-webkit-scrollbar]:hidden flex gap-4 bg-gradient-to-r from-gray-100 via-white to-blue-50 rounded-xl mx-5 p-4 shadow-md mb-2 "
                onMouseLeave={() => setOpen(null)}
              >
                {prevData?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-white rounded-lg shadow-sm  m-2 w-36 hover:shadow-md hover:bg-blue-50 transition-all duration-300"
                    onClick={() => setOpen(index)}
                  >
                    <img
                      src={item.thumbnail}
                      alt="Current thumbnail"
                      className="w-36 aspect-video object-cover rounded-md border-2 border-gray-200 hover:border-blue-400 transition"
                    />
                    <p
                      className={`mt-2 text-[11px] text-gray-700 text-center w-28 truncate ${
                        Open === index
                          ? "whitespace-normal line-clamp-none"
                          : "line-clamp-1"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          <select
            id="videoId"
            onClick={handleclick}
            {...registerPlaylistVideo("videoId", {
              required: true,
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            multiple
            size={1}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(
                (opt) => {
                  const v = video.find((item) => item._id === opt.value);
                  return {
                    thumbnail: v.thumbnail,
                    title: v.title,
                  };
                },
              );
              if (selected.length !== 0) {
                setPrevData(selected);

                setPreview(
                  playlist?.videos?.map((p) => ({
                    thumbnail: p.thumbnail,
                    title: p.title,
                  })),
                );
                setlength(true);
              } else {
                setPrevData(
                  playlist?.videos?.map((p) => ({
                    thumbnail: p.thumbnail,
                    title: p.title,
                  })),
                );
                setPreview([]);
                setlength(false);
              }
            }}
          >
            {video.map((v) => (
              <option
                key={v._id}
                value={v._id}
                className="px-2 py-1 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer "
              >
                {v.title}
              </option>
            ))}
          </select>
          {/* {errors.videoId && (
            <p className="text-red-500 text-sm mt-1">
              Video selection is required
            </p>
          )} */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          name="action"
          value="Add"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {issubmittingPlaylistVideo ? "Adding..." : "Add to Playlist"}
        </button>
      </form>
    </div>
  );
};

export default AddPlaylist;
