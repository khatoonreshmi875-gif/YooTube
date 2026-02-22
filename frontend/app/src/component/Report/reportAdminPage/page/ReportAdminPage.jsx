import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // adjust import paths
import Heading from "../../../utils/form/Heading";
import { getReport, getReportByDate } from "../../../../Api/UserApi";
import { handleAxiosError, useAxiosErrorHandler } from "../../../utils/erroeHandler";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import ReportCard from "../ReportAdminPageComponent/ReportCard";
import ReportEmptyPage from "../ReportAdminPageComponent/ReportEmptyPage";
import ReportTable from "../ReportAdminPageComponent/ReportTable";

const ReportAdminPage = () => {
  const handleAxiosError = useAxiosErrorHandler();

  //usestate
  const [reports, setReports] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);


  // Fetch all reports
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await getReport();
      setReports(res.data.data);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports by date
  const fetchReportsByDate = async (userdata) => {
    setLoading(true);
    try {
      const res = await getReportByDate(userdata);
      setReports(res.data.data);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    fetchReportsByDate({ choosenDate: value });
  };
  useEffect(() => {
    if (selectedDate) {
      handleDateChange();
    } else {
      fetchReports();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <LoadingSpinner label="Fetching Reports" />
      </div>
    );
  }

  return (
    <div className="w-full  sm:px-6 mb-24">
      {/* Page Heading */}
      <Heading label=" Complaints Overview" />

      {/* Date Filter */}
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="reportDate" className="text-slate-700 font-semibold">
          Selected Date:
        </label>
        <input
          id="reportDate"
          type="date"
          className="p-2 rounded-lg border border-gray-600 bg-white text-slate-700 focus:ring-2 focus:ring-cyan-500"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {!reports || reports.length === 0 ? (
        <ReportEmptyPage />
      ) : (
        <>
          {/* Table View (Large Screens) */}

          <ReportTable reports={reports} />

          {/* Card View (Small/Medium Screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
            {reports.map((report) => (
              <div key={report._id} className="bg-white">
                {/* Video Title */}

                <ReportCard report={report} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportAdminPage;
