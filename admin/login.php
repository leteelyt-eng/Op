<?php
require_once __DIR__ . '/../../common/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Super Admin Console Login - Flipkart</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4 font-sans">
    <div class="max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div class="text-center mb-6">
            <div class="w-14 h-14 bg-purple-600/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto text-2xl mb-3 border border-purple-500/30">
                <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h1 class="text-lg font-bold">Flipkart Super Admin</h1>
            <p class="text-xs text-slate-400 mt-1">Platform Governance & Master Control Console</p>
        </div>

        <form action="index.php" method="POST" class="space-y-4 text-xs">
            <div>
                <label class="block text-slate-300 font-semibold mb-1">Admin Username</label>
                <input type="text" name="username" value="admin" required 
                       class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500" />
            </div>
            <div>
                <label class="block text-slate-300 font-semibold mb-1">Password</label>
                <input type="password" name="password" value="password" required 
                       class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-500" />
            </div>
            <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-lg text-xs transition-colors">
                AUTHENTICATE & ENTER CONSOLE
            </button>
        </form>

        <div class="mt-6 text-center text-xs text-slate-500">
            <a href="../index.php" class="hover:text-slate-300">Return to Customer App</a>
        </div>
    </div>
</body>
</html>
