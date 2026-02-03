import { useNavigate } from "react-router-dom";

const EmptyPlaylist = ({ userId, user }) => {
  const navigate = useNavigate;
  return (
    <>
      {" "}
      <div className="flex flex-col items-center justify-center   mt-9">
        <div className="bg-gradient-to-bl from-black via-slate-800 to-black shadow-md rounded-lg p-14 text-center h-auto ">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6h13M9 6l7 7-7 7"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-semibold text-gray-400">
            No playlists yet
          </h2>
          <p className="mt-2 text-gray-500">
            Create your first playlist to get started!
          </p>
          {userId === user ? (
            <button
              onClick={() => navigate("/create-playlist")}
              className="mt-6 px-6 py-2 bg-blue-100 text-gray-900 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create Playlist
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default EmptyPlaylist;
