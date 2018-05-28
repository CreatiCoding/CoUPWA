# [iOS safari] PWA 이슈

### 1. safari가 service-worker.js를 미지원 했을 당시

![image](https://user-images.githubusercontent.com/33514304/40628495-5793d6aa-6300-11e8-8035-d864a294cccf.png)

	##### 주의: 현재 **Deprecated**

![image](https://user-images.githubusercontent.com/33514304/40628499-5c371672-6300-11e8-85f1-a62807e7d7fb.png)

### 2. safari가 service-worker.js 지원

![image](https://user-images.githubusercontent.com/33514304/40628502-6096415c-6300-11e8-8cf5-7af43b68e841.png)

![image](https://user-images.githubusercontent.com/33514304/40628504-66275070-6300-11e8-8137-5333c115a275.png)
### 3. Cache API 미지원

![image](https://user-images.githubusercontent.com/33514304/40628511-69dd82d4-6300-11e8-990b-95b888e7a734.png)

![image](https://user-images.githubusercontent.com/33514304/40628518-6e9c2b4a-6300-11e8-8d27-993724e9e8cd.png)

#### 4. 결론

##### safari의 service worker를 활용하여 오프라인 정적 리소스 지원 가능하나 Cache API가 없어 동적 리소스를 지원해주지 않으므로 indexedDB나 localStorage를 활용하여 온라인일때 오고갔던 데이터를 로컬 저장소에 저장하여 해결 가능
