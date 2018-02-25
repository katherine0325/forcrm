### 补偿redis key PHONEINDEXES CUSTOMERINDEXES

01. 查看文件是否超过1万行
```shell
wc -l phoneindexs_0076a_grep.raw
```

02. 如过超过一万行，则将其切分为多个文件，逐一进行
```shell
split -l 10000 phoneindexs_0076a_grep.raw phonesplit_
```
tips: 最后一个参数为切割后的文件名前缀

01. 填写config.js
02. node sever.js
03. 如有失败文件，修改config.js，将其再次执行
04. 将执行结果复制或生成文件邮件汇报