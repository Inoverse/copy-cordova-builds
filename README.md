# copy-cordova-builds

## Install
Install the following package below inside of your app's root folder.
```bash
$ npm install copy-cordova-builds
```
Or with `yarn`:
```bash
$ yarn add copy-cordova-builds
```

Then add the following to your app's config.xml file:
```html
<hook src="scripts/copyBuildFiles.js" type="after_build"/>
```