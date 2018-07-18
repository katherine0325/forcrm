const config = require('./config');
const RedisClient = require('./redis');

const start = async () => {
    let index = 0;
    const redisClient = new RedisClient();
    setInterval(async () => {
        const value = await redisClient.get(config.key);
        if(value == 'success') {
            index ++;
            console.log(value + ', ' + index + ' seconds')
        } else {
            console.log(value)
        }
    }, 1000)
}

start()

