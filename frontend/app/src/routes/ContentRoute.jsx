import { lazy } from "react";

import CreatePlaylist from "../component/Playlist/playlistCRUD/CreatePlaylist";

import EditPlaylist from "../component/Playlist/playlistCRUD/EditPlaylist";
import PlaylistVideoPage from "../component/Playlist/PlaylistPage/page/PlaylistVideoPage";
import CreateTweet from "../component/Tweet/CreateTweet";
import UpdateVideo from "../component/Video/EditVideo/UpdateVideo";

const UploadVideo = lazy(() => import("../component/Video/UploadVideo"));
import AddPlaylist from "../component/Playlist/playlistCRUD/AddPlaylist";
import AssignModerator from "../component/User/userAuth/component/moderator/AssignModerator";

import UserPage from "../component/User/userManagement/page/UserPage.jsx";
import UserRoleList from "../component/User/userManagement/page/UserRoleList.jsx";
import ModeratorRoleList from "../component/User/userManagement/page/ModeratorRoleList.jsx";
import UpdateAvatar from "../component/User/update/UpdateAvatar.jsx";
import UpdateCoverImage from "../component/User/update/UpdateCoverImage.jsx";
import UpdateAccountDetails from "../component/User/update/UpdateAccountDetails.jsx";
import ReportPage from "../component/Report/ReportPage.jsx";
const ReportAdminPage = lazy(
  () => import("../component/Report/reportAdminPage/page/ReportAdminPage.jsx"),
);

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
  {
    path: "all-user",
    element: <UserPage />,
  },
  {
    path: "role-user",
    element: <UserRoleList />,
  },
  {
    path: "role-moderator",
    element: <ModeratorRoleList />,
  },
  {
    path: "update-avatar",
    element: <UpdateAvatar />,
  },
  {
    path: "update-account",
    element: <UpdateAccountDetails />,
  },
  {
    path: "update-coverImage",
    element: <UpdateCoverImage />,
  },
];
