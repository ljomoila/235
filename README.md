# 235 (NHL)

235 is a React Native application that displays NHL scores with emphases on players of your chosen country. Application works on iOS and Anrdoid devices.

## Development

Make sure you have XCode and/or Android Studio is installed on your computer.

### Init

-   `npm install` - Installs packages

### Start

-   `npx expo start` - Runs app in simulator for a chosen platform

### Build

-   `expo run:ios/android` - Builds project and runs it in simulator

### Test

-   `npm test` - Runs all tests

### Build to store (Testflight)

1. `eas build -p ios/android` - Starts expo build/deployment process
2. Go to url displayed in terminal (https://expo.dev/accounts/{user}/projects)
3. When .ipa done download it.
4. Upload .ipa to Transporter.
5. Go to App Store -> https://appstoreconnect.apple.com/apps/{app}/testflight
6. When loading done, install via Testflight iOS app.

### Troubleshoot

-   `open -a Simulator` - if simulator is not starting (ios)
