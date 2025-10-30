import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  LightBulbIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import type { TooltipItem } from "chart.js";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import type { ResumeAnalysis } from "../App";
import jsPDF from "jspdf";

interface AnalysisProps {
  analysisData: ResumeAnalysis | null;
}

export default function Analysis({ analysisData }: AnalysisProps) {
  const overallScore = analysisData?.overall_score || 0;
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedBarScores, setAnimatedBarScores] = useState([0, 0, 0, 0]);

  useEffect(() => {
    let start = 0;
    const end = overallScore;
    const duration = 1000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setAnimatedScore(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [overallScore]);

  const scores = analysisData
    ? Object.entries(analysisData.score_breakdown).map(([label, score]) => {
        const formattedLabel = label.replace(/_/g, " ");
        return {
          label: formattedLabel,
          score,
          color:
            label === "ATS_Compatibility"
              ? "from-green-500 to-green-600"
              : label === "Content_Quality"
              ? "from-blue-500 to-blue-600"
              : label === "Format_Design"
              ? "from-purple-500 to-purple-600"
              : "from-orange-500 to-orange-600",
        };
      })
    : [];

  useEffect(() => {
    if (!scores.length) return;

    const duration = 1500;
    const interval = 16;
    const increments = scores.map((item) => item.score / (duration / interval));

    const counter = setInterval(() => {
      setAnimatedBarScores((prevScores) => {
        const newScores = prevScores.map((score, idx) => {
          const nextScore = score + increments[idx];
          return nextScore >= scores[idx].score ? scores[idx].score : nextScore;
        });

        if (newScores.every((score, idx) => score >= scores[idx].score)) {
          clearInterval(counter);
        }

        return newScores;
      });
    }, interval);

    return () => clearInterval(counter);
  }, [scores]);

  const strengths = analysisData?.top_strengths || [];
  const improvements = analysisData?.top_improvements || [];

  const suggestions = analysisData
    ? Object.entries(analysisData.actionable_suggestions).map(
        ([title, description]) => ({
          title,
          description,
          icon: <LightBulbIcon className="w-5 h-5" />,
          priority: "Medium",
        })
      )
    : [];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#22c55e";
    if (score >= 40) return "#facc15";
    return "#ef4444";
  };

  const pieData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [overallScore, 100 - overallScore],
        backgroundColor: [getScoreColor(overallScore), "#0f172a"],
        borderWidth: 0,
      },
    ],
  };


  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  if (!analysisData) {
    return <div>No analysis data found. Please upload a resume first.</div>;
  }

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

  return (
    <div className="min-h-screen bg-gray-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col lg:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Resume Analysis
            </h1>
            <p className="text-gray-400">
              Detailed insights and recommendations for your resume
            </p>
          </div>
          <button
            className="px-6 py-2.5 bg-gray-800 hover:text-white font-medium rounded-lg border border-gray-700  text-gray-400 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/30 cursor-pointer"
            aria-label="Download Resume Analysis Report"
            onClick={handleDownloadPDF}
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download Report
          </button>
        </header>

        <section className="mb-20 grid grid-cols-1 lg:grid-cols-3 sm:gap-6 gap-12 items-start cursor-pointer">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl shadow-black/40 flex flex-col items-center justify-start h-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Overall Score
            </h2>
            <div className="flex items-center justify-center w-full h-40 sm:w-64 mb-4">
              <Pie data={pieData} options={pieOptions} />
            </div>
            <p className="text-white text-3xl font-bold">{animatedScore}%</p>
            <p className="text-gray-400 text-center mt-4">
              {analysisData.resume_guidance}
            </p>
          </div>

          <div className="lg:col-span-2 rounded-2xl p-8 border border-gray-700 shadow-2xl shadow-black/40 h-auto">
            <div className="flex items-center gap-3 mb-6">
              <ChartBarIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Score Breakdown</h2>
            </div>

            <div className="space-y-6">
              {scores
                .filter(
                  (item) =>
                    item.label !== "Keywords Match" ||
                    (analysisData.jd_match_analysis &&
                      analysisData.jd_match_analysis.match_score !== null)
                )
                .map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">
                        {item.label}
                      </span>
                      <span className="text-white font-bold">
                        {Math.floor(animatedBarScores[idx])}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full shadow-lg`}
                        style={{ width: `${animatedBarScores[idx]}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {analysisData.jd_match_analysis &&
          (analysisData.jd_match_analysis?.match_score ||
            (analysisData.jd_match_analysis.missing_keywords?.length ?? 0) >
              0) && (
            <section className="mb-20 bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl shadow-black/40">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <ChartBarIcon className="w-6 h-6 text-blue-400" />
                Job Description Match Analysis
              </h2>

              <div className="mb-6">
                <p className="text-gray-300 text-lg">
                  <span className="font-semibold text-white">Match Score:</span>{" "}
                  {analysisData.jd_match_analysis.match_score !== undefined ? (
                    <span
                      className="font-semibold"
                      style={{
                        color: getScoreColor(
                          analysisData.jd_match_analysis.match_score ?? 0
                        ),
                      }}
                    >
                      {analysisData.jd_match_analysis.match_score}%
                    </span>
                  ) : (
                    "Not Available"
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-3">
                  Missing Keywords:
                </h3>
                {analysisData.jd_match_analysis.missing_keywords?.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {analysisData.jd_match_analysis.missing_keywords.map(
                      (keyword, idx) => (
                        <li
                          key={idx}
                          className="px-3 py-1 bg-gray-900/60 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                        >
                          {keyword}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No missing keywords</p>
                )}
              </div>
            </section>
          )}

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-6 cursor-pointer">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircleIcon className="w-6 h-6 text-green-400" /> Top
              Strengths
            </h2>
            <ul className="space-y-4">
              {strengths.slice(0, 3).map((s, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors duration-300"
                >
                  <CheckCircleIcon
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    aria-label="Strength Icon"
                  />
                  <span className="text-gray-300">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl shadow-black/40">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-400" />{" "}
              Top Improvements
            </h2>
            <ul className="space-y-4">
              {improvements.slice(0, 3).map((i, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors duration-300"
                >
                  <ExclamationTriangleIcon
                    className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                    aria-label="Improvement Icon"
                  />
                  <span className="text-gray-300">{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative cursor-pointer">
          <div className="flex items-center gap-3 mb-6">
            <LightBulbIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Actionable Suggestions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestions.map((s, idx) => (
              <div key={idx} className="group relative cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>

                <div className="relative bg-gray-900/50 rounded-xl p-6 border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300 h-full shadow-lg shadow-black/30 group-hover:shadow-xl group-hover:shadow-blue-500/20">
                  <div className="flex items-center gap-5 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                      {s.icon}
                    </div>
                     <h3 className="text-white font-semibold mb-2 ">
                    {s.title
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                     </h3>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
