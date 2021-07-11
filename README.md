# Instagram Gallery

![MIT](https://img.shields.io/badge/license-MIT-green)
![passing](https://img.shields.io/badge/build-passing-green)
![v1.0.0](https://img.shields.io/badge/release-v1.0.0-blue)
![npm type definitions](https://img.shields.io/npm/types/typescript)

A React Component that uses the Instagram Graph API to create a gallery from an Instagram users feed.

## Install

```
yarn add instagram-gallery

OR

npm install --save instagram-gallery
```

## Usage

### Simple usage

```
import { InstagramGallery } from "instagram-gallery";

const App = () => {
  return <InstagramGallery accessToken="accessToken" count={24}/>
}

export default App
```

### Usage with pagination

```
import { InstagramGallery } from "instagram-gallery";

const App = () => {
  return <InstagramGallery accessToken="accessToken" count={24} pagination={true}/>
}

export default App
```

## Getting an access token

-   Log in to [Facebook Developer](https://developers.facebook.com/)
-   Create an app that uses Instagram basic display.
-   Add a test user in the roles section (Bear in mind only public accounts can generate access tokens).
-   Accept the tester invitation on Instagram (Settings > Apps and Websites > Tester Invites)
-   Go back to the Facebook Developer portal and you should be able to generate a token for the account.

### :)

<a href="https://www.buymeacoffee.com/MORK" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
