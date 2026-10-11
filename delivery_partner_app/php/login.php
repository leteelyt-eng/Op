<?php
require_once __DIR__ . '/config.php';

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = $_POST['phone'] ?? '';
    $otp = $_POST['otp'] ?? '';
    if (!empty($phone)) {
        $_SESSION['driver_id'] = 1;
        $_SESSION['driver_name'] = 'Vikram Singh';
        $_SESSION['vehicle_no'] = 'DL 4S CZ 9021';
        header('Location: dashboard.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Fleet Delivery Partner - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-center max-w-md mx-auto p-4 font-sans">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-lg">
            <i class="fa-solid fa-motorcycle"></i>
        </div>
        <h1 class="text-xl font-black text-white">Delivery Fleet Partner</h1>
        <p class="text-xs text-slate-400 mt-1">Shopping Mystery Courier Logistics</p>

        <form method="POST" class="mt-6 space-y-3.5 text-left">
            <div>
                <label class="block text-[11px] font-bold text-slate-300 uppercase mb-1">Registered Phone Number</label>
                <div class="relative">
                    <span class="absolute left-3 top-2.5 text-slate-400 text-xs">+91</span>
                    <input type="tel" name="phone" value="9123456780" required class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2.5 pl-12 pr-3 text-xs font-mono focus:outline-none focus:border-sky-500">
                </div>
            </div>

            <div>
                <label class="block text-[11px] font-bold text-slate-300 uppercase mb-1">Rider Security OTP / PIN</label>
                <input type="password" name="otp" value="1234" required placeholder="Enter OTP" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2.5 px-3 text-xs font-mono focus:outline-none focus:border-sky-500">
            </div>

            <button type="submit" class="w-full bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-transform">
                Sign In & Start Shift
            </button>
        </form>

        <div class="mt-5 pt-4 border-t border-slate-800 text-[10px] text-slate-500">
            Authorized Ekart Courier Logistics System • GPS Tracked
        </div>
    </div>
</body>
</html>
