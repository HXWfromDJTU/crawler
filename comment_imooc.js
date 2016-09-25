//引入两个必要的模块
var http = require('http');
var querystring = require('querystring');

//提交评论的时候，发送给服务器的表单数据，在这里要使用querystring的stringify方法将JSON数据序列化
var postData = querystring.stringify({
'content':'听完Scott的课，精神涨了百倍，（悄悄告诉你这是测试）',
'mid':	'8837'
})
//在此处配置请求头的必要信息
var options = {
	hostname: 'www.imooc.com',
	//一般来说默认为80，实际可以参考控制台网络面板的参数
	port: 80,
	//path的值是在主机名后面的url（不带参数）
	path: '/course/docomment',
	method: 'POST',
	//headers的信息需要从浏览器上copy下来，并且手动分隔好，cookie注意排在一行中
	headers: {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=94e7e50a-f45e-4a60-9027-cebccc18fc15; imooc_isnew=2; imooc_isnew_ct=1454398708; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1473513703,1473697375,1473816462,1473820044; bdshare_firstime=1461758410211; PHPSESSID=1qdfr7slm80sbf3jmv8v6d9vt3; cvde=57d8a7a2de9ed-10; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1473820044; IMCDNS=0; loginstate=1; apsid=kzMWE4NTk3MjBjYzA2Nzc1MDQ0ODllY2Y5NjEwZTEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjM5MjM0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0MDQ4MTM0NzFAcXEuY29tAAAAAAAAAAAAAAAAAAAAADYwMGQzZmMwM2IzMTVjZjU5NjU4YjE0N2IxNGJiMzlivqfYV76n2Fc%3DMz; last_login_username=404813471%40qq.com; jwplayer.qualityLabel=è¶æ¸; jwplayer.volume=100',
		'Host':	'www.imooc.com',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options, function(res) {
	console.log('status :' + res.statusCode);
	console.log('headers :' + JSON.stringify(res.headers));

	res.on('data', function(chunk) {
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof(chunk));
	})
	res.on('end', function() {
		console.log('执行完毕，但未必成功');
	})
});
req.on('error', function(e) {
	console.log('Error:' + e.message);
});
//添加上提交的表单数据
req.write(postData);
//手动停止请求
req.end();