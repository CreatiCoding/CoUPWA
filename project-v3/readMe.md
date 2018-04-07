# Create React App With PWA

### 1. Create React App

```bash
sudo npm install -g create-react-app
create-react-app react-pwa-webtoon
```

### 2. Firebase init

```bash
sudo npm install -g firebase-tools
firebase login
firebase init		# public -> build, 나머진 기본값으로 그냥 엔터
```

### 3. 설정 파일

[.prettierrc]

```json
{
    "proseWrap": "always",
    "singleQuote": true,
    "tabWidth": 120,
    "parser":"flow",
    "trailingComma": "es5",
    "jsxBracketSameLine": false
}
```

[.editorconfig]

```
root = true
[*.css]
indent_style = tab
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 80
[*.js]
indent_style = tab
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 80
[*.html]
indent_style = tab
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 80
```

### 4. 외부 툴 설정

```bash
sudo npm install -g html prettier stylefmt
```

