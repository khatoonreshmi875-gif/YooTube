import { useContext } from "react";
import { AppContext } from "../../../utils/contextApi";
import StatCard from "../StatCard";
import Graph from "../component/Graph";
import SearchBox from "../component/SearchBox";
import TopSubscriber from "../component/TopSubscriber";
import SubscriberList from "../component/SubscriberList";
import useSubscribers from "../component/useSubscribers";
const SubscriberPage = () => {
  const { stats } = useSubscribers();
  console.log("data of stats", stats);
  return (
    <>
      {stats ? (
        <main className="flex flex-col  lg:space-x-6  px-4 sm:px-6 lg:px-10 w-full pt-24">
          {/* Chart Section */}
          <div className="flex flex-col lg:flex-row lg:space-x-6  px-4 sm:px-6">
            {" "}
            <Graph />
            {/* Stats Section */}
            <section className="flex flex-col mt-6 w-full lg:w-1/3">
              {/* Likes + Comments */}
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

              <TopSubscriber />
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
