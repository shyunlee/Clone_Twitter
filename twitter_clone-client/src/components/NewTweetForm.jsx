import React, { useState } from 'react';

const NewTweetForm = ({ tweetService, onError, onCreated, user }) => {
  const [tweet, setTweet] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet, user.username)
      .then(() => {
        setTweet('');
        // onCreated(created); ----> socket 으로 연결하여서 새로운 tweet이 생길때 자동으로 실시간 업뎃으로 추가되는 기능 추가되서 필요 없음
      })
      .catch(onError);
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <form className='tweet-form' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Edit your tweet'
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className='form-input tweet-input'
      />
      <button type='submit' className='form-btn'>
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;
