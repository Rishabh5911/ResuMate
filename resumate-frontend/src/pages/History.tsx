import axios from "axios";
import { Eye, FileText, FileUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import ErrorView from "../components/ErrorView";
import baseUrl from "../utils/baseUrl";

interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  score: number;
}

const History = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchHistoryData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        `${baseUrl}/api/dashboard/history`,
        {
          withCredentials: true,
        },
      );

      setHistoryData(response.data.data);
    } catch (error: any) {
      console.error("Error in fetching history data ", error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  if (loading) return <Loader color="text-black"/>;
  if (error) return <ErrorView onRetry={fetchHistoryData}/>
  

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">History</h1>
          <p className="text-slate-500 text-sm">
            View all your past resume analyses.
          </p>
        </div>

        <table className="w-full text-left">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
                <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-black text-neutral-500 text-left">
                  File Name
                </th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-black text-neutral-500 text-center">
                  Date
                </th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-black text-neutral-500 text-center">
                  Time
                </th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-black text-neutral-500 text-center">
                  Score
                </th>
                <th className="px-6 py-3 text-[10px] uppercase tracking-widest font-black text-neutral-500 text-center">
                  Action
                </th>
              </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100 bg-white">
            {historyData && historyData.length > 0 ? (
              historyData?.map((item: any) => (
                <tr
                  key={item.id}
                  className="hover:bg-neutral-50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-black text-white p-1.5 rounded">
                        <FileText size={16} />
                      </div>
                      <span className="font-bold text-sm text-black">
                        {item.fileName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500 font-medium text-center">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500 font-medium text-center">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black">{item.score}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                     <Link
                        to={`/dashboard/analysis/${item.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1 border border-black rounded text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
                      >
                        <Eye size={12} /> View
                      </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-full flex items-center justify-center text-neutral-300 mb-6">
                      <Search size={30} />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tighter text-black mb-2">
                      No Analyses Found
                    </h3>
                    <p className="text-sm text-neutral-500 font-medium mb-8">
                      It looks like you have not analyzed any resumes yet. Once
                      you do, they will be listed here for your reference.
                    </p>
                    <Link
                      to="/dashboard/upload-resume"
                      className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded text-[10px] font-black uppercase hover:bg-slate-800 transition-all shadow-md"
                    >
                      <FileUp size={18} /> Start Your First Analysis
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;