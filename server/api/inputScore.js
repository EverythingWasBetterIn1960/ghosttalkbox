const router = require('express').Router()
const pd = require('paralleldots')
module.exports = router
pd.apiKey = process.env.PARALLELDOTS_KEY

/**
 * The Input Score API end point receives input from the users and returns an object representing the sentiment score for the input. This score will inform the next interaction presented to the user.
 *
 * This endpoint uses the ParallelDots API for sentiment scoring and translates the response from ParallelDots into a JSON object containing specifically the relevant scores
 *
 */

router.post('/', async (req, res, next) => {
  try {
    const {input} = req.body
    if (typeof input !== 'string') {
      throw new Error('Input must be a string')
    }
    //get the sentiment response from ParallelDots
    const sentimentResponse = await pd.sentiment(input)
    //convert the response to JSON
    let sentimentScore = JSON.parse(sentimentResponse)

    const {negative, neutral, positive} = sentimentScore.probabilities

    const score = {
      negative: negative * 100,
      positive: positive * 100,
      neutral: neutral * 100
    }
    res.send(score)
  } catch (err) {
    next(err)
  }
})
