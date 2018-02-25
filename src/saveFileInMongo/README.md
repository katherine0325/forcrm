读取excel文件，并将其存入mongo中，config.js中的配置分别给excel文件位置和需要导入mongo的数据库名称和表名称

excel文件要求
01. 只能导入第一个工作表，如果有多个，请手工调整工作表位置并修改config.js

运行方式 填写config.js 然后 node sever.js