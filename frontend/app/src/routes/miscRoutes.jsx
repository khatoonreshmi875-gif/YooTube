import SearchPage from "../component/Video/Search/SearchPage";
import VidJS from "../component/watch/watchVideo/VidJS";
import WatchPage from "../component/watch/WatchPage";
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
