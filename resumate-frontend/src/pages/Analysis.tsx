import {
  Lightbulb,
  CircleCheck,
  TriangleAlert,
  ChartBar,
  Download,
  Rocket,
  Target,
  Layout,
  MoveLeft,
} from "lucide-react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import ErrorView from "../components/ErrorView";
import baseUrl from "../utils/baseUrl";

interface AnalysisData {
  overall_score: number;
  score_breakdown: {
    ATS_Compatibility: number;
    Content_Quality: number;
    Format_Design: number;
    Keywords_Match: number;
  };
  jd_match_analysis?: {
    match_score: number | null;
    missing_keywords: string[];
  };
  top_improvements: string[];
  top_strengths: string[];
  actionable_suggestions: {
    Keyword_Optimization: string;
    Achievements: string;
    Section_Order: string;
  };
  resume_guidance: string;
}

const Analysis = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  

  const fetchAnalysisData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        `${baseUrl}/api/dashboard/analysis/${id}`,
        {
          withCredentials: true,
        },
      );
      setAnalysisData(response.data.data.analysisData);
    } catch (error:any) {
      console.error("Failed to fetch analysis data:", error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysisData();
  }, [id]);

  const overallScore = analysisData?.overall_score || 0;

  const scores = analysisData
    ? Object.entries(analysisData.score_breakdown).map(([label, score]) => {
        const formattedLabel = label.replace(/_/g, " ");
        return {
          label: formattedLabel,
          score,
        };
      })
    : [];

  const strengths = analysisData?.top_strengths || [];
  const improvements = analysisData?.top_improvements || [];

  const getIconForSuggestion = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("keyword")) return <Target className="w-5 h-5" />;
    if (t.includes("achievement")) return <Rocket className="w-5 h-5" />;
    if (t.includes("order") || t.includes("format"))
      return <Layout className="w-5 h-5" />;
    return <Lightbulb className="w-5 h-5" />;
  };

  const suggestions = analysisData?.actionable_suggestions
    ? Object.entries(analysisData.actionable_suggestions).map(
        ([title, description]) => ({
          title,
          description,
          icon: getIconForSuggestion(title),
        }),
      )
    : [];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#10b981"; 
    if (score >= 40) return "#f59e0b"; 
    return "#ef4444"; 
  };

  const pieData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [overallScore, 100 - overallScore],
        backgroundColor: [getScoreColor(overallScore), "#f1f5f9"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
    cutout: "85%",
    maintainAspectRatio: false,
  };

  function handleDownloadPDF(): void {
    if (!analysisData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const maxWidth = pageWidth - margin * 2;
    let yPos = 20;

    const addText = (
      text: string,
      x: number,
      yPos: number,
      fontSize: number = 12,
      lineHeight: number = 6
    ): number => {
      doc.setFontSize(fontSize);
      const wrapped = doc.splitTextToSize(text, maxWidth);

      if (yPos + wrapped.length * lineHeight > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }

      doc.text(wrapped, x, yPos);
      return yPos + wrapped.length * lineHeight + 4;
    };

    const addSection = (title: string): number => {
      if (yPos + 10 > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }
      doc.setFontSize(14);
      doc.text(title, margin, yPos);
      return yPos + 10;
    };

    doc.setFontSize(18);
    doc.text("Resume Analysis Report", margin, yPos);
    yPos += 20;

    doc.setFontSize(12);
    doc.text(`Overall Score: ${analysisData.overall_score}%`, margin, yPos);
    yPos += 14;

    yPos = addSection("Score Breakdown:");
    Object.entries(analysisData.score_breakdown).forEach(([key, value]) => {
      yPos = addText(`${key.replace(/_/g, " ")}: ${value}%`, margin + 6, yPos);
    });
    yPos += 6;

    if (
      analysisData.jd_match_analysis &&
      analysisData.jd_match_analysis.match_score !== null
    ) {
      yPos = addSection("Job Description Match Analysis:");
      yPos = addText(
        `Match Score: ${analysisData.jd_match_analysis.match_score}%`,
        margin + 6,
        yPos
      );

      const missing = analysisData.jd_match_analysis.missing_keywords;
      if (missing && missing.length > 0) {
        yPos = addText("Missing Keywords:", margin + 6, yPos);
        missing.forEach((kw: string) => {
          yPos = addText(`- ${kw}`, margin + 10, yPos);
        });
      } else {
        yPos = addText("Missing Keywords: None", margin + 6, yPos);
      }
      yPos += 8;
    }

    yPos = addSection("Top Strengths:");
    analysisData.top_strengths.forEach((strength: string) => {
      yPos = addText(`- ${strength}`, margin + 6, yPos);
    });
    yPos += 8;

    yPos = addSection("Top Improvements:");
    analysisData.top_improvements.forEach((imp: string) => {
      yPos = addText(`- ${imp}`, margin + 6, yPos);
    });
    yPos += 8;

    yPos = addSection("Actionable Suggestions:");
    Object.entries(analysisData.actionable_suggestions).forEach(
      ([key, value]) => {
        yPos = addText(`${key.replace(/_/g, " ")}: ${value}`, margin + 6, yPos);
      }
    );
    yPos += 8;

    yPos = addSection("Guidance:");
    yPos = addText(analysisData.resume_guidance, margin + 6, yPos);

    doc.save("resume_analysis_report.pdf");
  }

  useEffect(() => {
    const start = 0; 
    const end = overallScore;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      
      const currentCount = Math.floor(start + (end - start) * easedProgress);
      setDisplayScore(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [overallScore]);

  if (loading) return <Loader color="text-black" />;
  if (error) return <ErrorView onRetry={fetchAnalysisData}/>

  return (
    <div className="min-h-screen bg-slate-50/50 py-6 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col lg:flex-row items-start justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-black transition-all group mb-2"
            >
              <MoveLeft
                className="transition-transform group-hover:-translate-x-1"
                size={16}
              />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              AI Resume Analysis
            </h1>
            <p className="text-slate-600 text-lg">
              Personalized insights, ATS feedback, and actionable improvements
              for your resume
            </p>
          </div>
          <button
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-300 items-center justify-center gap-2 shadow-sm  cursor-pointer whitespace-nowrap inline-flex"
            aria-label="Download Resume Analysis Report"
            title="Download Report"
            onClick={handleDownloadPDF}
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </header>

        <section className="mb-12 grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col items-center">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
              Overall Score
            </h2>
            <div className="relative w-48 h-48 mb-6">
              <Pie data={pieData} options={pieOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900">
                  {displayScore}%
                </span>
              </div>
            </div>
            <div className="text-center">
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{
                  backgroundColor: `${getScoreColor(overallScore)}15`,
                  color: getScoreColor(overallScore),
                }}
              >
                {overallScore >= 70
                  ? "Excellent Match"
                  : overallScore >= 40
                    ? "Good Potential"
                    : "Needs Work"}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {analysisData?.resume_guidance}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <ChartBar className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                Score Breakdown
              </h2>
            </div>

            <div className="space-y-8">
              {scores.map((item, idx) => {
                const animatedBarScore =
                  overallScore > 0
                    ? Math.floor((displayScore / overallScore) * item.score)
                    : 0;
                return (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-semibold text-base">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-indigo-600 font-mono font-bold text-lg">
                        {animatedBarScore}%
                      </span>
                    </div>

                    <div className="h-2 w-full bg-slate-100 rounded-full relative">
                      <div
                        className="absolute top-0 left-0 h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out group-hover:bg-indigo-600"
                        style={{ width: `${animatedBarScore}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center  justify-between gap-4 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <ChartBar className="w-5 h-5 text-indigo-600" />
              </div>
              Job Description Match
            </h2>
            <div className="flex items-center justify-between sm:justify-start gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full w-fit">
              <span className="text-sm font-medium text-indigo-700 whitespace-nowrap">
                Match Score
              </span>
              <span className="text-lg font-bold text-indigo-700">
                {analysisData?.jd_match_analysis?.match_score ?? 0}%
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Missing Keywords
            </h3>

            {analysisData?.jd_match_analysis?.missing_keywords?.length ? (
              <ul className="flex flex-wrap gap-2">
                {analysisData.jd_match_analysis.missing_keywords.map(
                  (keyword, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-1 bg-slate-50 text-slate-600  text-sm font-medium border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 cursor-pointer rounded-md"
                    >
                      {keyword}
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <p className="text-emerald-700 text-sm font-medium">
                  Perfect match! No missing keywords found.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1  gap-10">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  <CircleCheck className="w-5 h-5 text-emerald-600" />
                </div>
                Key Strengths
              </h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {strengths.slice(0, 3).map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-l-emerald-500 bg-emerald-50/30 text-slate-700 hover:bg-emerald-50 transition-colors duration-200"
                  >
                    <CircleCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium leading-relaxed">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <TriangleAlert className="w-5 h-5 text-amber-600" />
                </div>
                Areas for Improvement
              </h2>
            </div>

            <div className="p-6">
              <ul className="space-y-3">
                {improvements.slice(0, 3).map((i, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-l-amber-500 bg-amber-50/30 text-slate-700 hover:bg-amber-50 transition-colors duration-200"
                  >
                    <TriangleAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium leading-relaxed">
                      {i}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-none mb-1">
                Actionable Suggestions
              </h2>
              <p className="text-sm text-slate-500">
                Tailored insights to improve your score
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1  gap-6">
            {suggestions.map((s, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="p-3 bg-slate-50 rounded-lg text-slate-600 w-fit mb-5 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                  {s.icon}
                </div>

                <h3 className="text-slate-800 font-semibold text-base mb-3 group-hover:text-indigo-700 transition-colors">
                  {s.title
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analysis;