const router = require('express').Router();

const {getMealRecommendation} = require('../Controllers/mealRecommendation');

router.post('/mealPlan', getMealRecommendation);

module.exports = {router};