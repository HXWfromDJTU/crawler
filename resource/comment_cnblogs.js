//引入两个必要的模块
var http = require('http');
var querystring = require('querystring');

//提交评论的时候，发送给服务器的表单数据，在这里要使用querystring的stringify方法将JSON数据序列化
var postData = querystring.stringify({

	'blogApp': 'HXW-from-DJTU',
	'postId': 5581283,
	'body': 'nodejs测试评论4',
	'parentCommentId': 0

})

var options = {
	hostname: 'www.cnblogs.com',
	port: 80,
	path: '/mvc/PostComment/Add.aspx',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
		'Connection': 'keep-alive',
		//这里的Content-length的值必须是postData.length，否则服务器会认为长度不匹配，请求可能不予以通过
		'Content-Length': postData.length,
		'Content-Type': 'application/json; charset=UTF-8',
		'Cookie': '_ga=GA1.2.2118992586.1455376186; .CNBlogsCookie=DA0AF81784FFB6B020462BF91D9B23EE624B2700443BFDE571002 A6909C11941A5BC62FC9BBB7D75E66EE399F6BB69997478F1343AC6862366D7C2E6C93E867B9DFE66B6C59FB53F911C52CEC213A46EE9E1404595663684A5FF9DE2F2E6388A348E0C34;__gads = ID = edf25cc8ebcd5c1e: T = 1455376689: S = ALNI_MYLw6aVYC__1RET5y2ZBKKxnQIs7w;lhb_smart_0 = 1;CNZZDATA5152012 = cnzz_eid % 3 D671542499 - 1461248149 - http % 253 A % 252 F % 252 Fwww.baidu.com % 252 F % 26 ntime % 3 D1461248149;Hm_lvt_674430fbddd66a488580ec86aba288f7 = 1462330999,1463212292;CNZZDATA4343144 = cnzz_eid % 3 D325158701 - 1462330997 - http % 253 A % 252 F % 252 Fwww.baidu.com % 252 F % 26 ntime % 3 D1463212292;Hm_lvt_1628f7c8d025473b441a8ba490edd441 = 1463827868;__utma = 226521935.2118992586 .1455376186 .1472825105 .1473571957 .7;__utmz = 226521935.1473571957 .7 .5.utmcsr = baidu | utmccn =(organic) | utmcmd = organic;lzstat_uv = 23076949942367081242 | 2817822;CNZZDATA4685779 = cnzz_eid % 3 D373613398 - 1469671644 - null %26 ntime % 3 D1469671644;Hm_lvt_804a4044fd9bd05b8869aa06535c0a4a = 1469687324;CNZZDATA696548 = cnzz_eid % 3 D1872934834 - 1469761854 - null %26 ntime % 3 D1469761854;CNZZDATA1000042812 = 846843777 - 1471096633 - http % 253 A % 252 F % 252 Fcaibaojian.com % 252 F %7 C1471096633;CNZZDATA1259286380 = 1709232266 - 1471962224 - http % 253 A % 252 F % 252 Fzzk.cnblogs.com % 252 F % 7 C1471962224;CNZZDATA1259029673 = 600687103 - 1471966759 - null % 7 C1471966759;lhb_smart_1 = 1;bdshare_firstime = 1473472237245 ',
		'Host': 'www.cnblogs.com',
		'Referer': 'http://www.cnblogs.com/HXW-from-DJTU/p/5581283.html',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0',
		'X-Requested-With': 'XMLHttpRequest'
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

req.end();