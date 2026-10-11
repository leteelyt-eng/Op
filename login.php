<?php
$page_title = 'Login - Flipkart';
require_once __DIR__ . '/common/header.php';
?>

<div class="max-w-md mx-auto p-4 min-h-[80vh] flex flex-col justify-center">
    <div class="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
        <div class="text-center mb-6">
            <h1 class="text-xl font-bold text-slate-900">Login to Flipkart</h1>
            <p class="text-xs text-slate-500 mt-1">Get access to your Orders, Wishlist and Recommendations</p>
        </div>

        <form action="index.php" method="POST" class="space-y-4">
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Enter Email / Mobile Number</label>
                <div class="relative">
                    <i class="fa-solid fa-phone absolute left-3 top-3 text-slate-400 text-xs"></i>
                    <input type="text" name="phone_email" value="9876543210" placeholder="+91 or user@example.com" required 
                           class="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-fkBlue" />
                </div>
            </div>

            <div id="otpField" class="hidden">
                <label class="block text-xs font-semibold text-slate-700 mb-1">Enter 6-digit OTP</label>
                <input type="text" name="otp" maxlength="6" placeholder="• • • • • •" 
                       class="w-full text-center tracking-widest font-mono text-base border border-slate-300 rounded-lg py-2 focus:outline-none focus:border-fkBlue" />
            </div>

            <button type="button" id="requestOtpBtn" class="w-full bg-fkOrange hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-lg shadow transition-colors">
                Request OTP
            </button>
            <button type="submit" id="submitLoginBtn" class="hidden w-full bg-fkBlue hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg shadow transition-colors">
                Verify & Login
            </button>
        </form>

        <div class="my-4 flex items-center justify-between text-xs text-slate-400">
            <span class="border-b flex-1"></span>
            <span class="px-2">OR</span>
            <span class="border-b flex-1"></span>
        </div>

        <!-- Social Logins -->
        <div class="space-y-2">
            <button onclick="window.location.href='index.php'" class="w-full border border-slate-300 rounded-lg py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2">
                <i class="fa-brands fa-google text-red-500"></i> Continue with Google
            </button>
        </div>

        <p class="text-center text-xs text-slate-600 mt-6">
            New to Flipkart? <a href="register.php" class="text-fkBlue font-bold hover:underline">Create an account</a>
        </p>

        <!-- Quick Switcher to Other Roles -->
        <div class="mt-6 pt-4 border-t border-slate-100 text-center">
            <p class="text-[11px] text-slate-400 mb-2">Switching Portal?</p>
            <div class="flex justify-center gap-3 text-xs">
                <a href="seller/login.php" class="text-fkOrange hover:underline font-medium">Seller Login</a>
                <span class="text-slate-300">•</span>
                <a href="delivery/login.php" class="text-emerald-600 hover:underline font-medium">Delivery App</a>
                <span class="text-slate-300">•</span>
                <a href="admin/login.php" class="text-purple-600 hover:underline font-medium">Admin Console</a>
            </div>
        </div>
    </div>
</div>

<script>
    const requestOtpBtn = document.getElementById('requestOtpBtn');
    const otpField = document.getElementById('otpField');
    const submitLoginBtn = document.getElementById('submitLoginBtn');

    if (requestOtpBtn) {
        requestOtpBtn.onclick = () => {
            otpField.classList.remove('hidden');
            requestOtpBtn.classList.add('hidden');
            submitLoginBtn.classList.remove('hidden');
            alert('Simulation OTP sent: 123456 (Enter to login)');
        };
    }
</script>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
<?php require_once __DIR__ . '/common/bottom.php'; ?>
