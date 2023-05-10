# 235 (NHL)

235 is a React Native application that displays NHL scores with emphases on players of your chosen country.

## Development

### Init

- `npm install` - Install packages

### Start

- `npx expo start` - Run app and choose platform

### Quit

- `Ctrl + c` - Quit app

### Build to store (Testflight)

1. `eas build -p ios/android` - Starts expo build/deployment process
2. Go to url displayed in terminal (https://expo.dev/accounts/ljomoila/projects)
3. When .ipa done download it.
4. Upload .ipa to Transporter.
5. Go to App Store -> https://appstoreconnect.apple.com/apps/1554665833/testflight
6. When loading done, install via Testflight iOS app.

### Update teams on file

`npm run update`

### Troubleshoot

- `npx expo init {app_name}` - This should be done out side of the project to troubleshoot whats wrong.
- `open -a Simulator` - is simulator is not starting (ios)
