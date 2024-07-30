const redis = require('redis');
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
  });
  
  redisClient.on('error', (err) => {
    console.error('Error occurred while connecting or accessing Redis server:', err);
  });
  
  redisClient.on('connect', () => {
    console.log('Connected to Redis server');
  });



module.exports = redisClient;