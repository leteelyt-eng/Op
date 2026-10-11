<?php
// Flipkart Mobile Bottom Navigation Bar & Global Modals
?>
<!-- Fixed Bottom Navigation Bar -->
<nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center justify-around py-1.5 shadow-lg max-w-md mx-auto sm:max-w-none">
    <a href="index.php" class="flex flex-col items-center justify-center text-fkBlue w-1/5 text-center">
        <i class="fa-solid fa-house text-base"></i>
        <span class="text-[10px] font-semibold mt-0.5">Home</span>
    </a>
    <a href="product.php" class="flex flex-col items-center justify-center text-slate-500 hover:text-fkBlue w-1/5 text-center">
        <i class="fa-solid fa-shapes text-base"></i>
        <span class="text-[10px] font-medium mt-0.5">Categories</span>
    </a>
    <a href="order_tracking.php" class="flex flex-col items-center justify-center text-slate-500 hover:text-fkBlue w-1/5 text-center">
        <i class="fa-solid fa-bell text-base"></i>
        <span class="text-[10px] font-medium mt-0.5">Orders</span>
    </a>
    <a href="login.php" class="flex flex-col items-center justify-center text-slate-500 hover:text-fkBlue w-1/5 text-center">
        <i class="fa-solid fa-circle-user text-base"></i>
        <span class="text-[10px] font-medium mt-0.5">Account</span>
    </a>
    <a href="cart.php" class="flex flex-col items-center justify-center text-slate-500 hover:text-fkBlue w-1/5 text-center relative">
        <i class="fa-solid fa-cart-shopping text-base"></i>
        <span class="text-[10px] font-medium mt-0.5">Cart</span>
    </a>
</nav>

<!-- Pincode / GPS Location Modal -->
<div id="pincodeModal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl">
        <div class="flex items-center justify-between border-b pb-3 mb-3">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-location-crosshairs text-fkBlue"></i> Choose Delivery Location
            </h3>
            <button id="closePincodeModal" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p class="text-xs text-slate-500 mb-3">Enter your 6-digit Pincode to view product availability, express delivery and COD options.</p>
        <div class="flex gap-2 mb-3">
            <input type="text" id="modalPincodeInput" maxlength="6" placeholder="Enter 6-digit PIN code" class="flex-1 border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-fkBlue" />
            <button id="applyPincodeBtn" class="bg-fkBlue text-white text-xs font-semibold px-4 py-2 rounded hover:bg-blue-700">Apply</button>
        </div>
        <button id="detectGpsBtn" class="w-full flex items-center justify-center gap-2 text-xs font-semibold text-fkBlue border border-fkBlue/30 rounded py-2 hover:bg-blue-50">
            <i class="fa-solid fa-crosshairs"></i> Detect my current location (GPS)
        </button>
    </div>
</div>

<!-- Voice Search Simulation Modal -->
<div id="voiceModal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl p-6 text-center max-w-xs w-full shadow-2xl">
        <div class="w-16 h-16 bg-blue-100 text-fkBlue rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse text-2xl">
            <i class="fa-solid fa-microphone"></i>
        </div>
        <h4 class="text-sm font-bold text-slate-800 mb-1">Listening...</h4>
        <p class="text-xs text-slate-500 mb-4">Say "iPhone 15", "Running Shoes", "T-shirt"...</p>
        <button id="closeVoiceModal" class="text-xs bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full hover:bg-slate-200">Cancel</button>
    </div>
</div>

<!-- Visual / Camera Search Simulation Modal -->
<div id="visualModal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl">
        <div class="flex items-center justify-between border-b pb-2 mb-3">
            <h4 class="text-xs font-bold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-camera text-fkBlue"></i> Visual Search (AI Lens)
            </h4>
            <button id="closeVisualModal" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer mb-3">
            <i class="fa-solid fa-cloud-arrow-up text-3xl text-fkBlue mb-2"></i>
            <p class="text-xs font-semibold text-slate-800">Upload product photo</p>
            <p class="text-[10px] text-slate-400">Flipkart AI Lens will scan & match items</p>
        </div>
        <button onclick="window.location.href='product.php?q=mobile'" class="w-full bg-fkBlue text-white text-xs font-semibold py-2 rounded-lg">Demo Visual Match</button>
    </div>
</div>

<script>
    // Global Modals Interaction
    const pincodeModal = document.getElementById('pincodeModal');
    const changePincodeBtn = document.getElementById('changePincodeBtn');
    const closePincodeModal = document.getElementById('closePincodeModal');
    const applyPincodeBtn = document.getElementById('applyPincodeBtn');
    const detectGpsBtn = document.getElementById('detectGpsBtn');
    const locationText = document.getElementById('currentLocationText');

    if (changePincodeBtn) changePincodeBtn.onclick = () => pincodeModal.classList.remove('hidden');
    if (closePincodeModal) closePincodeModal.onclick = () => pincodeModal.classList.add('hidden');
    
    if (applyPincodeBtn) {
        applyPincodeBtn.onclick = () => {
            const pin = document.getElementById('modalPincodeInput').value.trim();
            if (pin.length === 6) {
                if (locationText) locationText.textContent = 'Deliver to ' + pin + ' (Verified)';
                pincodeModal.classList.add('hidden');
            } else {
                alert('Please enter a valid 6-digit Pincode');
            }
        };
    }

    if (detectGpsBtn) {
        detectGpsBtn.onclick = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        if (locationText) locationText.textContent = 'Deliver to GPS: ' + pos.coords.latitude.toFixed(2) + ', ' + pos.coords.longitude.toFixed(2);
                        pincodeModal.classList.add('hidden');
                    },
                    () => {
                        if (locationText) locationText.textContent = 'Deliver to New Delhi 110016';
                        pincodeModal.classList.add('hidden');
                    }
                );
            }
        };
    }

    // Voice & Visual Search
    const voiceBtn = document.getElementById('voiceSearchBtn');
    const voiceModal = document.getElementById('voiceModal');
    const closeVoiceBtn = document.getElementById('closeVoiceModal');
    if (voiceBtn) voiceBtn.onclick = () => voiceModal.classList.remove('hidden');
    if (closeVoiceBtn) closeVoiceBtn.onclick = () => voiceModal.classList.add('hidden');

    const visualBtn = document.getElementById('visualSearchBtn');
    const visualModal = document.getElementById('visualModal');
    const closeVisualBtn = document.getElementById('closeVisualModal');
    if (visualBtn) visualBtn.onclick = () => visualModal.classList.remove('hidden');
    if (closeVisualBtn) closeVisualBtn.onclick = () => visualModal.classList.add('hidden');
</script>
</body>
</html>
