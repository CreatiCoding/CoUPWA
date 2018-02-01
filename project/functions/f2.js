const admin = require('firebase-admin');
const functions = require('firebase-functions');
const req = require('request');
const cheerio = require('cheerio');

const url = "http://comic.naver.com/webtoon/weekday.nhn";

/**
 * 강희정s
 *  hello world 함수
 */
exports.helloWorld2 = functions.https.onRequest((request, response) => {
    req(url, function(error, res, body){
    if (error) throw error;
    // body에 html body 태그가 들어감
    //테스트용 인자(요일을 인자로 받음)
    var arg = process.argv[2];      //TODO: 인자값 수정할 것

    //cheerio load
    var $ = cheerio.load(body);

    //7개의 column을 받아옴
    var week = $("div.list_area div.col");

    //각 요일마다 돌면서 요일명과 요일별 웹툰명 가져옴
    week.each(function (){
        var weekday = $(this).find('h4').attr('class');

        //입력한 인자와 해당 요일이 같을 경우 웹툰명 출력
        if(arg == weekday)
        {
            var lists = $(this).find('div.thumb');  //div.thumb 안에 웹툰 썸네일, 웹툰 링크, 웹툰 명들이 있음

            //웹툰명 출력
            lists.each(function (){
                var title = $(this).find("img").attr("title");
                console.log(title);         //TODO: console이 아닌 반환되어야 하는 값으로 출력할 것
            });
            console.log();  //TODO: console이 아닌 반환되어야 하는 값으로 출력할 것
        }
    });
})

});
