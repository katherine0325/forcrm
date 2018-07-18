const cheerio = require('cheerio')
const urllib = require('urllib')
var fs = require('fs')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mymongo');
var MyModel = mongoose.model('lagou', new mongoose.Schema({}, {strict: false}));

var count = 1;
var create_time = new Date();

var query = [];
for(let i=1; i<4; i++) {
    query.push({
        kd: 'node',
        pn: i
    })
}
for(let i=1; i<31; i++) {
    query.push({
        kd: '前端',
        pn: i
    })
}

console.log(query)

// query.map(i => {
//     urllib.request("https://www.lagou.com/jobs/positionAjax.json", {
//         method: 'POST',
//         headers: {
//             "Accept":"application/json, text/javascript, */*; q=0.01",
//             "Accept-Encoding":"gzip, deflate, br",
//             "Accept-Language":"zh-CN,zh;q=0.9",
//             "Cache-Control":"no-cache",
//             "Connection":"keep-alive",
//             "Content-Length":24,
//             "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
//             "Cookie":"JSESSIONID=ABAAABAAAGGABCB5C1FA314C4873E04E128642797BFFCE3; _gat=1; user_trace_token=20180319224913-b0da3751-2b84-11e8-b53c-5254005c3644; PRE_UTM=; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DO9R_INOdRa-AAXP5zXOa-G64f3k6OabUSHfSlW3IWee%26wd%3D%26eqid%3Db362f93c00011802000000045aafcde4; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2F; LGUID=20180319224913-b0da3a6f-2b84-11e8-b53c-5254005c3644; index_location_city=%E5%B9%BF%E5%B7%9E; hideSliderBanner20180305WithTopBannerC=1; TG-TRACK-CODE=index_search; SEARCH_ID=8062951679054295a9f032d634c24bfc; _gid=GA1.2.243383357.1521470950; _ga=GA1.2.1202099392.1521470950; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1521470950; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1521470957; LGSID=20180319224913-b0da38e5-2b84-11e8-b53c-5254005c3644; LGRID=20180319224921-b52f94ff-2b84-11e8-b53c-5254005c3644",
//             "Host":"www.lagou.com",
//             "Origin":"https://www.lagou.com",
//             "Pragma":"no-cache",
//             "Referer":"https://www.lagou.com/jobs/list_node?labelWords=&fromSearch=true&suginput=",
//             "User-Agent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36",
//             "X-Anit-Forge-Code":0,
//             "X-Anit-Forge-Token":"None",
//             "X-Requested-With":"XMLHttpRequest"
//         },
//         data: {
//             city: "广州",
//             needAddtionalResult: false,
//             isSchoolJob: 0
//         },
//         nestedQuerystring: JSON.stringify({
//             first: false,
//             pn: i.pn,
//             kd: i.kd
//         })
//     }, function (err, data, res) {
//         if (err) {
//             console.log('error====', err)
//         }

//         if(data){
//             var results = JSON.parse(data.toString()).content.positionResult.result;

//             results.map(j => {
//                 MyModel.create(Object.assign({city: '广州', type: '前端', create_time: create_time}, j), function(err, result) {
//                     console.log(count++)
//                 })
//             })
//         } else {
//             console.log('done');
//         }
//     });
// })