# Instagram Gallery

![MIT](https://img.shields.io/badge/license-MIT-green)
![passing](https://img.shields.io/badge/build-passing-green)
![v0.1.2](https://img.shields.io/badge/release-v0.1.2-blue)
![npm type definitions](https://img.shields.io/npm/types/typescript)

A React Component that uses the Instagram Graph API to create a gallery from an Instagram users feed.

## Install

```
yarn add instagram-gallery

OR

npm install --save instagram-gallery
```

## Usage

```
import { InstagramGallery } from "instagram-gallery";

const App = () => {
  return <InstagramGallery accessToken="accessToken" count={24}/>  
}

export default App
```

## Getting an access token

- Log in to [Facebook Developer](https://developers.facebook.com/)
- Create an app that uses Instagram basic display.
- Add a test user in the roles section (Bear in mind only public accounts can generate access tokens).
- Accept the tester invitation on Instagram (Settings > Apps and Websites > Tester Invites)
- Go back to the Facebook Developer portal and you should be able to generate a token for the account.