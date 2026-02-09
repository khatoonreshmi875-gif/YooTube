import React from 'react'

const ReportEmptyPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[70vh]  text-center ">
        <div className="text-4xl mb-3">📄</div>

        <p className="text-xl font-semibold text-cyan-500 mb-2">
          No Reports Found
        </p>
        <p className="text-gray-400">
          Try selecting a different date or check back later.
        </p>
      </div>
    </div>
  );
}

export default ReportEmptyPage
