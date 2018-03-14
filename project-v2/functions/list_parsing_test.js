const request = require('request');
const cheerio = require('cheerio');

let url = "http://m.comic.naver.com/webtoon/list.nhn?titleId=";
    // 테스트용 인자(요일을 인자로 받음)
    //인자 테스트
    let titleId = process.argv[2];   
    let page = "&page=";
    let pagenum = process.argv[3]; 

    let webtoonURL = url + titleId + page + pagenum;

request(webtoonURL, function(error, response, body){
    if (error) throw error;

    //cheerio load
    let $ = cheerio.load(body);

    let list = $("ul.toon_lst");

    //각 회차 돌면서 가져옴
    list.each(function (){
    	let tooninfo = $(this).find('div.lst');

    	tooninfo.each(function(){
    		let img = $(this).find('img').attr('src');			//웹툰 배너 이미지 주소
    		let title = $(this).find('strong').text();			//각 화별 타이틀
    		let score = $(this).find('span.txt_score').text();	//별점
    		let date = $(this).find('span.if1').text();			//업데이트 날짜
    		
            //출력 테스트
    		console.log(img);
    		console.log(title);
    		console.log(score);
    		console.log(date);
            console.log();
    	});
    });
})
