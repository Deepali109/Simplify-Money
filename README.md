## 📱 Metal Price App

A React Native application to track real-time precious metal prices like Gold, Silver, etc. with a clean UI, animated cards, and detailed price insights.

Built with Expo, React Navigation, and Expo Linear Gradient, this app gives users a smooth interactive experience.

## 🔄 Project Flow

The app follows a simple two-screen flow powered by React Navigation (Stack Navigator).

### 1️⃣ App Initialization

App.js loads the Stack Navigator with two routes:
HomeScreen (default)
DetailsScreen

### 2️⃣ Home Screen (HomeScreen.js)

Displays a FlatList of metals (Gold, Silver, Platinum, Palladium).

Each card contains:
Metal icon (with diagonal shine animation ✨)
Latest 24k price, open price, close price, timestamp
Rotating gradient border animation around the card

 #### Flow:

-On mount, useEffect triggers getMetalPrice() API calls for all metals(GoldAPI used).

-Data is stored in state (prices, loadingMetals, errorMetals).

-Cards update with fetched data.

-When the user taps on a card → navigate to DetailsScreen with metal + priceData passed as route params.

### 3️⃣ Details Screen (DetailsScreen.js)

-Shows a gradient card with expanded details of the selected metal.

-Data displayed includes:

-Current Price (₹/gram)

-Open Price

-Previous Close Price

-24K Price

-Last Updated Date & Time ⏰ 

-A custom header with back button allows returning to Home.

## ⚡ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/MetalPriceApp.git
cd MetalPriceApp
```
### 2.Install dependencies
```bash
npm install
# or
yarn install
```
### 3.Start the Expo server
```bash
npx expo start
```
### 4. Run on device/emulator

Scan the QR code in Expo Go app (Android/iOS)

Or press a (Android emulator) / i (iOS simulator)

## 📸 Screenshots

👉 Add your screenshots here

### Home Screen
![Home Screen](https://github.com/username/repo-name/assets/123456/home.png)

## 🎥 Demo

<img src="./screenshots/demo.gif" alt="App Demo" width="300" />
