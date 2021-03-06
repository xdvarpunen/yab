# Yet Another Browser

![Build/release](https://github.com/xdvarpunen/yab/workflows/Build/release/badge.svg)

Electron based browser built with vanilla JS,HTML and CSS. Focus on maintainability, learnability and simplicity.

## Features
* Enter url and load HTML+CSS based contents that Chromium supports
* clear history on browser close
* history back & forward button
* page reload button
* show page title
* adblock
  * ads
  * trackers
* No
  * JavaScript
  * Crash reporting
  * Popups 
  * Telemetrics
  * Account
  * Dedicated download location
  * Settings, no themes, no cli flags
  * Tabs
  * Bookmarks
  * Home button

## Roadmap
* installer

## How

### JavaScript
https://stackoverflow.com/questions/822872/do-web-sites-really-need-to-cater-for-browsers-that-dont-have-javascript-enable

### Popups
Popups are disabled in webview by default. [Source](https://www.electronjs.org/docs/api/webview-tag#allowpopups)

### Crash reporting
Crash reporting is feature added by developer. Not adding. [Source](https://www.electronjs.org/docs/api/crash-reporter)

### Adblock
* NoScript is for Firefox only. [Source](https://noscript.net/)
* uMatrix. [Source](https://addons.mozilla.org/en-US/firefox/addon/umatrix/)
* uOrigin [Source](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/)

https://github.com/cliqz-oss/adblocker
https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker-electron/README.md
https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker/README.md
```
import { FiltersEngine } from '@cliqz/adblocker';
import { Request } from '@cliqz/adblocker';
engine = await FiltersEngine.fromPrebuiltAdsAndTracking(fetch); // ads and tracking

const { match } = engine.match(Request.fromRawDetails({
  type: 'script',
  url: 'https://domain.com/ads.js',
}));
```

https://www.npmjs.com/package/@cliqz/adblocker-electron
https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron-example
https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker-electron-example/index.ts

Wrapping ads and trackers blocking into session. Will see.
```javascript
if (session.defaultSession === undefined) {
    throw new Error('defaultSession is undefined');
}

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
});
```

## Inspiration
https://www.electronjs.org/apps?q=web-browser

### Wexond
An extensible web browser with beautiful UI and some innovative features.
https://www.electronjs.org/apps/wexond

### Dot Browser
Beautiful browser with material UI, with built-in adblock.
https://www.electronjs.org/apps/dot

### Web Net
Chromium Web Browser
https://www.electronjs.org/apps/webnet

### Top Browser
Minimal browser that always stays on top of your screen
https://www.electronjs.org/apps/top-browser

### MBoD
Minimalistic, fast and lightweight mobile browser on the desktop.
https://www.electronjs.org/apps/mbod

### Biscuit
Browser where your favorite apps won't get buried in tabs.
https://www.electronjs.org/apps/biscuit

## Development
* [Electron first app](https://www.electronjs.org/docs/tutorial/first-app)
* [Electron <webview>](https://www.electronjs.org/docs/api/webview-tag)

```powershell
npm install # install dependencies
npm run start # see app running
```

### Building
* [How to](https://github.com/electron-userland/electron-builder/issues/4260)
Not much examples. Random blog online. Very.
* [Blog](https://medium.com/@johnjjung/building-an-electron-app-on-github-actions-windows-and-macos-53ab69703f7c)

* [Electron Builder Action](https://github.com/marketplace/actions/electron-builder-action)
* [electron-builder](https://www.electron.build/)

```yaml
name: CI
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  release:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
    - name: Check out Git repository
      # https://github.com/actions/checkout
      uses: actions/checkout@v2
    - name: Install Node.js and NPM
      # https://github.com/actions/setup-node
      uses: actions/setup-node@v1
      with:
          node-version: 10
    - name: Build/release Electron App
      uses: samuelmeuli/action-electron-builder@v1
      with:
          # GitHub token, automatically provided to the action
          # (No need to define this secret in the repo settings)
          github_token: ${{ secrets.github_token }}

          # If the commit is tagged with a version (e.g. "v1.0.0"),
          # release the app after building
          release: ${{ startsWith(github.ref, 'refs/tags/v') }}
```

* update package.json version '1.0.0'
* commit the package.json change and tag the change
* Make sure your tag name's format is v*.*.*. Your workflow will use this tag to detect when to create a release

* [Auto Update](https://www.electron.build/auto-update)

https://github.com/samuelmeuli/action-electron-builder/blob/master/index.js#L129
npx --no-install electron-builder --windows --publish always .

https://github.com/electron-userland/electron-builder/blob/7b335dbd7e5ca754598ca93318be1404fc518485/packages/electron-publish/src/gitHubPublisher.ts#L142


"build": "electron-builder --mac --windows --linux",
"release": "electron-builder --mac --windows --linux --publish=always"
    "release": "build",
     portable --publish onTagOrDraft
     https://stackoverflow.com/questions/55618591/how-to-publish-to-a-private-github-with-electron-builder-nsis-and-appimage

To reduce build time
https://github.com/actions/cache/blob/master/examples.md#node---npm

Check electron updates https://www.electronjs.org/docs/tutorial/electron-timelines


```json
// the build part for electron-builder
"build": {
  "appId": "com.electron.yab",
  "productName": "yab",
  "copyright": "Copyright © year ${author}",
  "win": {
    "publish": [
      "github"
    ]
  },
  "publish": [
    {
      "provider": "github",
      "repo": "yab",
      "owner": "xdvarpunen",
      "protocol": "https",
      "releaseType": "release",
      "vPrefixedTagName": true
    }
  ]
},
```

electron-builder

`electron-builder install-app-deps`
https://github.com/electron-userland/electron-builder/issues/1906
> optional command. In any case electron-builder will rebuild production native deps on build.

https://www.electron.build/#quick-setup-guide
> To ensure your native dependencies are always matched electron version, simply add script "postinstall": "electron-builder 
> install-app-deps" to your package.json.

## Code-Signing
It costs money.
https://www.electron.build/code-signing#where-to-buy-code-signing-certificate
https://docs.microsoft.com/en-us/windows-hardware/drivers/dashboard/get-a-code-signing-certificate?redirectedfrom=MSDN
https://stackoverflow.com/questions/11833481/non-apple-issued-code-signing-certificate-can-it-work-with-mac-os-10-8-gatekeep

just release => shows up, but 
releaseType = release => overwrites but won't appear in newest release
fix: rename file making it unique to show up in the newest release
https://github.com/ashah360/GrubNinja/blob/master/electron-builder.yml#L28