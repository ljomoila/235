# NHL (235)

## Init

- `npm install` - Install packages
- `npx expo init {app_name}` - This should be done in some other folder, to troubleshoot whats wrong

## Start

- `open -a Simulator` - Start simulator if not already started
- `npx expo start` - Run app and choose platform
- `Ctrl + c` - Quit app

## Build to store (Testflight)

1. `eas build -p ios/android`
2. goto url displayed in terminal (https://expo.dev/accounts/ljomoila/projects)
3. when .ipa done download it
4. upload .ipa to Transporter
5. goto App Store -> https://appstoreconnect.apple.com/apps/1554665833/testflight
6. when loading done, install via Testflight iOS app

## Update teams on file

`npm run update`
