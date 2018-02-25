// 删除多余的内容
db.works.remove({"筛选日期": {$exists: false}})

// 添加月份
db.works.find().forEach(function(i) {
    db.works.update({_id: i._id}, {$set: {create_month: new Date(1900, 0, i["筛选日期"]).getFullYear() + '-' + (new Date(1900, 0, i["筛选日期"]).getMonth() + 1)}}, false, true)
})