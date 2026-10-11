import React, { useState, useRef, useEffect } from 'react';
import { 
  Bike, Navigation, CheckCircle2, Phone, MapPin, 
  Signature, Camera, ShieldCheck, ArrowRight, ArrowLeft,
  X, Crosshair, AlertCircle, Coins, DollarSign, Clock,
  Check, RefreshCw, Sparkles, User, ExternalLink, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  INITIAL_RIDER, INITIAL_DELIVERY_ORDERS, NAVIGATION_STEPS,
  DeliveryOrder, RiderProfile 
} from './data/mockDeliveryData';

export default function App() {
  const [rider, setRider] = useState<RiderProfile>(INITIAL_RIDER);
  const [orders, setOrders] = useState<DeliveryOrder[]>(INITIAL_DELIVERY_ORDERS);
  const [activeTab, setActiveTab] = useState<'tasks' | 'navigation' | 'pod' | 'earnings'>('tasks');
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder>(INITIAL_DELIVERY_ORDERS[0]);
  
  // Navigation simulation state
  const [currentNavStep, setCurrentNavStep] = useState(0);
  const [etaRemaining, setEtaRemaining] = useState(8);
  const [speedKmH, setSpeedKmH] = useState(28);

  // POD States
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [podCompletedOrder, setPodCompletedOrder] = useState<DeliveryOrder | null>(null);

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Toggle Shift Status
  const toggleDuty = () => {
    setRider(prev => ({
      ...prev,
      online_status: !prev.online_status
    }));
  };

  // Start Navigation on specific order
  const handleStartNav = (order: DeliveryOrder) => {
    setSelectedOrder(order);
    setActiveTab('navigation');
  };

  // Open POD on specific order
  const handleOpenPod = (order: DeliveryOrder) => {
    setSelectedOrder(order);
    setOtpInput('');
    setOtpError('');
    setHasPhoto(false);
    setSignatureSaved(false);
    setActiveTab('pod');
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0284c7';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setSignatureSaved(true);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureSaved(false);
  };

  // Confirm Complete POD
  const handleConfirmPod = () => {
    if (otpInput !== selectedOrder.otp_code) {
      setOtpError(`Invalid OTP code! Please ask customer for correct 4-digit code (${selectedOrder.otp_code})`);
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Update orders list
    const updated = orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'delivered' as const } : o);
    setOrders(updated);

    // Update rider stats
    setRider(prev => ({
      ...prev,
      total_deliveries: prev.total_deliveries + 1,
      today_earnings: prev.today_earnings + 90,
      cod_in_hand: selectedOrder.payment_method === 'cod' ? prev.cod_in_hand + selectedOrder.amount : prev.cod_in_hand
    }));

    setPodCompletedOrder(selectedOrder);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col max-w-md mx-auto shadow-2xl relative font-sans border-x border-slate-800">
      {/* 1. TOP STATUS BAR */}
      <header className="bg-slate-900 border-b border-slate-800 p-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">{rider.name}</span>
                <span className="text-[10px] bg-sky-950 text-sky-400 border border-sky-800 px-1.5 rounded font-mono font-bold">
                  ★ {rider.rating}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <span>{rider.vehicle_no}</span> • <span>{rider.hub_name.slice(0, 16)}...</span>
              </p>
            </div>
          </div>

          {/* Duty Toggle Button */}
          <button 
            onClick={toggleDuty}
            className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${rider.online_status ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
          >
            <span className={`w-2 h-2 rounded-full ${rider.online_status ? 'bg-slate-950 animate-ping' : 'bg-slate-500'}`}></span>
            <span>{rider.online_status ? 'ON DUTY' : 'OFFLINE'}</span>
          </button>
        </div>

        {/* Device Metrics Bar */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/80">
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <MapPin className="w-3 h-3 text-emerald-400" /> GPS High Accuracy (3m)
          </span>
          <span className="flex items-center gap-1 font-mono">
            <i className="fa-solid fa-battery-three-quarters text-emerald-400"></i> {rider.battery_level}%
          </span>
          <span className="text-amber-400 font-mono font-bold">
            Cash: ₹{rider.cod_in_hand.toLocaleString('en-IN')}
          </span>
        </div>
      </header>

      {/* 2. BODY CONTENT VIEW */}
      <main className="flex-1 overflow-y-auto pb-20 p-3 space-y-3 no-scrollbar">
        {/* VIEW 1: ASSIGNED ORDERS & RUN SHEET */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {/* Today's Shift KPI Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Today Runs</span>
                <span className="text-lg font-black text-white">{orders.length + 8}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Delivered</span>
                <span className="text-lg font-black text-emerald-400">
                  {orders.filter(o => o.status === 'delivered').length + 8}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Earnings</span>
                <span className="text-lg font-black text-amber-400">₹{rider.today_earnings}</span>
              </div>
            </div>

            {/* Task List Header */}
            <div className="flex items-center justify-between pt-1">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span> Active Run Sheet ({orders.filter(o => o.status !== 'delivered').length} pending)
              </h2>
              <span className="text-[10px] text-sky-400 font-mono">Cluster: Noida Sec 62</span>
            </div>

            {/* Orders Cards */}
            {orders.map((order, idx) => (
              <div 
                key={order.id}
                className={`border rounded-2xl p-3.5 transition-all ${order.status === 'delivered' ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-900 border-slate-700 shadow-md'}`}
              >
                {/* Order Top Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black font-mono text-white">{order.order_number}</span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">#{idx + 1}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-200 mt-0.5 block">{order.customer_name}</span>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider inline-block ${order.payment_method === 'cod' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'}`}>
                      {order.payment_method === 'cod' ? `COD ₹${order.amount.toLocaleString('en-IN')}` : 'PAID ONLINE'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{order.distance} • {order.eta_minutes}m</span>
                  </div>
                </div>

                {/* Address & Landmark */}
                <div className="mt-2.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{order.address}, {order.pincode}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 pl-5">Near: {order.landmark}</p>
                </div>

                {/* Item Details */}
                <div className="flex items-center gap-2.5 mt-2.5 py-1.5 border-t border-slate-800">
                  <img src={order.item_image} alt={order.item_name} className="w-10 h-10 object-contain rounded bg-slate-950 p-1" />
                  <div className="flex-1 text-xs">
                    <p className="text-slate-200 font-medium truncate">{order.item_name}</p>
                    {order.open_box_required && (
                      <span className="text-[9px] bg-purple-900/60 text-purple-300 px-1.5 py-0.2 rounded font-semibold inline-flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3" /> Open Box Delivery Required
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {order.status !== 'delivered' ? (
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800">
                    <a 
                      href={`tel:${order.customer_phone}`}
                      className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 border border-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>Call</span>
                    </a>

                    <button 
                      onClick={() => handleStartNav(order)}
                      className="bg-sky-600 hover:bg-sky-500 active:scale-95 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Navigate</span>
                    </button>

                    <button 
                      onClick={() => handleOpenPod(order)}
                      className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Deliver</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 text-center py-1.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Delivered & Verified with OTP
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: LIVE GPS NAVIGATION SIMULATOR */}
        {activeTab === 'navigation' && (
          <div className="space-y-3">
            {/* Top Back & Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Task List
              </button>
              <span className="text-[10px] bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800 font-mono">
                GPS LOCKED • LIVE ROUTE
              </span>
            </div>

            {/* Turn-by-Turn Guidance Banner */}
            <div className="bg-gradient-to-r from-sky-950 to-indigo-950 border border-sky-500/40 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-slate-950 flex items-center justify-center text-xl font-black shadow-lg">
                  <i className={`fa-solid ${NAVIGATION_STEPS[currentNavStep]?.icon || 'fa-arrow-up'}`}></i>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-sky-400 font-mono uppercase tracking-wider block">In {NAVIGATION_STEPS[currentNavStep]?.distance}</span>
                  <h3 className="text-sm font-bold text-white leading-tight mt-0.5">
                    {NAVIGATION_STEPS[currentNavStep]?.instruction}
                  </h3>
                </div>
              </div>

              {/* Progress step switcher */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-sky-800/60 text-xs">
                <span className="text-slate-300 font-mono text-[11px]">
                  Step {currentNavStep + 1} of {NAVIGATION_STEPS.length}
                </span>
                <div className="flex gap-2">
                  <button 
                    disabled={currentNavStep === 0}
                    onClick={() => setCurrentNavStep(prev => Math.max(0, prev - 1))}
                    className="px-2.5 py-1 bg-slate-800 disabled:opacity-40 rounded text-slate-300 text-[11px]"
                  >
                    Prev
                  </button>
                  <button 
                    disabled={currentNavStep === NAVIGATION_STEPS.length - 1}
                    onClick={() => setCurrentNavStep(prev => Math.min(NAVIGATION_STEPS.length - 1, prev + 1))}
                    className="px-2.5 py-1 bg-sky-600 disabled:opacity-40 rounded text-white font-bold text-[11px]"
                  >
                    Next Turn
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Live Route Map Canvas */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl h-64 overflow-hidden shadow-inner flex flex-col justify-between p-3">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Simulated Map Roads & Markers */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Route polyline */}
                <path d="M 40 210 Q 120 180 160 120 T 320 60" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 4" />
                <path d="M 40 210 Q 120 180 160 120 T 320 60" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                
                {/* Destination Pin */}
                <circle cx="320" cy="60" r="10" fill="#ef4444" />
                <circle cx="320" cy="60" r="4" fill="#ffffff" />
                
                {/* Current Vehicle Position */}
                <circle cx="160" cy="120" r="14" fill="#0284c7" opacity="0.3" className="animate-ping" />
                <circle cx="160" cy="120" r="8" fill="#0284c7" />
                <circle cx="160" cy="120" r="4" fill="#ffffff" />
              </svg>

              {/* Speed & ETA Gauge */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-slate-950/80 backdrop-blur-xs border border-slate-700 px-3 py-1.5 rounded-xl font-mono text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Speed</span>
                  <span className="text-base font-black text-sky-400">{speedKmH} <span className="text-[10px] font-normal">km/h</span></span>
                </div>

                <div className="bg-slate-950/80 backdrop-blur-xs border border-slate-700 px-3 py-1.5 rounded-xl font-mono text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">ETA Countdown</span>
                  <span className="text-base font-black text-emerald-400">{etaRemaining} <span className="text-[10px] font-normal">min left</span></span>
                </div>
              </div>

              {/* Bottom Target Destination Strip */}
              <div className="relative z-10 bg-slate-950/90 backdrop-blur-xs border border-slate-800 rounded-xl p-2 flex items-center justify-between text-xs">
                <div className="truncate mr-2">
                  <span className="font-bold text-white block truncate">{selectedOrder.customer_name}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{selectedOrder.address}</span>
                </div>
                <button 
                  onClick={() => handleOpenPod(selectedOrder)}
                  className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-[11px] px-3 py-1.5 rounded-lg shrink-0 shadow-md"
                >
                  Arrived & Verify POD
                </button>
              </div>
            </div>

            {/* Quick Actions at Doorstep */}
            <div className="grid grid-cols-2 gap-2">
              <a 
                href={`tel:${selectedOrder.customer_phone}`}
                className="bg-slate-900 border border-slate-700 py-2.5 rounded-xl text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 hover:bg-slate-800"
              >
                <Phone className="w-4 h-4 text-sky-400" /> Call {selectedOrder.customer_name.split(' ')[0]}
              </a>
              <button 
                onClick={() => handleOpenPod(selectedOrder)}
                className="bg-emerald-600 hover:bg-emerald-500 py-2.5 rounded-xl text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" /> Open Box POD Form
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: PROOF OF DELIVERY (POD) VERIFICATION */}
        {activeTab === 'pod' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Run Sheet
              </button>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                POD HANDOVER ENGINE
              </span>
            </div>

            {/* Order Target Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedOrder.customer_name}</h3>
                  <p className="text-[10px] text-slate-400">{selectedOrder.address}</p>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${selectedOrder.payment_method === 'cod' ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-400/20 text-emerald-300'}`}>
                  {selectedOrder.payment_method === 'cod' ? `Collect ₹${selectedOrder.amount}` : 'Prepaid'}
                </span>
              </div>
            </div>

            {/* STEP 1: OPEN BOX DELIVERY OTP VERIFICATION */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-sky-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-[10px]">1</span>
                  Delivery Secret OTP
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Customer OTP</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Customer received a 4-digit code in their Flipkart SMS/App:
              </p>

              <div className="flex gap-2">
                <input 
                  type="text"
                  maxLength={4}
                  value={otpInput}
                  onChange={(e) => { setOtpInput(e.target.value); setOtpError(''); }}
                  placeholder="Enter 4-Digit OTP"
                  className="flex-1 bg-slate-950 border border-slate-700 text-center font-mono font-black text-lg py-2.5 rounded-xl tracking-widest text-white focus:outline-none focus:border-sky-500"
                />
                <button 
                  onClick={() => setOtpInput(selectedOrder.otp_code)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold px-3 rounded-xl border border-slate-700"
                >
                  Auto-Fill
                </button>
              </div>

              {otpError && (
                <p className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {otpError}
                </p>
              )}
            </div>

            {/* STEP 2: DIGITAL SIGNATURE CANVAS */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-sky-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-[10px]">2</span>
                  Customer Touch Signature
                </span>
                <button 
                  onClick={clearSignature}
                  className="text-[10px] text-slate-400 hover:text-amber-400 font-medium"
                >
                  Clear Pad
                </button>
              </div>

              <div className="border border-slate-700 rounded-xl bg-slate-950 overflow-hidden relative">
                <canvas 
                  ref={canvasRef}
                  width={340}
                  height={110}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full cursor-crosshair touch-none"
                />
                {!signatureSaved && (
                  <span className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs pointer-events-none">
                    Sign on screen with finger or stylus
                  </span>
                )}
              </div>
            </div>

            {/* STEP 3: PARCEL PHOTO SNAPSHOT */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-sky-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-[10px]">3</span>
                  Doorstep Package Photo
                </span>
                {hasPhoto && <span className="text-[10px] text-emerald-400 font-bold">✓ Captured</span>}
              </div>

              {!hasPhoto ? (
                <button 
                  onClick={() => setHasPhoto(true)}
                  className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-colors"
                >
                  <Camera className="w-6 h-6 text-sky-400" />
                  <span className="text-xs font-semibold text-slate-300">Tap to capture package verification photo</span>
                  <span className="text-[10px] text-slate-500">Auto-watermarked with GPS & Time</span>
                </button>
              ) : (
                <div className="p-2.5 bg-slate-950 rounded-xl border border-emerald-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={selectedOrder.item_image} alt="Captured" className="w-12 h-12 object-cover rounded-lg bg-slate-800" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">IMG_POD_9021.jpg</p>
                      <p className="text-[10px] text-slate-400 font-mono">GPS: 28.6280° N, 77.3649° E • Verified</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setHasPhoto(false)}
                    className="text-xs text-slate-400 hover:text-red-400 p-1"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>

            {/* FINAL SUBMIT BUTTON */}
            <button 
              onClick={handleConfirmPod}
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-3 rounded-2xl shadow-xl text-sm flex items-center justify-center gap-2 transition-transform"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>CONFIRM DELIVERY & COLLECT PROOF</span>
            </button>
          </div>
        )}

        {/* VIEW 4: CASH SETTLEMENTS & EARNINGS LEDGER */}
        {activeTab === 'earnings' && (
          <div className="space-y-3">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Cash Reconciliation & Fleet Ledger
            </h2>

            {/* Total Balance Card */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-4 shadow-xl">
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">Cash in Hand (To Deposit)</span>
              <div className="text-2xl font-black text-white mt-1">
                ₹{rider.cod_in_hand.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Must be deposited at Sector 62 Ekart Hub before 9:00 PM today.
              </p>

              <button 
                onClick={() => alert(`Hub Deposit Barcode: DEP-EK-9021-COD\nAmount: ₹${rider.cod_in_hand}\nShow this to Cashier at Ekart Noida Hub.`)}
                className="mt-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-md w-full"
              >
                Generate Hub Cash Deposit Barcode
              </button>
            </div>

            {/* Earnings Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs">
              <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">Today's Payout Calculation</h3>
              <div className="flex justify-between text-slate-400">
                <span>Base Deliveries (8 orders × ₹70)</span>
                <span className="text-white font-mono">₹560</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Distance Surge Bonus (28 km)</span>
                <span className="text-white font-mono">₹280</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Peak Hour & Rain Incentives</span>
                <span className="text-white font-mono">₹250</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Customer In-App Tips</span>
                <span className="text-white font-mono">₹160</span>
              </div>
              <div className="flex justify-between text-slate-200 font-bold border-t border-slate-800 pt-2 text-sm">
                <span>Total Net Earnings Today</span>
                <span className="text-emerald-400 font-mono">₹{rider.today_earnings}</span>
              </div>
            </div>

            {/* Vehicle & KYC Specs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-xs space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Registered Courier Details</span>
              <p className="text-slate-200"><strong>Vehicle:</strong> {rider.vehicle_model} ({rider.vehicle_no})</p>
              <p className="text-slate-200"><strong>Driving License:</strong> DL-1420180029194 (Active)</p>
              <p className="text-slate-200"><strong>Insurance:</strong> Valid up to Nov 2027</p>
            </div>
          </div>
        )}
      </main>

      {/* 3. POD SUCCESS MODAL */}
      {podCompletedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500 rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl text-white">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 text-2xl border border-emerald-500/40">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-white">Delivery Verified!</h3>
            <p className="text-xs text-slate-300 mt-1">
              Order #{podCompletedOrder.order_number} marked as Delivered in central database.
            </p>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 my-3 text-xs font-mono text-emerald-400">
              + ₹90 Payout Added to Wallet
            </div>
            <button 
              onClick={() => {
                setPodCompletedOrder(null);
                setActiveTab('tasks');
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Continue Next Run
            </button>
          </div>
        </div>
      )}

      {/* 4. BOTTOM MOBILE APP NAVIGATION DOCK */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around z-40">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${activeTab === 'tasks' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
        >
          <Bike className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Run Sheet</span>
        </button>

        <button 
          onClick={() => setActiveTab('navigation')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${activeTab === 'navigation' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">GPS Nav</span>
        </button>

        <button 
          onClick={() => setActiveTab('pod')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${activeTab === 'pod' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">POD Sign</span>
        </button>

        <button 
          onClick={() => setActiveTab('earnings')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${activeTab === 'earnings' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
        >
          <Coins className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Earnings</span>
        </button>
      </nav>
    </div>
  );
}
