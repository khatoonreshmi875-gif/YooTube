import { lazy } from "react";

const VideoPage = lazy(() => import("../Video/UserVideo/page/VideoPage.jsx"));
const TweetPage = lazy(() => import("../Tweet/UserTweet/TweetPage.jsx"));
const Playlist = lazy(
  () => import("../Playlist/userPlaylist/page/Playlist.jsx"),
);
const Subscription = lazy(
  () => import("../Subscription/subscription/Subscription.jsx"),
);

const CurrUserRoute = [
  { index: true, element: <VideoPage /> },
  { path: "video", element: <VideoPage /> },
  { path: "playlist-home", element: <Playlist /> },
  { path: "tweet-home", element: <TweetPage /> },
  { path: "subscription-page", element: <Subscription /> },
];

export default CurrUserRoute;
