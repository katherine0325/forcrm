const cheerio = require('cheerio')
const urllib = require('urllib')
var fs = require('fs')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mymongo');
var MyModel = mongoose.model('lagou', new mongoose.Schema({}, {strict: false}));

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
for(let i=1; i<31; i++) {
    urls.push('./找工作-互联网招聘求职网-拉勾网' + i + '.html')
}

urls.map(i => {
    fsFile(i, function(data) {
        const $ = cheerio.load(data)

        $('ul.item_con_list li.con_list_item').each(function(i, e) {
            var positionname = $(e).attr('data-positionname')
            var area = $(e).find('a span em').text()
            var format_time = $(e).find('span.format-time').text()
            var salary = $(e).attr('data-salary')
            var salaryArr = $(e).attr('data-salary').replace(/k/g, '').split('-').map(i => parseInt(i))
            var experienceAndEducation = $(e).find('div.p_bot div.li_b_l').text().split('\n')[2].trim().split(' / ')
            var experience = experienceAndEducation[0]
            var education = experienceAndEducation[1]
            var company = $(e).attr('data-company')
            var industryAndFinancing = $(e).find('div.company div.industry').text().replace('\n', '').trim().split(' / ')
            var industry = industryAndFinancing[0].split(',')
            var financing = industryAndFinancing[1]
            var tags = [];
            $(e).find('div.list_item_bot div.li_b_l span').each(function(i2, e2) {
                tags.push($(e2).text())
            })

            MyModel.create({
                positionname, 
                area, 
                format_time, 
                salary, 
                salaryArr, 
                experience, 
                education, 
                company, 
                industry, 
                financing, 
                tags, 
                city: '深圳', 
                type: '前端', 
                create_time: create_time}, function(err, result) {
                console.log(count++)
            })
        })
    })
})

