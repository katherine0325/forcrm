module.exports = {
    system: 1, // 1为原系统，2为改造后系统
    fileName: "",  // 待执行文件名，必填
    faileFileName: "", // 失败数据生成的文件名，必填（可填路径）
    unExistsFileName: "",  // 电话号码在mongo中找不到生成的文件名，必填（可填路径）
    mongo: {
        ip: "",  // 必填
        port: '',  // 必填
        dbName: ''  // 必填
    },
    redis: {
        ip: "",  // 必填
        port: "",  // 必填
    }
}