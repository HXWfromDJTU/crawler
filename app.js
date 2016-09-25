var request = require('request'),
  cheerio = require('cheerio'), 
  URL_36KR = 'http://36kr.com/';			//36氪 
  Proxy = require('./proxylist.js'); 
/* 开启数据采集器 */
 function dataCollectorStartup() {		 
   dataRequest(URL_36KR);
 }
/* 数据请求 */
function dataRequest(dataUrl)
{
  request({
    url: dataUrl,
	proxy: Proxy.GetProxy(),	
    method: 'GET'
  }, function(err, res, body) { 
    if (err) {			
      console.log(dataUrl)
      console.error('[ERROR]Collection' + err);		
      return;			
    }
    switch(dataUrl)
    {
      case URL_36KR:
        dataParse36Kr(body);
        break;		
    }
  });	
}
/* 36kr 数据解析 */
function dataParse36Kr(body)
{
  console.log('============================================================================================');
  console.log('======================================36kr==================================================');
  console.log('============================================================================================');	
  var $ = cheerio.load(body);
  var  articles= $('.kr_article_list');
	 console.log($('.kr_article_list'));
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var feed_ul = $(article).find('.feed_ul');
    if(feed_ul.length == 0)
    {
      continue;
    }
    var coverDom = $('.kr_article_list').find('.load-img.fade');
    var titleDom = $(feed_ul).find('.intro h3 a');
    var timeDom = $(feed_ul).find('.time.h5_time');
    var titleVal =  titleDom.text();
    var urlVal = titleDom.attr('href');
    var timeVal = timeDom.text();
    var coverUrl = coverDom.attr('src');
    //处理时间
    var timeDateSecs = new Date(timeVal).getTime() / 1000;
    if(urlVal != undefined)
    {
       console.info('--------------------------------');
       console.info('标题：' + titleVal);
       console.info('地址：' + urlVal);
       console.info('时间：' + timeDateSecs);
       console.info('封面：' + coverUrl);				
       console.info('--------------------------------');
    }
  };
}
dataCollectorStartup()
//setInterval(dataCollectorStartup, 10000); 