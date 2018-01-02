// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';   //strict mode 선언
    
    //변수 선언 및 할당
  var app = {
    isLoading: true,          //로딩중임을 나타내는 변수
    visibleCards: {},         //보여지는 카드
    selectedCities: [],       //선택된 도시
    spinner: document.querySelector('.loader'),                         //html 문서의 loader를 가져옴
    cardTemplate: document.querySelector('.cardTemplate'),            //html 문서의 cardTemplate를 가져옴
    container: document.querySelector('.main'),                        //html 문서의 main을 가져옴
    addDialog: document.querySelector('.dialog-container'),           //html 문서의 dialog-container를 가져옴
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']   //요일 변수 설정
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  //refresh 버튼을 눌렀을 때의 동작
  document.getElementById('butRefresh').addEventListener('click', function() {
    // 날씨를 업데이트
    app.updateForecasts();
  });

  //add 버튼을 눌렀을 때의 동작
  document.getElementById('butAdd').addEventListener('click', function() {
    //도시 추가 창을 띄움
    app.toggleAddDialog(true);
  });

  //다이얼로그창에서 add city를 눌렀을 때의 동작
  document.getElementById('butAddCity').addEventListener('click', function() {
    //선택된 city를 추가
    var select = document.getElementById('selectCityToAdd');    //선택된 도시의 id 요소를 가져옴
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    // TODO app.selectedCities array 초기화
    app.getForecast(key, label);        //key와 label에 해당하는 날씨를 가져옴
    // TODO selected city를 배열에 넣고 저장
    app.toggleAddDialog(false);       //dialog에 추가
  });

  //add cancel을 눌렀을 때의 동작
  document.getElementById('butAddCancel').addEventListener('click', function() {
    // dialog 닫기
    app.toggleAddDialog(false);
  });


  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  //add dialog 표시/해제. true면 표시하고 false면 표시하지 않음
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  //날씨 카드 생성 메소드
  // Updates a weather card with the latest weather forecast. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateForecastCard = function(data) {
    var dataLastUpdated = new Date(data.created);     //date 객체 생성
    var sunrise = data.channel.astronomy.sunrise;     //일출 관련 정보 받아옴
    var sunset = data.channel.astronomy.sunset;       //일몰 관련 정보 받아옴
    var current = data.channel.item.condition;        //현재 상태에 대한 정보
    var humidity = data.channel.atmosphere.humidity;  //습도에 대한 정보
    var wind = data.channel.wind;                       //바람 정보

    var card = app.visibleCards[data.key];            //card 정보

      //card가 존재하지 않으면 생성
    if (!card) {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.location').textContent = data.label;
      card.removeAttribute('hidden');           //hidden 속성 제거
      app.container.appendChild(card);        //카드 추가
      app.visibleCards[data.key] = card;      //카드 리스트에 추가
    }
    
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');   //카드의 마지막 업데이트 시간을 가져옴
    var cardLastUpdated = cardLastUpdatedElem.textContent;        //text 가져옴

      //최신 날짜 업데이트
      if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      //현재 시간이 마지막 업데이트 시간보다 뒤일 경우 return
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
    cardLastUpdatedElem.textContent = data.created;       //최신 날짜 저장

    card.querySelector('.description').textContent = current.text;
    card.querySelector('.date').textContent = current.date;     //날짜
    card.querySelector('.current .icon').classList.add(app.getIconClass(current.code));

    //현재 온도
    card.querySelector('.current .temperature .value').textContent =
      Math.round(current.temp);

    //일출/일몰 설정
    card.querySelector('.current .sunrise').textContent = sunrise;
    card.querySelector('.current .sunset').textContent = sunset;

    //습도 구하기
    card.querySelector('.current .humidity').textContent =
      Math.round(humidity) + '%';

    //풍속 구하기
    card.querySelector('.current .wind .value').textContent =
      Math.round(wind.speed);

    //풍향 구하기
    card.querySelector('.current .wind .direction').textContent = wind.direction;

    //다음날
    var nextDays = card.querySelectorAll('.future .oneday');

    //오늘
    var today = new Date();
    today = today.getDay();

    //요일별로 구하기
    for (var i = 0; i < 7; i++) {
      var nextDay = nextDays[i];
      var daily = data.channel.item.forecast[i];
      if (daily && nextDay) {
        nextDay.querySelector('.date').textContent =
          app.daysOfWeek[(i + today) % 7];
        nextDay.querySelector('.icon').classList.add(app.getIconClass(daily.code));
        nextDay.querySelector('.temp-high .value').textContent =
          Math.round(daily.high);
        nextDay.querySelector('.temp-low .value').textContent =
          Math.round(daily.low);
      }
    }

    //로딩중일 경우 로딩 화면 출력
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };


  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  /*
   * Gets a forecast for a specific city and updates the card with the data.
   * getForecast() first checks if the weather data is in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getForecast() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */

  //날씨를 가져오는 메소드
  app.getForecast = function(key, label) {
    var statement = 'select * from weather.forecast where woeid=' + key;      //날씨 데이터를 가져오는 쿼리
      //yahoo api로 데이터 가져옴
    var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
        statement;
    // TODO 데이터를 캐시하는 부분 -> PWA에서 할 일

    // 가장 최근의 데이터 fetch
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        //연결이 정상적으로 되었을 경우 처리
        if (request.status === 200) {
          var response = JSON.parse(request.response);    //request를 parsing
          var results = response.query.results;
          results.key = key;
          results.label = label;
          results.created = response.query.created;
          app.updateForecastCard(results);            //result를 가지고 update
        }
      } else {
        // api 서버에 연결하지 못할 경우 기본 data 출력
        app.updateForecastCard(initialWeatherForecast);
      }
    };
    request.open('GET', url);
    request.send();
  };

  // 최신 데이터로 업데이트
  app.updateForecasts = function() {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function(key) {
      app.getForecast(key);
    });
  };

  // TODO saveSelectedCities function 추가

    //api에 따른 icon 설정
  app.getIconClass = function(weatherCode) {
    // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
    weatherCode = parseInt(weatherCode);
    switch (weatherCode) {
      case 25: // cold
      case 32: // sunny
      case 33: // fair (night)
      case 34: // fair (day)
      case 36: // hot
      case 3200: // not available
        return 'clear-day';
      case 0: // tornado
      case 1: // tropical storm
      case 2: // hurricane
      case 6: // mixed rain and sleet
      case 8: // freezing drizzle
      case 9: // drizzle
      case 10: // freezing rain
      case 11: // showers
      case 12: // showers
      case 17: // hail
      case 35: // mixed rain and hail
      case 40: // scattered showers
        return 'rain';
      case 3: // severe thunderstorms
      case 4: // thunderstorms
      case 37: // isolated thunderstorms
      case 38: // scattered thunderstorms
      case 39: // scattered thunderstorms (not a typo)
      case 45: // thundershowers
      case 47: // isolated thundershowers
        return 'thunderstorms';
      case 5: // mixed rain and snow
      case 7: // mixed snow and sleet
      case 13: // snow flurries
      case 14: // light snow showers
      case 16: // snow
      case 18: // sleet
      case 41: // heavy snow
      case 42: // scattered snow showers
      case 43: // heavy snow
      case 46: // snow showers
        return 'snow';
      case 15: // blowing snow
      case 19: // dust
      case 20: // foggy
      case 21: // haze
      case 22: // smoky
        return 'fog';
      case 24: // windy
      case 23: // blustery
        return 'windy';
      case 26: // cloudy
      case 27: // mostly cloudy (night)
      case 28: // mostly cloudy (day)
      case 31: // clear (night)
        return 'cloudy';
      case 29: // partly cloudy (night)
      case 30: // partly cloudy (day)
      case 44: // partly cloudy
        return 'partly-cloudy-day';
    }
  };

  //최초의 데이터
  var initialWeatherForecast = {
    key: '2459115',
    label: 'New York, NY',
    created: '2016-07-22T01:00:00Z',
    channel: {
      astronomy: {
        sunrise: "5:43 am",
        sunset: "8:21 pm"
      },
      item: {
        condition: {
          text: "Windy",
          date: "Thu, 21 Jul 2016 09:00 PM EDT",
          temp: 56,
          code: 24
        },
        forecast: [
          {code: 44, high: 86, low: 70},
          {code: 44, high: 94, low: 73},
          {code: 4, high: 95, low: 78},
          {code: 24, high: 75, low: 89},
          {code: 24, high: 89, low: 77},
          {code: 44, high: 92, low: 79},
          {code: 44, high: 89, low: 77}
        ]
      },
      atmosphere: {
        humidity: 56
      },
      wind: {
        speed: 25,
        direction: 195
      }
    }
  };
  // 최초의 데이터로 설정
  app.updateForecastCard(initialWeatherForecast);

  // TODO startup code 추가

  // TODO service worker code를 추가하는 부분
})();
