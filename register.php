<?php
$page_title = 'Register - Flipkart';
require_once __DIR__ . '/common/header.php';
?>

<div class="max-w-md mx-auto p-4 min-h-[80vh] flex flex-col justify-center">
    <div class="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
        <div class="text-center mb-6">
            <h1 class="text-xl font-bold text-slate-900">Create an Account</h1>
            <p class="text-xs text-slate-500 mt-1">Sign up with your mobile number to get started</p>
        </div>

        <form action="index.php" method="POST" class="space-y-3.5">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input type="text" name="name" placeholder="John Doe" required 
                       class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-fkBlue" />
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input type="tel" name="phone" placeholder="9876543210" required 
                       class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-fkBlue" />
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Email ID</label>
                <input type="email" name="email" placeholder="john@example.com" required 
                       class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-fkBlue" />
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Set Password</label>
                <input type="password" name="password" placeholder="At least 6 characters" required 
                       class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-fkBlue" />
            </div>

            <button type="submit" class="w-full bg-fkOrange hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-lg shadow transition-colors mt-2">
                CONTINUE
            </button>
        </form>

        <p class="text-center text-xs text-slate-600 mt-5">
            Existing User? <a href="login.php" class="text-fkBlue font-bold hover:underline">Log in</a>
        </p>
    </div>
</div>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
<?php require_once __DIR__ . '/common/bottom.php'; ?>
