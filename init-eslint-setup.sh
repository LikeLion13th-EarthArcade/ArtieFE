#!/bin/bash

echo "React + TypeScript + ESLint + Prettier 초기 세팅 시작..."

### 1. 패키지 설치 ###
echo "필요한 패키지 설치 중..."
npm install -D \
  eslint \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  husky \
  lint-staged \
  @commitlint/config-conventional \
  @commitlint/cli

### 2. Prettier 설정 ###
echo "Prettier 설정 파일 생성..."
cat <<EOF > .prettierrc
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "printWidth": 100
}
EOF

### 3. ESLint 설정 ###
echo "ESLint 설정 파일 생성..."
cat <<EOF > .eslintrc.cjs
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}
EOF

### 4. Commitlint 설정 ###
echo "Commitlint 설정 파일 생성..."
cat <<EOF > commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
EOF

### 5. lint-staged 설정 ###
echo "lint-staged 설정 추가..."
npx json -I -f package.json -e \
  'this["lint-staged"] = {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }'

### 6. Husky 초기화 및 hook 추가 ###
echo "Husky 설정 중..."
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \"\$1\""

### 7. .eslintignore 파일 생성 ###
echo ".eslintignore 생성..."
cat <<EOF > .eslintignore
node_modules
build
dist
EOF

echo "초기 세팅 완료! 이제 커밋 전에 린트/포맷 자동 실행되고, 커밋 메시지도 체크됩니다!"
