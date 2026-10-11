<?php
require_once __DIR__ . '/../common/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flipkart Seller Hub - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 min-h-screen flex flex-col justify-between font-sans">
    <!-- Navbar -->
    <header class="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-3">
            <span class="text-2xl font-black italic text-blue-600">Flipkart</span>
            <span class="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Seller Hub</span>
        </div>
        <a href="../index.php" class="text-xs text-slate-600 hover:text-blue-600 font-medium">
            <i class="fa-solid fa-arrow-left mr-1"></i> Customer App
        </a>
    </header>

    <!-- Main Login Card -->
    <main class="max-w-md w-full mx-auto p-4 my-8">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <h1 class="text-xl font-bold text-slate-900 mb-1">Sell Online with Flipkart</h1>
            <p class="text-xs text-slate-500 mb-6">Reach over 500 Million+ registered customers across India</p>

            <form action="dashboard.php" method="POST" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Registered Email ID or Phone</label>
                    <input type="text" name="seller_user" value="ankit@techgizmo.in" required 
                           class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Password</label>
                    <input type="password" name="seller_pass" value="password" required 
                           class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div class="flex items-center justify-between text-xs">
                    <label class="flex items-center gap-2 text-slate-600">
                        <input type="checkbox" checked class="rounded accent-blue-600" /> Remember me
                    </label>
                    <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg shadow-md transition-colors">
                    LOG IN TO SELLER HUB
                </button>
            </form>

            <div class="mt-6 pt-4 border-t text-center text-xs text-slate-600">
                Don't have a seller account? 
                <a href="register.php" class="text-blue-600 font-bold hover:underline">Register Now (KYC)</a>
            </div>
        </div>
    </main>

    <footer class="bg-white border-t py-4 text-center text-xs text-slate-400">
        © 2026 Flipkart Seller Services • All Rights Reserved
    </footer>
</body>
</html>
