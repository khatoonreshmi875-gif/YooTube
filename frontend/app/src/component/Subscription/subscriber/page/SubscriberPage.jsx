import { lazy,Suspense } from "react";
import StatCard from "../StatCard";

import SearchBox from "../component/SearchBox";
import SubscriberList from "../component/SubscriberList";
import TopSubscriber from "../component/TopSubscriber";
import useSubscribers from "../component/useSubscribers";

const Graph = lazy(() => import("../component/Graph"));

const SubscriberPage = () => {
  const { stats } = useSubscribers();
  console.log("data of stats", stats);
  return (
    <>
      {stats ? (
        <main className="flex flex-col  lg:space-x-6  px-4 sm:px-6 lg:px-10 w-full ">
          {/* Chart Section */}
          <div className="flex flex-col lg:flex-row lg:space-x-6  px-4 sm:px-6">
            {" "}
            <Suspense
              fallback={
                <div className="xs:w-[95%] w-[95%]  ss:w-[90%] sx:w-[95%] sm:w-[95%] md:w-[95%] lg:w-[70%] h-[20rem] sm:h-[25rem] lg:h-[33rem] p-6 bg-gray-200 rounded-2xl shadow-lg border border-gray-200 shadow-gray-500 mx-auto mt-2 animate-pulse "></div>
              }
            >
              {" "}
              <Graph />
            </Suspense>
            {/* Stats Section */}
            <section className="flex flex-col mt-6 w-full lg:w-1/3">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full">
                <StatCard
                  bg="bg-pink-100"
                  label="❤️ Total Likes"
                  value={stats?.VideoAllLike}
                  textColor="text-pink-700"
                  className="w-full"
                />
                <StatCard
                  bg="bg-green-100"
                  label="💬 Total Comments"
                  value={stats?.AllComment}
                  textColor="text-green-700"
                  className="w-full"
                />
              </div>

              {/* Subscribers */}
              <div className="mt-4">
                <StatCard
                  bg="bg-purple-100"
                  label="👥 Total Subscribers"
                  value={stats?.user?.subscriberCount}
                  textColor="text-purple-700"
                  className="w-full"
                />
              </div>

              {stats.subscriber.length !== 0 && <TopSubscriber />}
            </section>
          </div>

          <section className="mt-8 px-4">
            <SearchBox />
            <SubscriberList />
          </section>
        </main>
      ) : (
        <div className="flex flex-col justify-center items-center mt-96 space-y-6">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-700 border-solid"></div>

          {/* Loading Text */}
          <p className="text-blue-300 text-xl font-bold tracking-wide animate-pulse">
            Fetching subscriber data...
          </p>
        </div>
      )}
    </>
  );
};

export default SubscriberPage;
