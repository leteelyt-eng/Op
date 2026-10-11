# 🛵 Shopping Mystery - Delivery Partner Mobile App (Standalone Workspace)

Independent, mobile-first application designed specifically for delivery fleet partners, riders, and courier executives.

---

## 📱 Features Included

1. **Rider Shift & Duty Controller**:
   - 1-Tap Online / Offline shift status toggle
   - Automatic GPS geolocation detector and battery level monitor
   - Daily earnings, delivered order counters, and driver rating (★ 4.9)

2. **Order Management & Smart Dispatch**:
   - Real-time assigned order alerts with pickup hub and drop-off coordinates
   - Cash on Delivery (COD) payment collection badges
   - 1-Tap customer phone call launcher and order detail inspector

3. **Turn-by-Turn GPS Navigation Simulator**:
   - Live route polyline rendering on map canvas
   - Real-time vehicle marker movement and speed gauge (28 km/h)
   - Dynamic ETA countdown and next-turn guidance banner

4. **Multi-Step Proof of Delivery (POD)**:
   - **Step 1: Open Box Delivery OTP**: Verification of 4-digit secret code shared by customer
   - **Step 2: Digital Signature**: Interactive HTML5 touch canvas signature capture with clear and save
   - **Step 3: Parcel Photo Verification**: Simulated camera photo capture of delivered box
   - **Step 4: COD Reconciliation**: Automatic cash ledger logging for cash collections

5. **Dual Runtime Stacks Provided**:
   - **Modern SPA Edition**: React + TypeScript + Tailwind CSS + Lucide Icons (in `src/`)
   - **Native PHP & MySQL Edition**: Vanilla PHP + Tailwind CSS + AJAX + MySQL (in `php/`)

---

## 🚀 How to Run the Modern Mobile App (React & Vite)

### Prerequisites:
- Node.js (v18+) and npm or bun

```bash
cd delivery_partner_app
npm install
npm run dev
```

App will start at `http://localhost:3000` (or configured port).

### Build for Production:
```bash
npm run build
```

---

## 📱 Build as Android APK / iOS App (Capacitor / Cordova)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "DeliveryPartnerApp" "com.shoppingmystery.delivery"
npm run build
npx cap add android
npx cap open android
```

---

## 🐘 How to Run the PHP Edition (`php/` folder)

1. Ensure MySQL database is loaded using `/database.sql`.
2. Configure database credentials in `php/config.php`.
3. Start PHP development server:
```bash
cd delivery_partner_app/php
php -S localhost:8000
```
4. Open `http://localhost:8000/login.php` in your browser.
