import React, { useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppContext } from "./component/utils/contextApi.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHistory from "./Hooks/useHistory.jsx";
import { usePlaylist } from "./Hooks/usePlaylist.jsx";
import { useTweet } from "./Hooks/useTweet.jsx";
import { useVideo } from "./Hooks/useVideo.jsx";
import { ContentRoute } from "./routes/ContentRoute.jsx";
import { SideBarRoutes } from "./routes/SidebarRoutes.jsx";
import { authRoutes } from "./routes/authRoutes.jsx";
import { miscroutes } from "./routes/miscRoutes.jsx";
import { useAuth } from "./Hooks/useAuth.jsx";
import { useSubscribe } from "./Hooks/useSubscribe.jsx";
import { Suspense } from "react";
import { lazy } from "react";
import LoadingSpinner from "./component/utils/LoadingSpinner.jsx";

import Home1 from "./component/HomePage.jsx/Home1.jsx";
import NavbarLayout from "./component/Layout/NavbarLayout.jsx";

const AuthPage = lazy(
  () =>
    import(
      /* webpackPrefetch: true */ "./component/User/userAuth/component/auth/AuthPage.jsx"
    ),
);
const Googlesuccess = lazy(
  () =>
    import(
      /* webpackPrefetch: true */ "./component/User/userAuth/component/auth/Googlesuccess.jsx"
    ),
);
const ProtectedRoute = lazy(
  () =>
    import(/* webpackPrefetch: true */ "./component/utils/ProtectedRoute.jsx"),
);
function App() {
  const auth = useAuth();
  const videos = useVideo();
  const tweets = useTweet();
  const histories = useHistory();
  const playlist = usePlaylist();
  const subscriber = useSubscribe();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    auth.onHandle();
    videos.getallvideo(0);
    playlist.getAllPlaylist();
  }, []);

  const FormatTime = (date) => {
    const dateObj = new Date(date).getTime();
    const CurrTime = Date.now();
    const time = parseInt(CurrTime - dateObj);
    const day = Math.floor(time / (1000 * 60 * 60 * 24));
    const hour = Math.floor(time / (1000 * 60 * 60));
    const min = Math.floor(time / (1000 * 60));
    if (day >= 2) {
      return `${day} days ago`;
    } else if (day >= 1) {
      return `${day} day ago`;
    } else if (hour >= 1) {
      return `${hour} hr${hour >= 2 ? "s" : ""} ago`;
    } else {
      return `${min} min${min >= 2 ? "s" : ""}  ago`;
    }
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarLayout />,
      children: [
        {
          index: true,

          element: (
            <ProtectedRoute>
              <Home1 />
            </ProtectedRoute>
          ),
        },

        ...miscroutes,
        ...SideBarRoutes,
        ...ContentRoute,
        ...authRoutes,
      ],
    },
    {
      path: "/verify",
      element: <AuthPage />,
    },
    { path: "/google-success", element: <Googlesuccess /> },
  ]);
  return (
    <>
      <div>
        <AppContext.Provider
          value={{
            ...auth,
            ...videos,
            ...tweets,
            ...histories,
            ...playlist,
            ...subscriber,
            FormatTime,
          }}
        >
          <Suspense
            fallback={
              <div>
                {" "}
                <div className="mt-96">
                  <LoadingSpinner label="Loading" />
                </div>
              </div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>{" "}
          <ToastContainer
            position="top-center"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
            }}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
