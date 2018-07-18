const config = require('./config');
const ioredis = require('ioredis');
const _ = require('lodash');

class RedisClient {
  constructor() {
    this.redisClient = null;
  }

  async get(key) {
    await this.connect();
    const value = await this.redisClient.get(key);
    return value;
  }

  async keys() {
    await this.connect();
    const value = await this.redisClient.keys('**');
    return value;
  }

  async set(key, value) {
    await this.connect();
    const result = await this.redisClient.set(key, value);
    return result;
  }

  async del(key) {
    await this.connect();
    const result = await this.redisClient.del(key);
    return result;
  }

  quit() {
    if (!_.isNil(this.redisClient)) {
      return new Promise(resolve => this.redisClient.quit(() => resolve()));
    }
  }

  async connect() {
    if (_.isNil(this.redisClient)) {
      try {
        this.redisClient = new ioredis(config.redis);
        this.redisClient.on('error', (error) => {
          console.log('on err ===', error)
        });
        await this.redisClient.connect();
      } catch (error) {
        console.log('err ===', error)
      }
    }
  }
}

module.exports = RedisClient;
