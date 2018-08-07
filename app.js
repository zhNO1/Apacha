//导入模块
const fs=require('fs');
const http=require('http');
const path=require('path');
//记录网站更目录
let rootpath=path.join(__dirname,'WWW');
//创建服务器
let server=http.createServer((request,response)=>{
          //设置中文编码
         response.setHeader('Content-Type', 'text/html; charset=utf-8');
          //返回结果
         // response.end('hello world');
          response.end('我是啦啦啦啦');
    })
     // 开启监听 启动
     server.listen(8848,'192.168.38.62',()=>{
         console.log("开启成功");    
     });