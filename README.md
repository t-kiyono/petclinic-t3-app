# Petclinic T3 App

[T3 Stack](https://create.t3.gg/) のチュートリアルとして作成した、サンプルアプリケーション

題材として [Spring PetClinic](https://spring-petclinic.github.io/) を使用しています

## Setup

### Install

依存ライブラリをインストールします

```bash
$ npm install
```

### Database

ローカル環境での動作確認用に、 `docker-compose.yml` を用意しています

起動後、データベーススキーマを適用するために、 `prisma migrate deploy` を実行します

```bash
$ docker-compose up -d
$ npm run db:deploy
```

## Run

開発サーバーを起動して動作確認することができます

```bash
$ npm run dev
```

リリースビルドを作って確認したい場合は、以下の手順を実行してください

```bash
$ npm run build
$ cp -p .next/standalone/server.js .
$ node server.js
```

※ 実際にリリースする場合は、以下を参考に必要なファイルのみを含めたコンテナイメージを作成してリリースします

https://github.com/vercel/next.js/tree/canary/examples/with-docker
