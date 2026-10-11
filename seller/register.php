<?php
require_once __DIR__ . '/../common/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flipkart Seller Registration - KYC & Onboarding</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 min-h-screen font-sans">
    <header class="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <span class="text-2xl font-black italic text-blue-600">Flipkart</span>
            <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">Vendor KYC Onboarding</span>
        </div>
        <a href="login.php" class="text-xs text-blue-600 font-bold hover:underline">Already registered? Log in</a>
    </header>

    <div class="max-w-2xl mx-auto p-4 my-6">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
            <div class="border-b pb-4 mb-6">
                <h1 class="text-lg font-bold text-slate-900">Seller Registration & Document Verification</h1>
                <p class="text-xs text-slate-500 mt-1">Please provide valid GSTIN and banking details to begin listing products.</p>
            </div>

            <form action="dashboard.php" method="POST" class="space-y-4 text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                        <input type="text" name="name" placeholder="John Doe" required class="w-full border rounded-lg p-2.5" />
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Registered Business Name</label>
                        <input type="text" name="business_name" placeholder="Apex Retail Solutions LLP" required class="w-full border rounded-lg p-2.5" />
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">GSTIN Number (15 Digits)</label>
                        <input type="text" name="gst_no" placeholder="07AAAAA0000A1Z5" required class="w-full border rounded-lg p-2.5 font-mono uppercase" />
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">PAN Card Number</label>
                        <input type="text" name="pan_no" placeholder="ABCDE1234F" required class="w-full border rounded-lg p-2.5 font-mono uppercase" />
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Business Email Address</label>
                        <input type="email" name="email" placeholder="contact@business.com" required class="w-full border rounded-lg p-2.5" />
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Contact Phone Number</label>
                        <input type="tel" name="phone" placeholder="9876543210" required class="w-full border rounded-lg p-2.5" />
                    </div>
                </div>

                <!-- Bank Account Details for Settlements -->
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <h3 class="font-bold text-slate-800 flex items-center gap-2">
                        <i class="fa-solid fa-building-columns text-blue-600"></i> Payout Settlement Bank Account
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label class="block font-medium text-slate-600 mb-1">Bank Name & Branch</label>
                            <input type="text" name="bank_name" placeholder="HDFC Bank, Connaught Place" required class="w-full border rounded bg-white p-2" />
                        </div>
                        <div>
                            <label class="block font-medium text-slate-600 mb-1">Account Number</label>
                            <input type="text" name="account_no" placeholder="5010023456789" required class="w-full border rounded bg-white p-2 font-mono" />
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block font-medium text-slate-600 mb-1">IFSC Code</label>
                            <input type="text" name="ifsc" placeholder="HDFC0001234" required class="w-full border rounded bg-white p-2 font-mono uppercase" />
                        </div>
                    </div>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors text-xs">
                        SUBMIT APPLICATION FOR ADMIN VERIFICATION
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
