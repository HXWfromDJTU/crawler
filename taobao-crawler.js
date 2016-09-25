var http = require('http');
var cheerio= require('cheerio');
var url = 'https://s.taobao.com/search?q=%E9%95%BF%E8%A3%A4';


//对DOM结构进行解析，并返回一个包含有所有信息的JSON数组
function  filterChapters(html) {
	//将http获取到的html信息交给cheerio解析
    var $ = cheerio.load(html);
	//设定最外层包裹
    var chapters = $('.chapter');
	//设计好最终打包好的JSON数据的结构
   /* [{
        chapterTitle:'',
        videos:[
            title:'',
            id:''
        ]
    }]*/
    var courseData = [];
	//使用最外层包裹进行整体的遍历
    chapters.each(function (item) {
		//声明每一次循环到的整体
        var chapter=  $(this);
        var chapterTitle = chapter.find('strong').text();
        var videos=chapter.find('.video').children('li')
		//此处设置最后要返回的数据结构，每一章的标题和每一章里面包括的视频视频信息
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        }
		//此处因为videos是一个JSON对象数组，包含videoTitle和id两个属性
        videos.each(function (item) {
            var video = $(this).find('.J-media-item');
            var videoTitle = video.text();
            var id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title:videoTitle,
                id:id
            })
        })
		//每获取完一章的信息，就往courseData里面追加
        courseData.push(chapterData);
    })
    return courseData;
}
//输出获取的信息
function printCourseInfo(courseData) {
    courseData.forEach(function (item) {
        var chapterTile = item.chapterTitle;
        console.log(chapterTile+'\n');

        item.videos.forEach(function (video) {
            console.log('  【'+video.id +'】' +video.title +'\n');
        })
    })
}

//使用http对象，获取整个html页面（包含数据和DOM结构）
http.get(url ,function(res){
    var html='';
    //每当有新的数据加载，就不断追加都html的后面
    res.on('data',function(data){
        html += data;
    })
	
    res.on('end',function(){
        //console.log(html)
		//获取到的html信息，传递给filterChapters方法进行处理
        var courseData = filterChapters(html);
        printCourseInfo(courseData);
    }).on('error',function () {
        console.log('获取失败');
    })
})