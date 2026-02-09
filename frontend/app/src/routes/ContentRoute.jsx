import { lazy } from "react";


const UploadVideo = lazy(() => import("../component/Video/UploadVideo"));
const CreatePlaylist = lazy(
  () => import("../component/Playlist/playlistCRUD/CreatePlaylist"),
);
const CreateTweet = lazy(() => import("../component/Tweet/CreateTweet"));
const UpdateVideo = lazy(
  () => import("../component/Video/EditVideo/UpdateVideo"),
);
const AddPlaylist = lazy(
  () => import("../component/Playlist/playlistCRUD/AddPlaylist"),
);
const PlaylistVideoPage = lazy(
  () => import("../component/Playlist/PlaylistPage/page/PlaylistVideoPage"),
);
const EditPlaylist = lazy(
  () => import("../component/Playlist/playlistCRUD/EditPlaylist"),
);
const AssignModerator = lazy(
  () =>
    import("../component/User/userAuth/component/moderator/AssignModerator"),
);
const ReportPage = lazy(() => import("../component/Report/ReportPage.jsx"));
const ReportAdminPage = lazy(
  () => import("../component/Report/reportAdminPage/page/ReportAdminPage.jsx"),
);
const UserPage = lazy(
  () => import("../component/User/userManagement/page/UserPage.jsx"),
);
const UserRoleList = lazy(
  () => import("../component/User/userManagement/page/UserRoleList.jsx"),
);
const ModeratorRoleList = lazy(
  () => import("../component/User/userManagement/page/ModeratorRoleList.jsx"),
);
const UpdateAvatar = lazy(
  () => import("../component/User/update/UpdateAvatar.jsx"),
);
const UpdateCoverImage = lazy(
  () => import("../component/User/update/UpdateCoverImage.jsx"),
);
const UpdateAccountDetails = lazy(
  () => import("../component/User/update/UpdateAccountDetails.jsx"),
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
