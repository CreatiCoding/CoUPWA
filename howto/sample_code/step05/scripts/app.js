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
  'use strict';	//strict mode 선언
  // 변수 선언 및 할당
  var app = {
    isLoading: true,	// 로딩중임을 나타내는 변수
    visibleCards: {},	// 보여지는 카드
    selectedCities: [],	// 선택된 도시
    spinner: document.querySelector('.loader'),	// html 문서의 loader를 가져옴
    // html 문서의 cardTemplate를 가져옴
    cardTemplate: document.querySelector('.cardTemplate'),	
    container: document.querySelector('.main'),	// html 문서의 main을 가져옴
    // html 문서의 dialog-container를 가져옴
    addDialog: document.querySelector('.dialog-container'),
    // 요일 변수 설
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
  };


  /****************정*************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  document.getElementById('butRefresh').addEventListener('click', function() {
    // Refresh 버튼을 눌렀을 때의 동작
    app.updateForecasts();	// 날씨를 업데이트
  });
  // add 버튼을 눌렀을 때의 동작
  document.getElementById('butAdd').addEventListener('click', function() {
    // 도시 추가 창을 띄움
    app.toggleAddDialog(true);
  });
  // 다이얼로그창에서 add city를 눌렀을 때의 동작
  document.getElementById('butAddCity').addEventListener('click', function() {
    // 선택된 city를 추가
    // 선택된 도시의 id 요소를 가져옴
    var select = document.getElementById('selectCityToAdd');	
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedCities) {	// 만약 선택된 도시가 없다면
      app.selectedCities = [];
    }
    // TODO app.selectedCities array 초기화
    app.getForecast(key, label);	// key와 label에 해당하는 날씨를 가져옴
    app.selectedCities.push({key: key, label: label});
    app.saveSelectedCities();
    // TODO selected city를 배열에 넣고 저장
    app.toggleAddDialog(false);	// dialog에 추가
  });
  // add cancel을 눌렀을 때의 동작
  document.getElementById('butAddCancel').addEventListener('click', function() {
    // 새로 추가된 도시 dialog 닫
    app.toggleAddDialog(false);
  });

기
  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // add dialog 표시/해체.
  app.toggleAddDialog = function(visible) {
    if (visible) {	// 표시
    // visible은 보여질지 말지를 표시
      app.addDialog.classList.add('dialog-container--visible');
    } else {	// 해체
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  // 최신 card 정보를 바탕으로 update 
  // 만약 그 card가 존재하지 않는다면, template로부터 clone
  app.updateForecastCard = function(data) {
    var dataLastUpdated = new Date(data.created);	// data 객체 생성
    var sunrise = data.channel.astronomy.sunrise;	// 일출 관련 정보
    var sunset = data.channel.astronomy.sunset;		// 일몰 관련 정보
    var current = data.channel.item.condition;		// 현재 상태에 대한 정보
    var humidity = data.channel.atmosphere.humidity;	// 습도에 대한 정보
    var wind = data.channel.wind;	// 바람 정보

    var card = app.visibleCards[data.key];	// card 정보
    if (!card) {	// card가 존재하지 않는 경우
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.location').textContent = data.label;
      card.removeAttribute('hidden');	// hidden 속성 제거
      app.container.appendChild(card);	// 카드 추가
      app.visibleCards[data.key] = card;	// 카드 리스트에 추가
    }
    // 새로운 data를 계속해서 저장
    // Verifies the data provide is newer than what's already visible
    // on the card, if it's not bail, if it is, continue and update the
    // time saved in the card
    // 카드의 마지막 업데이트 시간을 가져옴 
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;	// text 가져옴
    if (cardLastUpdated) {	// 최신 날짜 업데이트
      cardLastUpdated = new Date(cardLastUpdated);
      // 현재 시간이 마지막 업데이트 시간보다 뒤일 경우 return
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
    cardLastUpdatedElem.textContent = data.created;	// 최신 날짜 저장

    card.querySelector('.description').textContent = current.text;
    card.querySelector('.date').textContent = current.date;	// 날짜
    card.querySelector('.current .icon').classList.add(app.getIconClass(current.code));
    card.querySelector('.current .temperature .value').textContent =
      Math.round(current.temp);	// 현재 온도
    // 일출 설정
    card.querySelector('.current .sunrise').textContent = sunrise;
    // 일몰 설정
    card.querySelector('.current .sunset').textContent = sunset;
    card.querySelector('.current .humidity').textContent =
      Math.round(humidity) + '%';	// 습도 구하기
    card.querySelector('.current .wind .value').textContent =
      Math.round(wind.speed);	// 풍속 구하기
    card.querySelector('.current .wind .direction').textContent = wind.direction;	// 풍향 구하기
    var nextDays = card.querySelectorAll('.future .oneday');	// 다음날
    var today = new Date();	// 오늘
    today = today.getDay();
    for (var i = 0; i < 7; i++) {	// 요일별로 구하
      var nextDay = nextDays[i];
      var daily = data.channel.item.forecast[i];
      if (daily && nextDay) {기
        nextDay.querySelector('.date').textContent =
          app.daysOfWeek[(i + today) % 7];
        nextDay.querySelector('.icon').classList.add(app.getIconClass(daily.code));
        nextDay.querySelector('.temp-high .value').textContent =
          Math.round(daily.high);
        nextDay.querySelector('.temp-low .value').textContent =
          Math.round(daily.low);
      }
    }
    if (app.isLoading) {	// 로딩중일 경우 로딩 화면 출
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };


  /*****************************************************************************
   *
   * Methods for dealing with the model
   *력
   ****************************************************************************/

  /*
   * Gets a forecast for a specific city and updates the card with the data.
   * getForecast() first checks if the weather data is in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getForecast() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */
  app.getForecast = function(key, label) {	// 날씨를 가져오는 메소드
    // 날씨 데이터를 가져오는 쿼리
    var statement = 'select * from weather.forecast where woeid=' + key;
    var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
        statement;	// yahoo API로 데이터 가져옴
    // TODO add cache logic here

    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {	// 연결이 정상적으로 되었을 경우 처리
          var response = JSON.parse(request.response);	// request를 parsing
          var results = response.query.results;
          results.key = key;
          results.label = label;
          results.created = response.query.created;
          app.updateForecastCard(results);	// result를 가지고 update
        }
      } else {
        // Return the initial weather forecast since no data is available.
        app.updateForecastCard(initialWeatherForecast);
      }
    };
    request.open('GET', url);
    request.send();
  };

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updateForecasts = function() {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function(key) {
      app.getForecast(key);
    });
  };

  // TODO add saveSelectedCities function here
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };

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

  /*
   * Fake weather data that is presented when the user first uses the app,
   * or when the user has not saved any cities. See startup code for more
   * discussion.
   */
  var initialWeatherForecast = {	// 최초의 데이
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
  // TODO uncomment line below to test app with fake data
  // app.updateForecastCard(initialWeatherForecast);

  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  // TODO add startup code here
  app.selectedCities = localStorage.selectedCities;
  if (app.selectedCities) {
    app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  } else {
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data. A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();
  }

  // TODO add service worker code here
})();
