const ResumeAnalysis = require("../models/ResumeAnalysis");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const analyses = await ResumeAnalysis.find({ userId }).sort({
      createdAt: -1,
    });
    const totalAnalyzed = analyses.length;

    const avgMatchScore =
      totalAnalyzed > 0
        ? Math.round(
            analyses.reduce(
              (acc, curr) => acc + curr.analysisData.overall_score,
              0,
            ) / totalAnalyzed,
          )
        : 0;

    const highestScore =
      totalAnalyzed > 0
        ? Math.max(
            ...analyses.map((analysis) => analysis.analysisData.overall_score),
          )
        : 0;

    const highestScoreResume = analyses.find(
      (analysis) => analysis.analysisData.overall_score === highestScore,
    );

    const groupedData = analyses.reduce((acc, analysis) => {
      const dateKey = new Date(analysis.createdAt).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          totalScore: 0,
          count: 0,
          timestamp: new Date(analysis.createdAt),
        };
      }

      acc[dateKey].totalScore += analysis.analysisData.overall_score;
      acc[dateKey].count += 1;
      return acc;
    }, {});

    const scoreProgress = Object.values(groupedData)
      .map((item) => ({
        date: item.date,
        score: Math.round(item.totalScore / item.count),
        count: item.count,
        timestamp: item.timestamp,
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ date, score, count }) => ({ date, score, count }));

    const recentAnalysis = analyses.slice(0, 3).map((analysis) => {
      const dateObj = new Date(analysis.createdAt);
      return {
        id: analysis._id,
        fileName: analysis.fileName,
        date: dateObj.toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: dateObj.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        score: analysis.analysisData.overall_score,
      };
    });

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        username: req.user.fullname,
        stats: {
          totalAnalyzed,
          avgMatchScore,
          highestScoreResume: {
            id: highestScoreResume._id,
            name: highestScoreResume.fileName,
            score: highestScoreResume.analysisData.overall_score,
          },
        },
        scoreProgress,
        recentAnalysis,
      },
    });
  } catch (error) {
    console.error("Error in getDashboardData:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data. Please try again.",
    });
  }
};

exports.getHistoryData = async (req, res) => {
  try {
    const userId = req.user.id;
    const analyses = await ResumeAnalysis.find({ userId }).sort({
      createdAt: -1,
    });

    const formattedData = analyses.map((analysis) => {
      const dateObj = new Date(analysis.createdAt);
      return {
        id: analysis._id,
        fileName: analysis.fileName,
        date: new Date(analysis.createdAt).toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: dateObj.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        score: analysis.analysisData.overall_score,
      };
    });

    res.status(200).json({
      success: true,
      message: "History data fetched successfully",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error in getHistoryData:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch history data. Please try again.",
    });
  }
};

exports.getDetailedAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await ResumeAnalysis.findOne({ _id: id, userId: userId });

    if (!analysis) {
      return res
        .status(404)
        .json({ success: false, message: "Analysis not found" });
    }

    res.status(200).json({
      success: true,
      message: "Analysis Fetched Successfully",
      data: analysis,
    });
  } catch (error) {
    console.error("Error in getDetailedAnalysis:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis. Please try again.",
    });
  }
};
