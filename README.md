# 235 (NHL)

235 is a React Native application that displays NHL scores with emphases on players of your chosen country.

## Development

### Init

- `npm install` - Install packages

### Start (for mac users)

- `open -a Simulator` - Start simulator if not already started
- `npx expo start` - Run app and choose platform
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

## Licence

MIT License

Copyright (c) [2023] [ljomoila]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
