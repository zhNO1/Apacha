//导入模块
const fs = require('fs');
const http = require('http');
const path = require('path');
// 引入第三方模块 npm下载的
const mime=require('mime');
//记录网站更目录
let rootpath = path.join(__dirname, 'WWW');
//创建服务器
let server = http.createServer((request, response) => {
    //设置中文编码
    //   response.setHeader('Content-Type', 'text/html; charset=utf-8');
    //返回结果
    //  response.end('我是啦啦啦啦');
    //生成地址
    let targetpath = path.join(rootpath, request.url);
    //判断 存在
    if (fs.existsSync(targetpath)) {
        //判断文件是文件夹
      fs.stat(targetpath, (error, stats) => {
            // 是文件 直接读取 并返回
            if (stats.isFile()) {
                console.log(mime.getType(targetpath));
                //使用mine 设置类型
                  response.setHeader('content-type',mime.getType(targetpath))
                fs.readFile(targetpath, (error, data) => {
                    // 数据才读取完毕
                    response.end(data);
                })
            }
            // 是文件夹 渲染出列表
            if(stats.isDirectory()){
               console.log(request.url);
               //读取文件夹
               fs.readdir(targetpath,(error,files)=>{
                   let tem='';
                   //遍历li
                   for (let i = 0; i < files.length; i++) {
                       tem+=` <li>
                       <a href="${request.url}${request.url=='/'?'':'/'}${files[i]}">${files[i]}</a>
                   </li>`
                   }
                  // 读取完毕之后再返回
                   response.end(`
               <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
              <html>
              
              <head>
                  <title>Index of/ </title>
              </head>
              
              <body>
                  <h1>Index of ${request.url}</h1>
                  <ul>
                      ${tem}
                  </ul>
              </body>
              
              </html>`)
               })
               
            }
        });
    } else {
        //不存在 404
        response.statusCode = 404;
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
server.listen(8848, '192.168.38.62', () => {
    console.log("开启成功");
});