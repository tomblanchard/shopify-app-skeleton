var express = require("express");
var session = require("express-session");
var path = require("path");
var config = require("./config");
var ShopifyToken = require("shopify-token");
var Shopify = require("shopify-api-node");

var shopifyToken = new ShopifyToken(config);
var app = express();
var port = process.env.PORT || 8080;

app.use(session({
  secret: "eo3Athuo4Ang5gais",
  saveUninitialized: false,
  resave: false
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  if (req.session.token) {
    var shopify = new Shopify({
      shopName: req.session.shopName,
      accessToken: req.session.token
    });

    shopify.product.count()
      .then(function(productCount) {
        res.render("index", {
          apiKey: config.apiKey,
          shopName: req.session.shopName,
          productCount: productCount
        });
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  } else {
    res.render("install");
  }
});

app.get("/shopify-auth", function (req, res) {
  var nonce = shopifyToken.generateNonce();
  var shopName = req.query.shop.split(".")[0];
  var url = shopifyToken.generateAuthUrl(shopName, undefined, nonce);

  req.session.state = nonce;
  res.redirect(url);
});

app.get("/callback", function (req, res) {
  var state = req.query.state;

  if (
      typeof state !== "string"
    || state !== req.session.state          // Validate the state.
    || !shopifyToken.verifyHmac(req.query)  // Validare the hmac.
  ) {
    return res.status(400).send("Securlty checks failed");
  }

  // Exchange the authorization code for a permanent access token.
  shopifyToken.getAccessToken(req.query.shop, req.query.code)
    .then(function (token) {
      req.session.token = token;
      req.session.state = undefined;
      req.session.shop = req.query.shop;
      req.session.shopName = req.session.shop.split(".")[0];

      // Redirect to app in Shopify admin.
      res.render("embedded-app-redirect", {
        url: "https://" + req.query.shop + "/admin/apps/" + config.apiKey
      });
    })
    .catch(function (err) {
      console.error(err.stack);
      res.status(500).send("Oops, something went wrong");
    });
});

app.listen(port, function () {
  console.log("Open http://localhost:8080 in your browser")
});
