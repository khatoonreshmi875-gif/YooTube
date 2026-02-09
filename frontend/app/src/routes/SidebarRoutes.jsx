import { lazy } from "react";
import CurrUserRoute from "../component/Layout/CurrUserRoute";
const CurrUser = lazy(() => import("../component/User/CurrUser"));
const LikeVideo = lazy(() => import("../component/Like/LikeVideo"));
const SubscriberPage = lazy(
  () => import("../component/Subscription/subscriber/page/SubscriberPage"),
);
const MainTweetPage = lazy(
  () => import("../component/Tweet/HomeTweet/MainTweetPage"),
);
const WatchHistory = lazy(
  () => import("../component/User/watchHistory/WatchHistory"),
);

export const SideBarRoutes = [
  {
    path: "curr-user",
    element: <CurrUser />,
    children: CurrUserRoute,
  },
  {
    path: "curr-user/:userId",
    element: <CurrUser />,
    children: CurrUserRoute,
  },

  {
    path: "watch-history",
    element: <WatchHistory />,
  },
  {
    path: "like-video",
    element: <LikeVideo />,
  },
  {
    path: `page`,
    element: <SubscriberPage />,
  },
  {
    path: `main-tweet/:tweetId`,
    element: <MainTweetPage />,
  },
];
