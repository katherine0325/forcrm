## 方便没有redis-cli的地方获取key之类的

#keys
KEY=keyname node keys.js

## get
KEY=keyname node get.js

## set
KEY=keyname VAL=value node set.js

## del
KEY=keyname node del.js

## 其他
KEY=keyname node index.js
这个命令特殊，用来每秒循环get key的值
