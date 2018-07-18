### 量化工作

01. 线上月bug量
02. 统计年后bug各部门比例
03. bug解决时长


### 执行方式

01. 将生产bug表格导出
02. 放入saveExcel文件夹，将excel写入mongo表
config配置：
```json
{
    "filePathName": "./生产环境问题记录表.xlsx",
    "mongoIP": "localhost",
    "mongoPort": "27017",
    "dbName": "mymongo",
    "collectionName": "works",
    "fileHead": true,
    "headField": ["筛选日期", "问题现象"]
}
```
03. 运行compose.js将数据清洗
```shell
	cd /c/Program\ Files/MongoDB/Server/3.2/bin/
	./mongo localhost:27017/mymongo /f/internet/forcrm/src/calWork/compose.js
```
	tips：01. 多余的（没有内容）的数据删除
		02. 生成create_month像，将数据练出对应月份
04. 运行static.js统计数据内容
```shell
	cd /c/Program\ Files/MongoDB/Server/3.2/bin/
	./mongo localhost:27017/mymongo /f/internet/forcrm/src/calWork/static.js
```
