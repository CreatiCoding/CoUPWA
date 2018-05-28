# [Create React App]  pwa service-worker 이슈

## 서론

 Create React App은 이미 sw-precache-webpack-plugin을 이용하여 PWA를 사용하고 있습니다.
	자세한 내용: [sw-precache-webpack-plugin](https://github.com/goldhand/sw-precache-webpack-plugin)

![image-20180529050952880](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529050952880.png)

 Create React App은 Serviceworker.js파일을 포함하여 Webpack.config.js파일까지 사용자에게 보여주지 않고 캡슐화를 하였습니다. 따라서 우리가 직접 이를 내부적으로 조작하기에는 어려움이 따랐습니다. 이 이유가 초반에 Create React App을 이용하여 service worker를 사용하기 어려웠던 부분입니다.
	자세한 내용: [npm-run-eject](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject)

![image-20180529051012310](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529051012310.png)

## 본론

 우리는 정적 리소스(앱셸)과 동적 리소스(컨텐츠)를 동시에 다뤄야 했고 이 두개의 리소스들은 sw-precache와 sw-toolbox를 통해 제어할 수 있음을 알아냈습니다.
	자세한 내용: [sw-precache-and-sw-toolbox](https://github.com/GoogleChromeLabs/sw-precache/blob/master/sw-precache-and-sw-toolbox.md)

![image-20180529051032147](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529051032147.png)

 하지만 Create React App은  sw-precache-webpack-plugin를 통해 sw-precache만을 제공해주고 있습니다. 따라서 sw-toolbox는 따로 설정해야합니다. sw-toolbox는 단지 importScript 문법을 통해 import 할 수 있고 사용할 수 있습니다.
	자세한 내용: [add-service-worker-toolbox](https://github.com/GoogleChromeLabs/sw-toolbox#add-service-worker-toolbox-to-your-service-worker-script)

![image-20180529051047807](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529051047807.png)	자세한 내용: [sw-toolbox usage](https://googlechromelabs.github.io/sw-toolbox/usage.html#main)

![image-20180529051109545](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529051109545.png)

 sw-precache-webpack-plugin를 사용하지 않을 경우, 이 작업을 직접 만들 Serviceworker.js에서 작업해줘야 하지만 sw-precache-webpack-plugin를 사용한다면 단지 설정 파일에 명시만 해주면 됩니다.
	자세한 내용: [importscripts-usage-example](https://github.com/goldhand/sw-precache-webpack-plugin#importscripts-usage-example)

![image-20180529051129504](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529051129504.png)

## 결론

 PWA의 커스터마이징 때문에 이전과 같이 어렵게 React를 만들 필요 없이 단순하게 Create React App 을 이용하여 React를 작성하면 됩니다. 단지 PWA의 커스터마이징을 위해 해야할 일이 있다면 두가지만 하면됩니다.
 첫째, 정적 리소스를 위한 sw-precache-config.js를 작성한 후 설정하면 됩니다.
 	자세한 내용: [sw-precache-config](https://stackoverflow.com/questions/38806320/how-to-configure-service-workers-with-create-react-app#answer-43697051)

![image-20180529051152312](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529051152312.png) 둘째, sw-toolbox를 importScript를 이용하여 import하고 동적 리소스를 제어합니다.