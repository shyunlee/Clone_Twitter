import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Banner from './Banner';
import NewTweetForm from './NewTweetForm';
import TweetCard from './TweetCard';
import { useAuth } from '../context/AuthContext';

const Tweets = memo(({ tweetService, username, addable }) => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    tweetService
      .getTweets(username)
      .then((tweets) => setTweets([...tweets]))
      .catch(onError);

    const stopSync = tweetService.onSync((socket) => {
      if (socket.command === 'create') {
        onCreated(socket.data)
      }
       else if (socket.command === 'update') {
        onUpdate(socket.data)
      } else if (socket.command === 'delete') {
        onDelete(socket.data)
      }
    })

    return () => stopSync()
  }, [tweetService, username, user]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onDelete = (tweetId) => {
    setTweets((tweets) => tweets.filter(item => item.id !== tweetId))
  }

  const onUpdate = (updated) => {
    setTweets((tweets) => tweets.map((item) => (item.id === updated.id ? updated : item)))
  }

  const onUsernameClick = (tweet) => history.push(`/${tweet.username}`);

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <>
      {addable && (
        <NewTweetForm
          tweetService={tweetService}
          onError={onError}
          onCreated={onCreated}
          user = {user}
        />
      )}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {tweets.length === 0 && <p className='tweets-empty'>No Tweets Yet</p>}
      <ul className='tweets'>
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            tweetService={tweetService}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
    </>
  );
});
export default Tweets;
