const redis = {
    // host: process.env.REDIS_HOST,
    // host: "qa-redis.regsvcs.theknot.com",
    host: 'localhost',
    port: 6379,
    // expired: Number(process.env.REDIS_EXPIRED),
    // expired: 60,
    expired: 10,
    lazyConnect: true,
    connectTimeout: 100,
    failedCount: 50,
    disabledMins: 60,
};

const key = process.env.KEY;

module.exports = {
    redis,
    key
}