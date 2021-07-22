import * as authRepo from '../data/auth.js'

let tweets = [
    {
      id: '1',
      text: '드림코딩에서 강의 들으면 너무 좋으다',
      createdAt: '2021-05-09T04:20:57.000Z',
      // name: 'Bob',
      // username: 'bob',
      // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
      userId:'1'
    },
    {
      id: '2',
      text: 'hello world!',
      createdAt: '2021-05-10T04:20:37.000Z',
      // name: 'Jisoo',
      // username: 'jisoo',
      // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
      userId:'2'
    },
  ]

  export async function getAllTweets () {
    return Promise.all(
      tweets.map(async (tweet) => {
        const {username, name, url} = await authRepo.findById(tweet.userId)
        return {
          ...tweet,
          username,
          name,
          url
        }
      })
    )
  }

  export async function getByUsername (username) {
    return getAllTweets().then(tweetList => {
      return tweetList.filter(tweet => tweet.username === username)
    })
  }

  export async function create ({text, username}) {
    const {name, id, url} = await authRepo.findByUsername(username)
    const newTweet = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toString(),
      name,
      url,
      userId:id
    }
    tweets = [newTweet, ...tweets]
    return newTweet
  }

  export async function getById (tweetId) {
    return getAllTweets().then(tweetList => {
      return tweetList.filter(tweet => tweet.id === tweetId)
    })  }

  export async function update (tweetId, text) {
      const tweetFound = tweets.find((tweet) => tweet.id === tweetId)
      if (tweetFound) {
        tweetFound.text = text
      }
      return getById(tweetId)
  }

  export async function remove (tweetId) {
      tweets = tweets.filter((tweet) => tweet.id !== tweetId)
  }