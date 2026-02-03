import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/tweets";
export const uploadTweet = async (userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${BASE_URL}/create-tweet`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of created tweet: ", response.data);
    return response;
  } catch (err) {
    console.log("Tweet created failed", err);
    throw err
  }
};

export const TweetPageApi = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/tweets-page/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of created tweet: ", response.data);
    return response;
  } catch (err) {
    console.log("Tweet created failed", err);
    throw err
  }
};
export const TweetByTweetId = async (tweetId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/c/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of tweet fetch by tweet-id: ", response.data);
    return response;
  } catch (err) {
    console.log("Tweet fetch failed by its id",err);
    throw err;
  }
};
export const SortedTweet = async (page) => {
  try {
    console.log("frontend page value: 🔎", page);

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/subscriber-tweet?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response of tweet fetch by tweet-id: ", response.data);
    return response;
  } catch (err) {
    console.log("Tweet fetch failed by its id",err);
    throw err;
  }
};
export const TweetDelete = async (TweetId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${BASE_URL}/c/${TweetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of deletes tweet: ", response.data);
    return response;
  } catch (err) {
    console.log("Tweet created failed", err);
     throw err;
  }
};
export const UpdateDelete = async (TweetId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(`${BASE_URL}/c/${TweetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of deletes tweet: ", response.data);
    return response;
  } catch (err) {
    console.log("Tweet created failed", err);
     throw err;
  }
};
