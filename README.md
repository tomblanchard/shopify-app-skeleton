# shopify-app-skeleton

An embedded Shopify app skeleton built with Node.js, using [express](https://github.com/expressjs/express)/[express-session](https://github.com/expressjs/session) with OAuth flow handled by [shopify-token](https://github.com/lpinca/shopify-token) and API calls made through [shopify-api-node](https://github.com/MONEI/Shopify-api-node) with a little bit of help from the CSS part of [microapps](http://microapps.com/)' [Shopify Embedded App Frontend Framework](http://seaff.microapps.com/) to give the app a more Shopify-native look.

It's very simple app, it has one route (index) which makes a call to the API to display the total amount of products on the merchants store.