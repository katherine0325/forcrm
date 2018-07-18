const cheerio = require('cheerio')
const urllib = require('urllib')
var fs = require('fs')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mymongo');
var MyModel = mongoose.model('zlzps', new mongoose.Schema({}, {strict: false}));

function download(url, callback) {
	urllib.request(url, function (err, data, res) {
	  if (err) {
	    console.log('error====', err)
	  }

	  if(data){
	  	callback(data.toString());
	  } else {
	  	console.log('done');
	  }
	  
	});
}

function fsFile(url, callback) {
    fs.readFile(url, function(err, result) {
        callback(result.toString())
    })
}

var count = 1;
var create_time = new Date();
var urls = [];
for(let i=1; i<65; i++) {
    urls.push('http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%B9%BF%E5%B7%9E&kw=%E5%89%8D%E7%AB%AF&isadv=0&sg=2ad2001cbe134ac6951cfd5db79ad41f&p=' + i)
}

urls.map(i => {
    download(i, function(data) {
        const $ = cheerio.load(data)

        $('table.newlist').each(function(i, e) {
            var positionname = $(e).find('tbody tr td.zwmc div a').text()
            var salary = $(e).find('tbody tr td.zwyx').text()
            var salaryArr = $(e).find('tbody tr td.zwyx').text().split('-').map(i => parseInt(i))
            var area = $(e).find('tbody tr td.gzdd').text()
            var company = $(e).find('tbody tr td.gsmc a').eq(0).text()

            var companyNature, companySize, experience, education;
            $(e).find('li.newlist_deatil_two span').each(function(i2, e2) {
                if(/公司性质：/.test($(e2).text())) {
                    companyNature = $(e2).text().replace('公司性质：', '')
                } else if(/公司规模：/.test($(e2).text())) {
                    companySize = $(e2).text().replace('公司规模：', '')
                } else if(/经验：/.test($(e2).text())) {
                    experience = $(e2).text().replace('经验：', '')
                } else if(/学历：/.test($(e2).text())) {
                    education = $(e2).text().replace('学历：', '')
                }
            });

            MyModel.create({
                positionname, 
                salary, 
                salaryArr, 
                area, 
                company, 
                companyNature,
                companySize,
                experience, 
                education, 
                city: '广州', 
                type: '前端', 
                create_time: create_time}, function(err, result) {
                console.log(count++)
            })            
        })
    })
})

