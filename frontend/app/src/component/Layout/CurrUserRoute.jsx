import VideoPage from "../Video/UserVideo/page/VideoPage.jsx";
import TweetPage from "../Tweet/UserTweet/TweetPage.jsx";
import Playlist from "../Playlist/userPlaylist/page/Playlist.jsx";
import Subscription from "../Subscription/subscription/Subscription.jsx";

const CurrUserRoute = [
  { index: true, element: <VideoPage /> },
  { path: "video", element: <VideoPage /> },
  { path: "playlist-home", element: <Playlist /> },
  { path: "tweet-home", element: <TweetPage /> },
  { path: "subscription-page", element: <Subscription /> },
];

export default CurrUserRoute;
