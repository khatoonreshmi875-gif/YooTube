import { lazy } from "react";

const SearchPage = lazy(() => import("../component/Video/Search/SearchPage"));
const VidJS = lazy(() => import("../component/watch/watchVideo/VidJS"));
const WatchPage = lazy(() => import("../component/watch/WatchPage"));

import DownloadPage from "../component/Download/page/DownloadPage";

export const miscroutes = [
  {
    path: "video-rec-page/:videoId/user/:userId",
    element: <WatchPage />,
  },

  {
    path: "search-page/:id/:query/:type",
    element: <SearchPage />,
  },

  {
    path: "download",
    element: <DownloadPage />,
  },
  {
    path: "downloaded",
    element: <VidJS />,
  },
];
