module.exports = {
    type: 2,  //文件类型，1为csv，2为excel。必填
    filePathName: "./生产环境问题记录表.xlsx",  // 文件路径名称，必填
    mongoIP: "localhost",  // mongo连接的ip地址，必填
    mongoPort: "27017",  // mongo连接的端口号，必填
    dbName: "mymongo",  // 需要保存的数据库名称，必填
    collectionName: "tests",  // 需要保存的数据表名称，必填
    fileHead: true,  // 文件是否含首行（解释性）,如含首行，读取首行为字段名，如不含，须在下面headField定义字段名，必填
    headField: ["筛选日期", "问题现象"]  //fileHead为false，本行应含内容，且根据文件内容匹配 
}