# Firebase + React 프로젝트 생성 튜토리얼

#### 개요

 PWA프로젝트를 진행함에 있어서 Create-react-app 을 이용하면 손쉽게 React 프로젝트를 생성할 수 있습니다. 하지만 Create-react-app을 이용하면 service-worker.js를 customize하기 복잡하고 초반 학습 난이도가 매우 높기 때문에 Create-react-app을 이용하지 않고 기본 React 프로젝트를 우선 진행하였습니다.

#### 프로젝트 폴더 생성 및 Firebase init

```bash
mkdir project
cd project
firebase init
```

#### Firebase init 작업

```
? Are you ready to proceed? Yes

? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices.
 (*) Database: Deploy Firebase Realtime Database Rules
 ( ) Firestore: Deploy rules and create indexes for Firestore
 (*) Functions: Configure and deploy Cloud Functions
 (*) Hosting: Configure and deploy Firebase Hosting sites
>(*) Storage: Deploy Cloud Storage security rules

? Select a default Firebase project for this directory:
  [don't setup a default project]
> CoUPWA (coupwa)
  [create a new project]

? What file should be used for Database Rules? (database.rules.json)

? What language would you like to use to write Cloud Functions? (Use arrow keys)
> JavaScript
  
? Do you want to use ESLint to catch probable bugs and enforce style? (Y/n) No

? Do you want to install dependencies with npm now? (Y/n) Yes

? What do you want to use as your public directory? public

? Configure as a single-page app (rewrite all urls to /index.html)? No

? What file should be used for Storage Rules? (storage.rules)

=> +  Firebase initialization complete!
```

#### npm init

```bash
npm init
```

절차에 맞게 대답하여 생성

#### npm 패키지 설치

```bash
npm install -g webpack webpack-dev-server
npm install --save react
npm install --save react-dom
npm install --save babel-core babel-loader babel-preset-env babel-preset-react
npm install --save react-hot-loader webpack webpack-dev-server
npm install --save-dev style-loader css-loader
```

#### public/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Firebase Hosting</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

#### src/components/App.js

```javascript
import React, { Component } from 'react';

class App extends Component {
    render() {
        return <h1>hello</h1>;
    }
}
export default App;
```

#### src/index.js

```javascript
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.render(<App />, document.getElementById('root'));
```

#### webpack.config.js

```javascript
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        inline: true,
        host: '127.0.0.1',
        port: 4000,
        contentBase: __dirname + '/public/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['env', 'react']
                }
            },
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]'
/*				loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'*/
			}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
```

####package.json 수정

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev-server": "webpack-dev-server",
    "build": "webpack"
  }
```

#### 테스트

`npm run dev-server`

#### 빌드

`npm run build`



#### 출처

https://medium.com/@muthuks/setting-up-your-project-without-create-react-app-872ed782852a

https://github.com/studye/react/wiki/React-%EB%B9%8C%EB%93%9C%ED%95%98%EA%B8%B0

https://www.youtube.com/watch?v=gSwO2S-Q88s&list=PL9FpF_z-xR_GMujql3S_XGV2SpdfDBkeC&index=10





