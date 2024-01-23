# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`


# 外部 json データを使っての更新
mock-npm-json-server のデータを使っての更新
https://github.com/YoshinoriKanno/mock-npm-json-server

`npm run start-json-server` で 3004 番のポートを利用

local json-server の db.json は 下記のような構成
エンドポイントは tutorial を利用。

```
{
  "posts": [
    {
      "title": "タイトル",
      "author": "著者",
      "id": 11
    },
    {
      "title": "あああ",
      "author": "あああ",
      "id": 12
    },
    {
      "title": "ああいいああ",
      "author": "あああああ",
      "id": 13
    }
  ],
  "comments": [
    {
      "text": "あsdふぁ",
      "postId": "12",
      "id": 25
    },
    {
      "text": "よひのりくん",
      "postId": "12",
      "id": 37
    },
    {
      "text": "コメントくん",
      "postId": "11",
      "id": 50
    }
  ],
  "tutorial": [
    {
      "avatar": "https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg",
      "first": "Shruti",
      "last": "Kapoor",
      "twitter": "@shrutikapoor08",
      "id": "shruti-kapoor"
    },
    {
      "avatar": "https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg",
      "first": "Glenn",
      "last": "Reyes",
      "twitter": "@glnnrys",
      "id": "glenn-reyes"
    },
    {
      "avatar": "https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg",
      "first": "Ryan",
      "last": "Florence",
      "id": "ryan-florence"
    }
  ],
  "profile": {
    "name": "typicode"
  }
}

```
