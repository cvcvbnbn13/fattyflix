# FattyFlix

A Funny Repo using **Node.js(Express.js) & React(Next.js)** , css framework **Mui**, Database **MongoDB** , deploy by **Vercel**.

網站連結：[FattyFlix](https://fattyflix-client.vercel.app/)

### 目錄

- [專案簡介](#專案簡介)
- [目錄結構說明](#目錄結構說明)
- [第三方套件使用](#第三方套件使用)

## 專案簡介

```
NetFlix clone

可以創建個人帳戶、更改密碼、自由瀏覽各個節目跟電影、自由添加喜愛的電影或節目進片單，
也可以對任一節目跟電影留下評論。
```

![Preview](./client/public/fattyflix-homepage.png)

---

## 目錄結構說明

- client

  - src

    1. components

       - common

       - layout

         - MainLayout

    2. pages

       - FavoriteList

       - HomePage

       - MediaDetail

       - MediaList

       - MediaSearch

       - PasswordUpdate

       - PersonDetail

       - ReviewList

    3. public

    4. api

       - client

       - configs

       - modules

    5. configs

       - menu.configs.js

       - theme.configs.js

       - ui.configs.js

    6. redux

       - features

         - appStateSlice.js

         - authModalSlice.js

         - globalLoadingSlice.js

         - themeModeSlice.js

         - userSlice.js

       - store.js

    7. routes

       - routes.jsx

    8. utils

       - favorite.utils.js

    9. App.jsx

    10. index.jsx

    11. firebase.ts

    12. firebaseAdmin.ts

- server

  - src

    1. axios

       - axios.client.js

    2. controllers

       - favorite.controller.js

       - media.controller.js

       - person.controller.js

       - review.controller.js

       - user.controller.js

    3. handlers

       - request.handler.js

       - reponse.handler.js

    4. middlewares

       - token.middleware.js

    5. models

       - favorite.model.js

       - review.model.js

       - user.model.js

       - model.options.js

    6. routes

       - index.js

       - media.route.js

       - person.route.js

       - review.route.js

       - user.route.js

    7. tmdb

       - tmdb.api.js

       - tmdb.config.js

       - tmdb.endpoints.js

  - .env

  - index.js

  - vercel.json

---

## 第三方套件使用

- axios
- cors
- cookie-parser
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
- nodemon
- mui
- dayjs
- formik
- query-string
- react-router-dom
- react-toastify
- swiper
- yup

---
