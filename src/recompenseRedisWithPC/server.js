var co = require("co")
var fs = require('fs')
var config = require('./config')
var mongoose = require('mongoose')
mongoose.connect(`mongodb://${config.mongo.ip}:${config.mongo.port}/${config.mongo.dbName}`);
if(config.system === 1) {
    var pcM = mongoose.model(`project_customers_${config.project_id}`, new mongoose.Schema({}, {strict: false}));
} else {
    var pcM = mongoose.model("project_customers", new mongoose.Schema({}, {strict: false}));
}

var failPhones = [];
var unExistsPhones = [];

co(function*() {
    // 读取文件
    console.log('read File...')
    var phones = fs.readFileSync('./phoneindexs_0076a_grep.raw').toString().split('\n');
    phones.splice(phones.length - 1, 1);

    // 从mongo中拉取出电话号码和_id，补偿redis
    console.log('recompose redis...')
    yield phones.map(phone => recomposeRedis(phone))

    // 将失败和不存在的数据写成文件
    if(failPhones.length) {
        console.log('write file of faile phones...')
        fs.writeFileSync(failPhones, config.faileFileName)
    }
    if(unExistsPhones.length) {
        console.log('write file of unexists phones...')
        fs.writeFileSync(unExistsPhones, config.unExistsFileName)
    }
    if(!failPhones.length && !unExistsPhones.length) {
        console.log('all phones success')
    }

    console.log('finish')
})

function recomposeRedis(phone) {
    return new Promise((res, rej) => {
        if(config.system === 1) {
            var params = {"电话号码": phone};
            var feedback = {_id: 1, "电话号码": 1}
        } else {
            var params = {
                project_id: config.project_id,
                phone: phone
            }
            var feedback = {_id: 1, phone: 1}
        }

        pcM.findOne(params, feedback, function(err, result) {
            if(err) {
                console.log('find the phone in mongo throw error: ' + phone)
                failPhones.push(phone)
                res()
            } else if(result) {
                redisClient.hset(key, phone, result._id, function(redis_err, redis_res) {
                    if(redis_err) {
                        console.log('hset the redis failed: ' + phone)
                        failPhones.push(phone)
                        res()
                    } else {
                        res()
                    }
                })
            } else {
                console.log('could not find the phone in mongo: ' + phone)
                unExistsPhones.push(phone)
                res()
            }
        })
    })
}
