var xlsx = require('node-xlsx');
var fs = require('fs');
var config = require('./config')
var mongoose = require('mongoose')
mongoose.connect(`mongodb://${config.mongoIP}:${config.mongoPort}/${config.dbName}`);
var MyModel = mongoose.model(config.collectionName, new mongoose.Schema({}, {strict: false}));

if(config.type === 2) {
    console.log("read excel……")
    var data = xlsx.parse(config.filePathName)[0].data;
} else {
    console.log("read csv……")
    var data = fs.readFileSync(config.filePathName).toString().split('\n').map(i => i.split(','));
}

console.log("compose data……")
if(config.fileHead) {
    var head = data[0];
    data.splice(0, 1);
} else {
    var head = config.fileHead;
}

var newdata = [];
data.map(i => {
    var json = {};
    head.map((j, jndex) => {
        json[j] = i[jndex]
    })
    newdata.push(json)
})

console.log("save in mongo……")
MyModel.create(newdata, function(err, result) {
    console.log("finish")
})

