import CreatePlaylist from "../component/Playlist/playlistCRUD/CreatePlaylist";
import EditPlaylist from "../component/Playlist/playlistCRUD/EditPlaylist";
import PlaylistVideoPage from "../component/Playlist/PlaylistPage/page/PlaylistVideoPage";
import CreateTweet from "../component/Tweet/CreateTweet";
import UpdateVideo from "../component/Video/EditVideo/UpdateVideo";
import UploadVideo from "../component/Video/UploadVideo";
import AddPlaylist from "../component/Playlist/playlistCRUD/AddPlaylist";
import AssignModerator from "../component/User/userAuth/component/AssignModerator";
import ReportPage from "../component/HomePage.jsx/ReportPage";
import ReportAdminPage from "../component/HomePage.jsx/ReportAdminPage";

export const ContentRoute = [
  {
    path: "upload-video",
    element: <UploadVideo />,
  },
  {
    path: "create-playlist",
    element: <CreatePlaylist />,
  },
  {
    path: "create-tweet",
    element: <CreateTweet />,
  },
  {
    path: "edit-video",
    element: <UpdateVideo />,
  },
  {
    path: "add-playlist/:playlistId",
    element: <AddPlaylist />,
  },

  {
    path: "playlist/:playlistId",
    element: <PlaylistVideoPage />,
  },
  {
    path: "edit-playlist/:playlistId",
    element: <EditPlaylist />,
  },
  {
    path: "assign-moderator",
    element: <AssignModerator />,
  },
  {
    path: "report-page/:userId",
    element: <ReportPage />,
  },
  {
    path: "report-admin",
    element: <ReportAdminPage />,
  },
];
