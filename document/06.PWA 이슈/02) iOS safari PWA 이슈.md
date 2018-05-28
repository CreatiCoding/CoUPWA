# [iOS safari] PWA 이슈

### 1. safari가 service-worker.js를 미지원 했을 당시

![image-20180529043700673](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529043700673.png)

	##### 주의: 현재 **Deprecated**

![image-20180529043731078](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529043731078.png)

### 2. safari가 service-worker.js 지원

![image-20180529043848281](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529043848281.png)

![image-20180529043902378](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529043902378.png)

### 3. Cache API 미지원

![image-20180529044301010](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529044301010.png)

![image-20180529044318346](/var/folders/gh/lmckw4456mvbkzbf93mgkf4w0000gn/T/abnerworks.Typora/image-20180529044318346.png)

#### 4. 결론

##### safari의 service worker를 활용하여 오프라인 정적 리소스 지원 가능하나 Cache API가 없어 동적 리소스를 지원해주지 않으므로 indexedDB나 localStorage를 활용하여 온라인일때 오고갔던 데이터를 로컬 저장소에 저장하여 해결 가능