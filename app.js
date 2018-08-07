//导入模块
const fs=require('fs');
const http=require('http');
const path=require('path');
//记录网站更目录
let rootpath=path.join(__dirname,'WWW');
//创建服务器
let server=http.createServer((request,response)=>{
          //设置中文编码
      //   response.setHeader('Content-Type', 'text/html; charset=utf-8');
          //返回结果
        //  response.end('我是啦啦啦啦');
        //生成地址
        let targetpath=path.join(rootpath,request.url);
        //判断 存在
        if(fs.existsSync(targetpath)){
            //判断文件是文件夹
            let stats=fs.stat(targetpath);
             response.end('exist');
        }else{
            //不存在 404
             response.statusCode=404;
             response.setHeader('Content-Type', 'text/html; charset=utf-8');
              response.end(`
              <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
              <html><head>
              <title>404 Not Found</title>
              </head><body>
              <h1>Not Found</h1>
              <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
              </body></html>`);
        }
    })
     // 开启监听 启动
     server.listen(8848,'192.168.38.62',()=>{
         console.log("开启成功");    
     });