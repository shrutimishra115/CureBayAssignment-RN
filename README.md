Note:

Please note that due to system limitations, I am unable to install Xcode and Android Studio, as my macOS only supports macOS version 12.7.6. However, I have tested all the challenges in snack expo.

# React Native Coding Challenge App
 1. Vitals Form UI Matching Figma
> Recreated custom input boxes to match provided Figma/mobile screenshot.
> Included left-aligned icons in circular pale-blue background.
> Unit labels (cm, kg, etc.) added to the right side inside input box with consistent height.

2. Dynamic & Scalable Form Design
> Converted all vitals inputs (Height, Weight, BP, etc.) into a data-driven structure.
> Mapped InputText component dynamically using FlatList for scalability and performance.

3. BMI Auto-Calculation
> Extracted BMI calculation logic into a reusable utility.
> Automatically recalculated BMI whenever height or weight changes.

4. Error Handling for Inputs
> Inline form validation and error display for each input.
> Required fields display error messages below inputs when left empty.

5. Keyboard Avoidance
> Wrapped form with KeyboardAvoidingView + TouchableWithoutFeedback for better UX.
> Enabled smooth interaction and scrolling when keyboard is open.

6. Vitals Modal + Dashboard Trigger 
> Designed a clean Dashboard screen with a + Add Vitals button.
> Clicking the button opens the Add Vitals form in a modal.
> Success message appears briefly and disappears automatically.


7. Redux Toolkit State Management
> Set up redux-toolkit to store and manage vitals data.

> All form submissions dispatch to Redux and save entries with timestamp.

8. Vitals History Charting
> Implemented a responsive VitalsHistory screen.
> Used react-native-gifted-charts to render:
Heart Rate
Blood Pressure (SYS/DIA)
SpO₂
BMI
> Added date filter (daily) with @react-native-community/datetimepicker.

9. Smart Alerts System +  Vital Edit Modal
> Post-submit logic to detect:
High BP, Low SpO₂, High Heart Rate
> Alert screen shows warning cards with suggested actions (e.g. "Consult Doctor", "Take Rest").
> Each indivisual vital can be updated separately, along with suceess and error message

10. Test Coverage for Components
> Wrote unit tests for all major components using Jest and React Native Testing Library.


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
