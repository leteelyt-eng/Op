<?php
$page_title = 'Flipkart - Secure Checkout';
require_once __DIR__ . '/common/header.php';
?>

<div class="p-3 max-w-lg mx-auto pb-24">
    <!-- Trust Header Banner -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mb-3 flex items-center justify-between text-xs text-fkBlue">
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-lock text-sm"></i>
            <span class="font-semibold">100% Safe & Secure 256-bit SSL Payments</span>
        </div>
        <span class="text-[10px] text-slate-500">Step 3 of 3</span>
    </div>

    <!-- Step 1: Delivery Address Card -->
    <div class="bg-white rounded-lg p-3 border border-slate-200 mb-3 shadow-sm">
        <div class="flex items-center justify-between border-b pb-2 mb-2">
            <h3 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <span class="w-4 h-4 rounded-full bg-fkBlue text-white text-[10px] flex items-center justify-center">1</span>
                Delivery Address
            </h3>
            <button class="text-xs text-fkBlue font-semibold">Change</button>
        </div>
        <p class="text-xs font-bold text-slate-900">Rahul Sharma <span class="bg-slate-100 font-normal px-1.5 py-0.5 rounded text-[10px] ml-1">HOME</span> <span class="font-semibold text-slate-500 ml-2">9876543210</span></p>
        <p class="text-xs text-slate-600 mt-1">Flat 402, Lotus Heights, Sector 62, Noida, Uttar Pradesh - 201301</p>
    </div>

    <!-- Step 2: Payment Options -->
    <div class="bg-white rounded-lg p-3 border border-slate-200 shadow-sm mb-3">
        <div class="border-b pb-2 mb-3">
            <h3 class="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <span class="w-4 h-4 rounded-full bg-fkBlue text-white text-[10px] flex items-center justify-center">2</span>
                Payment Options
            </h3>
        </div>

        <form id="checkoutForm" action="order_tracking.php" method="GET" class="space-y-3 text-xs">
            <!-- UPI Option -->
            <label class="flex items-start gap-3 p-2.5 border rounded-lg hover:border-fkBlue cursor-pointer bg-slate-50/50">
                <input type="radio" name="payment_method" value="upi" checked class="mt-0.5 accent-fkBlue" />
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-900">UPI (Google Pay, PhonePe, Paytm)</span>
                        <span class="text-fkGreen font-bold text-[10px]">Instant</span>
                    </div>
                    <p class="text-slate-500 text-[11px] mt-0.5">Pay directly using your VPA / UPI ID or App</p>
                    <div class="mt-2 flex gap-2">
                        <input type="text" placeholder="yourname@okhdfcbank" class="w-full border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-fkBlue bg-white" />
                    </div>
                </div>
            </label>

            <!-- Credit / Debit Card -->
            <label class="flex items-start gap-3 p-2.5 border rounded-lg hover:border-fkBlue cursor-pointer">
                <input type="radio" name="payment_method" value="card" class="mt-0.5 accent-fkBlue" />
                <div class="flex-1">
                    <span class="font-bold text-slate-900">Credit / Debit / ATM Card</span>
                    <p class="text-slate-500 text-[11px] mt-0.5">Visa, MasterCard, RuPay, Maestro & Diners Club</p>
                </div>
            </label>

            <!-- Net Banking -->
            <label class="flex items-start gap-3 p-2.5 border rounded-lg hover:border-fkBlue cursor-pointer">
                <input type="radio" name="payment_method" value="netbanking" class="mt-0.5 accent-fkBlue" />
                <div class="flex-1">
                    <span class="font-bold text-slate-900">Net Banking</span>
                    <p class="text-slate-500 text-[11px] mt-0.5">All Major Indian Banks Supported</p>
                </div>
            </label>

            <!-- Cash on Delivery -->
            <label class="flex items-start gap-3 p-2.5 border rounded-lg hover:border-fkBlue cursor-pointer">
                <input type="radio" name="payment_method" value="cod" class="mt-0.5 accent-fkBlue" />
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-900">Cash on Delivery (COD)</span>
                        <span class="text-slate-400 text-[10px]">+₹10 Fee</span>
                    </div>
                    <p class="text-slate-500 text-[11px] mt-0.5">Pay with Cash or UPI upon open-box delivery</p>
                </div>
            </label>

            <!-- BNPL / EMI -->
            <label class="flex items-start gap-3 p-2.5 border rounded-lg hover:border-fkBlue cursor-pointer">
                <input type="radio" name="payment_method" value="emi" class="mt-0.5 accent-fkBlue" />
                <div class="flex-1">
                    <span class="font-bold text-slate-900">Flipkart Pay Later / EMI</span>
                    <p class="text-slate-500 text-[11px] mt-0.5">Shop now and pay next month or in easy EMIs</p>
                </div>
            </label>
        </form>
    </div>

    <!-- Price Summary Box -->
    <div class="bg-white rounded-lg p-3 border border-slate-200 text-xs shadow-sm">
        <h4 class="font-bold text-slate-800 mb-2">Order Price Summary</h4>
        <div class="space-y-1.5 text-slate-600">
            <div class="flex justify-between">
                <span>Items (2)</span>
                <span>₹24,897</span>
            </div>
            <div class="flex justify-between">
                <span>Delivery</span>
                <span class="text-fkGreen font-bold">FREE</span>
            </div>
            <div class="border-t pt-1.5 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Payable</span>
                <span>₹24,897</span>
            </div>
        </div>
    </div>
</div>

<!-- Sticky Bottom Pay Bar -->
<div class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center justify-between px-4 h-14 shadow-2xl max-w-md mx-auto sm:max-w-none">
    <div>
        <span class="text-[10px] text-slate-500 block leading-none">Total Amount</span>
        <span class="text-base font-bold text-slate-900">₹24,897</span>
    </div>
    <button onclick="document.getElementById('checkoutForm').submit()" class="bg-fkOrange hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded shadow">
        CONFIRM & PAY <i class="fa-solid fa-arrow-right ml-1"></i>
    </button>
</div>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
</body>
</html>
