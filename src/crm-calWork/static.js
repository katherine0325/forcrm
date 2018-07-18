// 统计月线上bug量
var statiMonth = db.works.aggregate([
    {$group: {_id: "$create_month", count: {$sum: 1}}},
    {$sort: {_id: 1}}
]).toArray()
print('月线上bug量为：')
print(JSON.stringify(statiMonth, null, 2))
print(' ')

// 统计年后bug各部门比例
var total = db.works.find().count();
var crm = db.works.find({"责任归属方": "【CRM】"}).count();
var bigdata = db.works.find({"责任归属方": "【大数据】"}).count();
var mso = db.works.find({"责任归属方": "【平台】"}).count();
var yewu = db.works.find({"责任归属方": "【业务】"}).count();
var it = db.works.find({"责任归属方": "【IT部门】"}).count();
var outpack = db.works.find({"责任归属方": "【外包】"}).count();
var others = total - crm - bigdata - mso - yewu - it - outpack;
print("年后bug各部门比例：")
print('总量：' + total + ', CRM：' + crm + ', 大数据：' + bigdata + ', 平台：' + mso + ', 业务：' + yewu + ', IT部门：' + it + ', 外包：' + outpack + ', 其他：' + others)
print(' ')

// bug修复时长
var spendTimes = db.works.find({}, {_id: 0, spend_time: 1}).toArray()
print("bug修复时长：")
print(JSON.stringify(spendTimes, null, 2))


