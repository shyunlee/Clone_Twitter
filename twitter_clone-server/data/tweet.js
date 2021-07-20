let tweets = [
    {
      id: '1',
      text: '드림코딩에서 강의 들으면 너무 좋으다',
      createdAt: '2021-05-09T04:20:57.000Z',
      name: 'Bob',
      username: 'bob',
      url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
      id: '2',
      text: 'hello world!',
      createdAt: '2021-05-10T04:20:37.000Z',
      name: 'Sean',
      username: 'sean',
      url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
  ]

  export async function getAllTweets () {
      return tweets;
  }

  export async function getByUsername (username) {
      return tweets.filter((tweet) => tweet.username === username)
  }

  export async function create ({text, name, username}) {
    const newTweet = {
        text,
        name,
        username,
        id: Date.now().toString(),
        createdAt: new Date().toString()
    }
    tweets = [newTweet, ...tweets]
    return newTweet
  }

  export async function getById (tweetId) {
      return tweets.find((tweet) => tweet.id === tweetId)
  }

  export async function update (tweetId, text) {
      const tweetFound = tweets.find((tweet) => tweet.id === tweetId)
      tweetFound.text = text
      return tweetFound
  }

  export async function remove (tweetId) {
      tweets = tweets.filter((tweet) => tweet.id !== tweetId)
  }