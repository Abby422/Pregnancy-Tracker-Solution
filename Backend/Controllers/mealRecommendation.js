const { CohereClient } = require("cohere-ai");
require("dotenv").config();

const cohere = new CohereClient({
  token: process.env.API_KEY,
});

module.exports = {
  getMealRecommendation: async (req, res) => {
    try {
      const response = await cohere.generate({
        model: "command-nightly",
        prompt:
          "write a meal plan recommendation for a week including breakfast, lunch and supper for a woman who is pregnant in their first trimester ",
        maxTokens: 3330,
        temperature: 1.2,
        k: 0,
        stopSequences: [],
        returnLikelihoods: "NONE",
      });
      console.log(`Prediction: ${response.generations[0].text}`);

      res.status(200).json({ prediction: response.generations[0].text });
    } catch (error) {
      console.error("Error generating meal recommendation:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
