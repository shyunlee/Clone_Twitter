import * as tweetRepo from '../data/tweet.js'

export async function getTweets (req, res) {
    try {
        if (req.query.username) {
            const filteredTweets = await tweetRepo.getByUsername(req.query.username)
            return res.status(200).json(filteredTweets)
        }
        res.status(200).send(await tweetRepo.getAllTweets())
    } catch (error) {
        res.sendStatus(404)
    }
}

export async function createTweet (req, res) {
    console.log(req.body)
    try {
        const newTweet = await tweetRepo.create(req.body)
        res.status(201).json(newTweet)
    } catch (error) {
        res.sendStatus(404)
    }
}

export async function getTweetById (req, res) {
    try {
        const tweetFound = await tweetRepo.getById(req.params.id)
        if (tweetFound) {
            res.status(200).json(tweetFound)
        } else {
            res.status(404).json({message: 'tweet id not found'})
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

export async function updateTweet (req, res) {
    try {
        const tweetId = req.params.id
        const text = req.body.text
        const updatedTweet = await tweetRepo.update(tweetId, text)
        res.status(200).json(updatedTweet)
    } catch (error) {
        res.sendStatus(404)
    }
}

export async function deleteTweet (req, res) {
    try {
        await tweetRepo.remove(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(404)
    }
}