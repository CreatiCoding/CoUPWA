const admin = require('firebase-admin');
const functions = require('firebase-functions');
const request = require('request');
const cheerio = require('cheerio');

const url = "http://comic.naver.com/webtoon/weekday.nhn";

/**
 * 강희정s
 *  hello world 함수
 */
exports.getWeekdayWebtoon = functions.https.onRequest((req, res) => {
	//	TODO : request, response 맞추어 바꿀 것
    // request(url, function(error, res, body){
    // if (error) throw error;
    // // body에 html body 태그가 들어감
    // //테스트용 인자(요일을 인자로 받음)
    // const arg = process.argv[2];
    //
    // //cheerio load
    // const $ = cheerio.load(body);
    //
    // //7개의 column을 받아옴
    // const week = $("div.list_area div.col");
    //
    // //각 요일마다 돌면서 요일명과 요일별 웹툰명 가져옴
    // week.each(function (){
    //     let weekday = $(this).find('h4').attr('class');
    //
    //     //입력한 인자와 해당 요일이 같을 경우 웹툰명 출력
    //     if(arg == weekday)
    //     {
    //         let lists = $(this).find('div.thumb');  //div.thumb 안에 웹툰 썸네일, 웹툰 링크, 웹툰 명들이 있음
    //
    //         //웹툰명 출력
    //         lists.each(function (){
    //             let title = $(this).find("img").attr("title");
    //             console.log(title);
    //         });
    //         console.log();
    //     }
    // });
// });

});

exports.getUpdateStat = functions.https.onRequest((req, res) =>{

	let result = false;				//결과값
	const titleId = req.body.TitleId;

	request(url, (error, res, body) => {
		if(error) throw error;

		const $ = cheerio.load(body);		//cheerio load
		const week = $("div.list_area div.col_selected");		//오늘 날짜에 해당하는 column 받아옴

		week.each(function (){
			let lists = $(this).find('div.thumb');  //div.thumb 안에 웹툰 썸네일, 웹툰 링크, 웹툰 명들이 있음

			//웹툰들을 돌아가면서 업데이트가 되었는지 검사
			lists.each(function (){
				let title = $(this).find("img").attr("title");
				if(titleId == title)
				{
					if(($(this).find('em').attr("class")) == "ico_updt")
						result = true;
					else
						result = false;
					console.log(result);
				}
			});//리스트 탐색 for
		});
	});//end of request

	res.send(result);
});
