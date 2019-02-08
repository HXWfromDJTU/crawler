var Crawler = require("crawler");
var cheerio = require("cheerio");

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
    uri: 'http://top.baidu.com/mobile_v2/buzz/hotspot',
    jQuery: false,
    // The global callback won't be called
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var data = JSON.parse(res.body);
            var records = data.result.topwords;
            records.length =1;
            for (let i of records) {
                var word = i.keysword;
                // 请求百度热点热词
                c.queue([{
                    uri: 'https://www.baidu.com/s?wd=' + word,
                    headers:{
                        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
                     },
                    jQuery: false,
                    // The global callback won't be called
                    callback: function (error, res, done) {
                        if (error) {
                            console.log(error);
                        } else {
                            var data = res.body;
                            console.log(data)
                        }
                        done();
                    }
                }]);
            }
        }
        done();
    }
}]);





// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);