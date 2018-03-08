module.exports = {
    type: 1,  //文件类型，1为csv，2为excel。必填
    filePathName: "/home/katherine/customerindexes_5461_grep.raw",  // 文件路径名称，必填
    mongoIP: "localhost",  // mongo连接的ip地址，必填
    mongoPort: "27017",  // mongo连接的端口号，必填
    dbName: "mymongo",  // 需要保存的数据库名称，必填
    collectionName: "grep_customers",  // 需要保存的数据表名称，必填
    fileHead: false,  // 文件是否含首行（解释性）,如含首行，读取首行为字段名，如不含，须在下面headField定义字段名，必填
    fileHead: ["nnn"]  //fileHead为false，本行应含内容，且根据文件内容匹配 
}
