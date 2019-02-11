var Crawler = require("crawler");
var cheerio = require("cheerio");
var http = require('http');

let getData  = new Promise(resolve=>{
    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                console.log($("title").text());
            }
            done();
        }
    });
    
    // 请求百度热点热词
    c.queue([{
        uri: 'http://www.wmxhpf.com/',
        jQuery: false,
        // The global callback won't be called
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {  
                     // 标题
                     let titleArr = [];
                     // 内容
                     let contentArr = [];
                     // 字段映射
                     let mapper = {
                         0:'name',          // 名称
                         1:'',
                         2:'color',        // 颜色
                         3:'volum',         // 单位
                         4:'classA_price',   // A级别价格
                         5:'classB_price',  // B级别价格
                         6:'classC_price', // C级别价格
                         7:'trend'         // 走势
                     }
                     var html = res.body;
                     //console.log(html)
                     $ = cheerio.load(html);
                     var titles = $('.qright .rxt.fl.pric span');
                     titles.each((index, ele)=>{
                        titleArr.push($(ele).text());
                    });
                     var contents = $('.qright .fl.tabl table');
                     contents.each((i,table)=>{
                         let classData = {};
                         classData.title = titleArr[i%6];  // 分类title  
                         classData.data = [];
                         // 拆分行数据
                         let rows  = $(table).find('tr');
                         rows.each((i,row)=>{
                            let rowData = {};
                            // 拆分单元格数据
                            $(row).find('td').each((i,ele)=>{
                                let text;
                                if($(ele.children)[0].tagName === 'a'){
                                    text = $(ele).find('a').text();
                                }else{
                                    text = $(ele).text();
                                }
                                rowData[mapper[i%8]] = text;
                             })
                             classData.data.push(rowData)  // 行数据装箱
                            })
                            contentArr.push(classData);   // 分类数据装箱
                        })
                     resolve(contentArr)
            }
            done();
        }
    }]);    
})

http.createServer(function (request, response) {
        // 发送 HTTP 头部 
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
         response.writeHead(200, {'Content-Type': 'application/json'});
         getData.then(data=>{
           // 发送响应数据 "Hello World"
          let res = JSON.stringify(data);
          response.end(res);
         })
}).listen(9527);


