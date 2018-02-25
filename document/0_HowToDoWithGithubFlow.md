# How to do with Github Flow 

### 0. 요약

```bash
$ git pull
$ git checkout -b <branch name>
$ git status
$ git add <file name>
$ git commit -m "feat(function1): function1 for parsing"
$ git push origin <branch name>
$ git checkout master
```

커밋 메세지나 브랜치명은 꼭 컨벤션 룰에 맞춰 작성하시기 바랍니다.



### 1. 최신 상태 업데이트ㅁ

```bash
$ git pull				# fetch + merge, 최신 상태로 업데이트
```

 다만, git pull은 git fetch와 git merge를 동시에 하는 작업으로 최신 상태 업데이트 후 자동으로 병합하는 작업입니다. 중요한 작업이거나 충돌이 예상된다면 git fetch를 먼저 진행 한 후 병합을 진행하는 것이 좋습니다. 간단한 작업일 경우 그냥 git pull 해도 무방합니다.



### 2. 브랜치 생성하기

```bash
$ git checkout -b <branch name>
```

 master 브랜치에 추가하지 말고 github flow에 따라 브랜치를 생성해야 합니다.

 **아래와 같은 이름으로만 생성하기 바랍니다.**

 기능 추가를 할 경우

 feature/design-페이지명

 feature/front-페이지명

 feature/back-함수명

 버그를 고치는 경우

 fix/design-페이지명-버그명

 fix/front-페이지명-버그명

 fix/back-함수명-버그명

 서비스 중 급하게 버그를 고치는 경우

 hotfix/design-함수명-버그명

 hotfix/front-함수명-버그명

 hotfix/back-함수명-버그명

 **위와 같은 경우에 해당되지 않을 경우 미리 협의하여 작업합니다.**



### 3. 상태 확인 하기

```bash
$ git status			# 상태 확인
```

 최신 상태의 업데이트가 완료 되었는지 확인 가능하며, 현재 untracked, not staged 된 파일들과 staged 된 파일들을 확인 할 수 있습니다.

### 4. 파일 track하고 stage하기

```bash
$ git add <file name>	# 파일 단위로 추가
$ git add -A			# unstaged된 모든 파일들 추가
```

 상태를 확인 한 후 필요한 파일들만 stage 상태로 올리려면 git add <file name> 를 사용하면 됩니다. 만약 모든 파일들을 추가할 경우 file name을 매번 작성해 줄 필요 없이 git add -A를 사용하여 한번에 추가할 수 있습니다. **하지만 불 필요한 파일이 추가될 수 있으므로 반드시 git status를 확인하여 git add -A를 쓸지 git add <file name> 를 쓸지 판단하여야 합니다.**



### 5. 상태 확인 하기

```bash
$ git status			# stage 된 파일을 확인
```

  **한번 더 상태를 확인 하여 불 필요한 파일이 stage 되었는지 확인이 필요합니다.**

 **만약 그런 경우, 불필요한 stage 파일을 반드시 제외시켜야 합니다.**



### 6. 커밋하기

```bash
$ git commit -m "<type>(<scope>): <subject>"
```

 stage 된 파일들을 커밋합니다.

 type은 반드시 아래와 같은 단어만 사용합니다.

 refactor	: 코드를 리팩토링

 docs		: 도규먼트 작성

 fix			: 버그 수정

 test		: 테스트 작업

 chore		: 자잘한 작업 (디렉토링 이동, 문자열 수정, etc.)

 feat		: 기능 추가

 scope는 back엔드의 경우 함수명, front엔드, design의 경우 페이지명을 작성합니다.

 subject는 작업을 한 줄로 요약합니다.

 ex) test(mainPage): init design



### 7. 푸시하기

```bash
$ git push origin <branch name>
```

만든 branch로 푸시합니다.



### 8. master 브랜치로 돌아오기

```bash
$ git checkout master
```

작업한 브랜치는 혹시모를 상황을 대비하여 지우지 않습니다.



### 9. github에서 확인하기

푸시가 완료되면 github 페이지에서 push되었음을 확인 할 수 있습니다. 필요한 경우 pull request 버튼을 눌러 merge를 요청합니다.