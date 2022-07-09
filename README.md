# Instagram Gallery

![MIT](https://img.shields.io/badge/license-MIT-green)
![v1.3.1](https://img.shields.io/badge/release-v1.3.1-blue)
![npm type definitions](https://img.shields.io/npm/types/typescript)

A React Component that uses the Instagram Graph API to create a gallery from an Instagram users feed.

This package includes Typescript declarations.

## Install

```
yarn add instagram-gallery

OR

npm install --save instagram-gallery
```

## Usage

### Simple usage

To display a simple gallery with a set number of items.

Props:

-   `accessToken`: Required.
-   `count`: Required. Defines the number of items.

```
import { InstagramGallery } from "instagram-gallery";

const App = () => {
  return <InstagramGallery accessToken="accessToken" count={24}/>
}

export default App
```

### Usage with pagination

To display a paginated gallery with a set number of items per page.

Props:

-   `accessToken`: Required.
-   `count`: Required. Defines the number of items per page.
-   `pagination`: Optional. Boolean to show the pagination buttons.

```
import { InstagramGallery } from "instagram-gallery";

const App = () => {
  return <InstagramGallery accessToken="accessToken" count={24} pagination={true}/>
}

export default App
```

### Styling

Everyone has different needs so styles have been intentionally left out of this package.

This component only has 4 elements to apply styles to:

-   The main gallery container: `.instagram-gallery`

-   Instagram item containers: `.instagram-item`

-   Instagram images themselves: `.instagram-image`

-   Pagination container: `.pagination`

Example CSS used for development:

```
.instagram-gallery {
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
}

.instagram-item {
    -webkit-box-flex: 0;
    flex: 0 0 calc(100% / 6 - 10px);
    margin: 5px;
    display: block;
    position: relative;
}

.instagram-image {
    display: block;
    width: 100%;
    height: 100%;
}

.pagination {
  display: block;
  margin: 0 auto;
  padding: 2em;
}
```

## Getting an access token

-   Log in to [Facebook Developer](https://developers.facebook.com/)
-   Create an app that uses Instagram basic display.
-   Add a test user in the roles section (Bear in mind only public accounts can generate access tokens).
-   Accept the tester invitation on Instagram (Settings > Apps and Websites > Tester Invites)
-   Go back to the Facebook Developer portal and you should be able to generate a token for the account.

## Contributing

This package was made as a bit of fun because I always found myself needing it for projects.

If you find it useful or have any issues / ideas please open an issue on GitHub.

<a href="https://www.buymeacoffee.com/MORK" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
