# slackbot-kubernetes
based on https://codelabs.developers.google.com/codelabs/cloud-slack-bot/index.html

# 구동 방법
1. slack bot setting 페이지로 이동
2. Feature > OAuth & Permissions
3. Bot User OAuth Access Token을 복사한다.
4. root 폴더에 slack-token 파일을 생성한다.
5. 그 파일에 Token을 붙여넣는다.
6. terminal에 해당 명령어를 실행한다.
```terminal
  slack_token_path=./slack-token node app.js
```
6.1 script 명령어로 쳐도 된다.
```terminal
  yarn start
```
