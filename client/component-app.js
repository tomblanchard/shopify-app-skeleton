import React from "react";

import {
  AppProvider,
  Page,
  Card
} from "@shopify/polaris";

import Info from "./component-info";

var App = (props) => (
  <AppProvider
    apiKey={window.apiKey}
    shopOrigin={window.shopOrigin}
    forceRedirect
  >
    <Page title="Test App">
      <Card sectioned>
        <Info />
      </Card>
    </Page>
  </AppProvider>
);

export default App;
