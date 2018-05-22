var express = require("express");

var session = require("express-session");
var RedisStore = require("connect-redis")(session);

var shopifyExpress = require("@shopify/shopify-express");
var { RedisStrategy } = require("@shopify/shopify-express/strategies");

var ShopifyAPI = require("shopify-api-node");

var app = express();
var app_port = process.env.PORT || 3000;

var redisConfig = require("./../config/redis");
var shopifyAppConfig = require("./../config/shopify-app")[process.env.NODE_ENV];

var shopifyConfig = {
  host: shopifyAppConfig.host,
  apiKey: shopifyAppConfig.key,
  secret: shopifyAppConfig.secret,
  scope: ["read_content, write_content, read_themes, write_themes, read_products, write_products, read_product_listings, read_customers, write_customers, read_orders, write_orders, read_draft_orders, write_draft_orders, read_inventory, write_inventory, read_locations"],
  shopStore: new RedisStrategy(redisConfig),
  afterAuth(req, res) {
    return res.redirect("/");
  }
};

var shopify = shopifyExpress(shopifyConfig);

var { routes, middleware } = shopify;
var { withShop, withWebhook } = middleware;

app.use("/assets", express.static(__dirname + "/../client"));

app.set("view engine", "ejs");

app.use(session({
  store: new RedisStore(redisConfig),
  secret: shopifyAppConfig.secret,
  resave: true,
  saveUninitialized: false,
}));

app.use("/shopify", routes);

app.get("/", withShop({ authBaseUrl: "/shopify" }), (req, res) => {
  var { session: { shop, accessToken } } = req;

  return res.render(__dirname + "/index", {
    bundle: "index",
    apiKey: shopifyAppConfig.key,
    shop: shop
  });
});

app.get("/install", (req, res) => {
  return res.render(__dirname + "/index", {
    bundle: "install",
    apiKey: null,
    shop: null
  });
});

app.listen(app_port, () => {
  console.log(`Example app listening on port ${app_port}!`);
});
