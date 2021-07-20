export default class TweetService {
  // tweets = [
  //   {
  //     id: 1,
  //     text: '드림코딩에서 강의 들으면 너무 좋으다',
  //     createdAt: '2021-05-09T04:20:57.000Z',
  //     name: 'Bob',
  //     username: 'bob',
  //     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  //   },
  // ];
  constructor (http) {
    this.http = http
  }

  async getTweets(username) {
    const query = username ? `/?username=${username}` : ''
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
    })
  }

  async postTweet(text) {
    const tweet = {
      name: 'Sean',
      username: 'sean',
      text,
    }
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify(tweet),
    })
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
    })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({text})
    })
  }
}
