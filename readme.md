# Yet Another Browser

## Features
* JavaScript is disabled
* Enter url and load HTML+CSS based contents that Chromium supports

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