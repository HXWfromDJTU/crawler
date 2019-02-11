var request = require('request'),
  cheerio = require('cheerio'), 
  URL_36KR = 'http://36kr.com/';			//36� 
  Proxy = require('./proxylist.js'); 
/* �������ݲɼ��� */
 function dataCollectorStartup() {		 
   dataRequest(URL_36KR);
 }
/* �������� */
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
/* 36kr ���ݽ��� */
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
    //����ʱ��
    var timeDateSecs = new Date(timeVal).getTime() / 1000;
    if(urlVal != undefined)
    {
       console.info('--------------------------------');
       console.info('���⣺' + titleVal);
       console.info('��ַ��' + urlVal);
       console.info('ʱ�䣺' + timeDateSecs);
       console.info('���棺' + coverUrl);				
       console.info('--------------------------------');
    }
  };
}
dataCollectorStartup()
//setInterval(dataCollectorStartup, 10000); 