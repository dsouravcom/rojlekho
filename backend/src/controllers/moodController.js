const Mood = require("../models/MoodModel");
const UserMood = require("../models/UserMoodModel");

// Create a new mood entry
exports.createMood = async (req, res) => {
  try {
    const { emotionSlug, emotionName } = req.body;
    const newMood = new Mood({ emotionSlug, emotionName });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all mood entries
exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get user mood entries by user ID and date from query
exports.getUserMoods = async (req, res) => {
  try {
    const { date } = req.query;
    const userId = req.user.id; // Assuming `req.user.id` is available from authentication

    let dateFilter = {}; // Default to empty, i.e., no date filtering

    // If 'date' query parameter is provided, apply date filtering
    if (date) {
      const now = moment(); // Current time
      let startDate;

      switch (date) {
        case "7days":
          startDate = now.subtract(7, "days"); // Get date 7 days ago
          break;
        case "30days":
          startDate = now.subtract(30, "days"); // Get date 30 days ago
          break;
        case "all":
          startDate = null; // No date filtering
          break;
        default:
          return res
            .status(400)
            .json({ message: "Invalid date filter parameter" });
      }

      // If we have a startDate, apply the filtering
      if (startDate) {
        dateFilter = {
          createdAt: { $gte: startDate.toDate() }, // Filter mood entries after 'startDate'
        };
      }
    }

    // Fetch user moods with date filtering (if applicable)
    const userMoods = await UserMood.find({
      userId,
      ...dateFilter, // Include the date filter if present
    }).sort({ createdAt: -1 }); // Sort by creation date, descending

    res.status(200).json(userMoods);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
