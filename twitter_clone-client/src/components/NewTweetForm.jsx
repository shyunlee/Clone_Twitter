import React, { useState } from 'react';

const NewTweetForm = ({ tweetService, onError, onCreated, user }) => {
  const [tweet, setTweet] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet, user.username)
      .then((created) => {
        setTweet('');
        onCreated(created);
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
