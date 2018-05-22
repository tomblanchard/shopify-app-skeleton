import React, { Component } from "react";

import {
  AppProvider,
  Page,
  Card,
  FormLayout,
  TextField,
  Button
} from "@shopify/polaris";

class Install extends Component {
  state = {
    shop: ""
  }

  handleChange = (key, value, cb) => {
    this.setState({ [key]: value }, cb);
  }

  render() {
    return (
      <AppProvider>
        <Page title="Install">
          <Card sectioned>
            <form method="get" action="/shopify/auth">
              <FormLayout>
                <TextField
                  label="Shop"
                  name="shop"
                  value={this.state.shop}
                  onChange={(value) => this.handleChange("shop", value)}
                />

                <Button submit primary>
                  Install
                </Button>
              </FormLayout>
            </form>
          </Card>
        </Page>
      </AppProvider>
    );
  }
};

export default Install;
