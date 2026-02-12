import CurrUserRoute from "../component/Layout/CurrUserRoute";
import LikeVideo from "../component/Like/LikeVideo";
import SubscriberPage from "../component/Subscription/subscriber/page/SubscriberPage";
import MainTweetPage from "../component/Tweet/HomeTweet/MainTweetPage";
import CurrUser from "../component/User/CurrUser";
import WatchHistory from "../component/User/watchHistory/WatchHistory";

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
