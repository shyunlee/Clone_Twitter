import express from 'express'
import 'express-async-errors'
import * as tweetController from '../controller/tweet.js'

const router = express.Router()

router.get('/', tweetController.getTweets)

router.post('/', tweetController.createTweet)

router.get('/:id', tweetController.getTweetById)

router.put('/:id', tweetController.updateTweet)

router.delete('/:id', tweetController.deleteTweet)

export default router