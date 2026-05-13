import { Link } from "react-router-dom";
import { FileUp, Eye, FileText, ArrowRight, Info } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import ErrorView from "../components/ErrorView";
import baseUrl from "../utils/baseUrl";

interface AnalysisItem {
  id: string;
  fileName: string;
  date: string;
  time: string;
  score: number;
}

const Dashboard = () => {
  const context = useContext(AuthContext);
  const { user } = context!;
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${baseUrl}/api/dashboard`, {
        withCredentials: true,
      });

      setDashboardData(response.data.data);
      
    } catch (error:any) {
      console.error("Failed to fetch dashboard data:", error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loader color="text-black" />;
  if (error) return <ErrorView onRetry={fetchDashboardData}/>

  

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 relative flex flex-col sm:block gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">
            {dashboardData?.stats?.totalAnalyzed > 0
              ? `Welcome back, ${user?.name}`
              : `Hi ${user?.name}, let's analyze your first resume!`}
          </h1>
          <p className="text-slate-500">
            Track your resume performance and AI analysis insights.
          </p>
        </div>
        <Link
          to="/dashboard/upload-resume"
          className="relative sm:absolute sm:right-0 sm:top-0 w-fit sm:w-auto flex justify-center gap-2 items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all"
        >
          <FileUp size={18} /> New Analysis
        </Link>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-black shadow-sm hover:-translate-y-1 transition-all duration-200 cursor-pointer">
          <p className="text-sm text-slate-500 font-medium">Total Analyzed</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">
            {dashboardData?.stats?.totalAnalyzed || 0}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-black shadow-sm hover:-translate-y-1 transition-all duration-200 cursor-pointer">
          <p className="text-sm text-slate-500 font-medium">Avg. Match Score</p>
          <h3 className="text-3xl font-bold text-black mt-1">
            {dashboardData?.stats?.totalAnalyzed > 0
              ? `${dashboardData.stats.avgMatchScore}%`
              : "--"}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl border border-black flex justify-between items-center group hover:-translate-y-1 transition-all duration-200 cursor-pointer min-w-0">
          <div className="flex flex-col gap-1 min-w-0 overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Highest Score
            </p>
            <h3 className="text-3xl font-black text-black leading-none">
              {dashboardData?.stats?.totalAnalyzed > 0
                ? `${dashboardData.stats.highestScoreResume.score}%`
                : "--"}
            </h3>

            <div className="flex items-center gap-1.5 mt-1">
              {dashboardData?.stats?.totalAnalyzed > 0 ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></div>
                  <span className="text-xs font-bold text-neutral-600 truncate" title={dashboardData?.stats?.highestScoreResume.name ||
                      "Resume.pdf"}>
                    {dashboardData?.stats?.highestScoreResume.name ||
                      "Resume.pdf"} 
                  </span>
                </>
              ) : (
                <span className="text-xs font-medium text-neutral-400 italic">
                  No data yet
                </span>
              )}
            </div>
          </div>

          {dashboardData?.stats?.totalAnalyzed > 0 && (
            <Link
                        to={`/dashboard/analysis/${dashboardData.stats.highestScoreResume.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1 border border-black rounded text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
                      >
                       <span className="flex gap-3 items-center" title="View Detailed Analysis Report"> <Eye size={12} /> View</span>
                      </Link>
          )}
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-xl border border-black shadow-sm relative overflow-hidden">
        <div className="mb-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-black">
            Score Progress
          </h4>
        </div>

        <div className="h-[300px] w-full relative">
          {(!dashboardData?.scoreProgress ||
            dashboardData.scoreProgress.length === 0) && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
              <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-2xl bg-white/80">
                <p className="text-sm font-bold text-black mb-1">
                  No Data to Visualize
                </p>
                <p className="text-xs text-slate-500 max-w-[200px]">
                  Once you analyze a few resumes, your progress chart will
                  appear here.
                </p>
              </div>
            </div>
          )}
          <div
            className={`w-full h-full ${!dashboardData?.scoreProgress || dashboardData.scoreProgress.length === 0 ? "opacity-20 grayscale" : ""}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dashboardData?.scoreProgress || []}
                
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#000", fontSize: 11, fontWeight: 500 }}
                  dy={10}
                >
                  <Label
                    value="Analysis Timeline"
                    offset={-25}
                    position="insideBottom"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      fill: "#64748b",
                    }}
                  />
                </XAxis>

                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#000", fontSize: 11 }}
                >
                  <Label
                    value="Score %"
                    angle={-90}
                    position="insideLeft"
                    style={{
                      textAnchor: "middle",
                      fontSize: "12px",
                      fontWeight: "bold",
                      fill: "#64748b",
                    }}
                  />
                </YAxis>

                <Tooltip
                  trigger="hover"
                  cursor={{ stroke: "#475569", strokeWidth: 1, strokeDasharray: "4 4" }}
                  contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      backdropFilter: "blur(4px)",               
                      border: "1px solid #334155",              
                      borderRadius: "10px",                     
                      padding: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)", 
                    }}
                  labelStyle={{
                      color: "#94a3b8",     
                      marginBottom: "8px",
                      fontSize: "11px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  itemStyle={{ 
                      color: "#f8fafc",     
                      fontWeight: "700", 
                      fontSize: "14px",
                      padding: "0px" 
                    }}
                  formatter={(value, name, props) => {
                    const { count } = props.payload;
                    
                    return [
                      <span key="score-value" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{value}%</span>
                        <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#94a3b8' }}>
                          (Based on {count} {count > 1 ? 'analyses' : 'analysis'})
                        </span>
                      </span>,
                      name === "score" ? "Average Score" : name
                    ];
                  }}
                  isAnimationActive={true}
                />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#000"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  animationDuration={1200}
                  activeDot={{ r: 6}}
                  dot={{ r: 4, fill: "#fff", strokeWidth: 2, stroke: "#000" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <h4 className="text-sm font-bold uppercase tracking-widest">
            Recent Analysis
          </h4>
          <Link
            to={"/dashboard/history"}
            className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
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

            <tbody className="divide-y divide-neutral-100">
              {dashboardData?.recentAnalysis?.length > 0 ? (
                dashboardData?.recentAnalysis.map((item: AnalysisItem) => (
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
                  <td colSpan={4} className="px-6 py-10">
                    <div className="flex items-center justify-between bg-neutral-50 border border-dashed border-neutral-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-neutral-400">
                          <Info size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-black uppercase tracking-tight">
                            No recent activity
                          </p>
                          <p className="text-[10px] text-neutral-500 font-medium">
                            Your latest resume scans will appear here.
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/dashboard/upload-resume"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded text-[10px] font-black uppercase hover:bg-slate-800 transition-all shadow-md"
                      >
                        <FileUp size={16} /> New Analysis
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;