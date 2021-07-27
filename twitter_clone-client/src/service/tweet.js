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
  constructor (http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getTweets(username) {
    const query = username ? `/?username=${username}` : ''
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      headers: this.getHeaders()
    })
  }

  async postTweet(text, username) {
    const tweet = {
      username,
      text,
    }
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify(tweet),
      headers: this.getHeaders()
    })
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({text}),
      headers: this.getHeaders()
    })
  }

  getHeaders() {
    const token = this.tokenStorage.getToken()
    return {
      Authorization: `Bearer ${token}`
    }
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback)
  }
}
