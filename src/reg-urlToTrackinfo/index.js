const uuid = require('uuid/v1');
const config = require('./config');
const urls = config.urls;

const getURLParameters = url =>
    url.match(/([^?=&]+)(=([^&]*))/g)
    .reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
);

// 解析url为json
const jsons = urls.map(i => {
    return getURLParameters(i)
})

// 将json解析为sql需要的格式
const str = jsons.map(i => {
    return `('${uuid().toUpperCase()}', '${i.st}', '${i.ss}', '${i.sp}', '${i.lt}', ((0)), (getdate()), '${config.story_id}', NULL, NULL, NULL, NULL)`
})

const insertStr = `
INSERT INTO dbo.trackInfo
(id, sourceType, sourceSection, sourcePlacement, landingType, isDeleted, createdAt, createdBy, updatedAt, updatedBy, name, consumer)
VALUES
` + str;

console.log(insertStr)