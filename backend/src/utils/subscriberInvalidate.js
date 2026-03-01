import client from "./redis.js";

export const subscriberInvalidate = async (channelId, ownerId) => {
  console.log("userId", channelId, ownerId);

  const result = await Promise.allSettled([
    client.del(`/api/v1/subscriptions/c/get-subscriber:${ownerId}`),
    client.del(`/api/v1/subscriptions/subscribe-btn/${ownerId}`),
    client.del(`/api/v1/subscriptions/get-all-subscriber/${ownerId}`),
    client.del(`/api/v1/subscriptions/stats:${ownerId}`),
    client.del(`/api/v1/subscriptions/pre-stats:${ownerId}`),
    client.del(`/api/v1/users/curr-user:${ownerId}`),
    client.del(`/api/v1/users/curr-user-by-id/${ownerId}`),
  ]);
  if (channelId !== ownerId) {
    const result1 = await Promise.allSettled([
      client.del(`/api/v1/subscriptions/c/get-subscriber:${channelId}`),
      client.del(`/api/v1/subscriptions/subscribe-btn/${channelId}:${ownerId}`),
      client.del(
        `/api/v1/subscriptions/get-all-subscriber/${channelId}:${ownerId}`,
      ),

      client.del(`/api/v1/subscriptions/stats:${channelId}`),
      client.del(`/api/v1/subscriptions/pre-stats:${channelId}`),
      client.del(`/api/v1/users/curr-user-by-id/${channelId}:${ownerId}`),
    ]);
    console.log(
      "resul1 of susbcription/////////////////",
      result1,
    );
  }

  // normalcall-invalidate -ownerid or channelid sam e-

  console.log("resul of susbcription/////////////////", result);
};
