import { lazy, Suspense } from "react";
import StatCard from "../StatCard";

import SearchBox from "../component/SearchBox";
import SubscriberList from "../component/SubscriberList";
import TopSubscriber from "../component/TopSubscriber";
import useSubscribers from "../component/useSubscribers";
import LoadingSpinner from "../../../utils/LoadingSpinner";

const Graph = lazy(() => import("../component/Graph"));

const SubscriberPage = () => {
  const { stats } = useSubscribers();
  if (!stats) {
    return <LoadingSpinner label="Fetching subscribers" />;
  }
  return (
    <>
      <main className="flex flex-col  lg:space-x-6  sm:px-6 lg:px-10 w-full ">
        {/* Chart Section */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 sm:px-6">
          <Suspense
            fallback={
              <div className="w-full h-[20rem] sm:h-[25rem] lg:h-[33rem] p-6 bg-gray-200 rounded-2xl shadow-lg border border-gray-200 shadow-gray-500 mx-auto mt-2 animate-pulse "></div>
            }
          >
            <Graph />
          </Suspense>
          {/* Stats Section */}
          <section className="flex flex-col mt-6 w-full lg:w-1/3">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:mt-0 mt-3">
              <StatCard
                bg="bg-white"
                stats={stats}
                textColor="text-slate-900"
                className="w-full"
              />
            </div>

            {/* Subscribers */}

            {stats.subscriber.length !== 0 && <TopSubscriber />}
          </section>
        </div>

        <section className="mt-8 px-4">
          {/* <SearchBox /> */}
          <SubscriberList />
        </section>
      </main>
    </>
  );
};

export default SubscriberPage;
