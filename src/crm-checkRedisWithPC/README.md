### 查找项目下电话号码是否缺失redis key PHONEINDEXES 和 CUSTOMERINDEXES

01. 通过redis导出相关项目的redis
```shell
echo "hgetall test.astercc.com:R:PHONEINDEXES:5a1cc1a75fc2fe7f41e0076a:H" | redis-cli -h 10.24.148.49 -p 6380 >> phoneindexes_0076a.raw
echo "hgetall test.astercc.com:R:CUSTOMERINDEXES:5a1cc1a75fc2fe7f41e0076a:H" | redis-cli -h 10.24.148.49 -p 6380 >> customerindexes_0076a.raw
```
tips: 
    1) test.astercc.com要根据实际情况变更，如生产环境应变为crm.mshuoke.com
    2) 项目ID应根据实际情况变更
    3）ip地址和端口号应根据实际情况变更
    3）导出的文件地址或文件名应根据实际情况变更，其中尾数的0076a为项目后5位数

02. 人工视线查找是否有漏key（本步骤也可省略）
03. 将遗漏的key筛选出来给开发补key
```shell
grep -B 1 '^$' ./phoneindexes_0076a.raw | grep -v '^$' | grep -v - >> phoneindexes_0076a_grep.raw
grep -A 1 '^$' ./customerindexes_0076a.raw | grep -v '^$' | grep -v - >> customerindexes_0076a_grep.raw
```

    tip: 
    1) -A 为打印前面的行数， -B为打印后面的行数。'^$'为空行的正则表达式
    2）文件名应根据实际情况变更
04. 将结论及上一步文件向上汇报并抄送给开发(如没有漏key则直接回复结论即可)