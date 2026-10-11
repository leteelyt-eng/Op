import React, { useState } from 'react';
import { 
  Store, Package, ShoppingBag, TrendingUp, AlertTriangle, 
  Plus, Upload, Barcode, FileText, CheckCircle2, DollarSign,
  ArrowRight, Search, ShieldCheck, X
} from 'lucide-react';
import { Product, Order, Seller } from '../data/mockData';

interface SellerPortalProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Partial<Product>) => void;
  onUpdateOrderStatus: (orderId: number, status: Order['status']) => void;
  onBackToCustomer: () => void;
}

export const SellerPortal: React.FC<SellerPortalProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateOrderStatus,
  onBackToCustomer
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'ads' | 'payouts'>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [adBid, setAdBid] = useState(6.5);
  const [adBudget, setAdBudget] = useState(1500);

  // Form State for new product
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('24999');
  const [newMrp, setNewMrp] = useState('29999');
  const [newStock, setNewStock] = useState('50');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    onAddProduct({
      name: newTitle,
      price: Number(newPrice),
      mrp: Number(newMrp),
      stock: Number(newStock),
      cat_id: 1,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
      brand: 'TechGizmo',
      rating: 4.5,
      reviews_count: 1,
      is_assured: true,
      qc_status: 'approved',
      colors: ['Default'],
      variants: ['Standard'],
      specs: { 'Origin': 'Made in India' }
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-12">
      {/* Top Seller Bar */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black italic text-blue-600">Flipkart</span>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase">
            Seller Hub
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">|</span>
          <span className="hidden sm:inline text-xs font-bold text-slate-700">TechGizmo Retailers (Tier 1 Gold)</span>
        </div>
        <button 
          onClick={onBackToCustomer} 
          className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
        >
          <Store className="w-3.5 h-3.5" /> Customer View
        </button>
      </header>

      {/* Tabs Subnav */}
      <nav className="bg-white border-b px-4 flex gap-6 overflow-x-auto text-xs font-semibold text-slate-600 no-scrollbar">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`py-3 ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('inventory')} 
          className={`py-3 ${activeTab === 'inventory' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
        >
          Inventory & Listings ({products.length})
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`py-3 ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
        >
          Order Fulfillment ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab('ads')} 
          className={`py-3 ${activeTab === 'ads' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
        >
          Sponsored Ads (CPC)
        </button>
        <button 
          onClick={() => setActiveTab('payouts')} 
          className={`py-3 ${activeTab === 'payouts' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
        >
          Settlements & TDS
        </button>
      </nav>

      <main className="max-w-5xl mx-auto p-4 space-y-4">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Gross Sales (30 Days)</span>
                <div className="text-xl font-bold text-slate-900 mt-1">₹4,82,540</div>
                <span className="text-[10px] text-emerald-600 font-medium">+14.2% Growth</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Orders to Dispatch</span>
                <div className="text-xl font-bold text-blue-600 mt-1">{orders.length} Active</div>
                <span className="text-[10px] text-amber-600 font-medium">SLA: Dispatch today</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Return Rate</span>
                <div className="text-xl font-bold text-slate-900 mt-1">1.8%</div>
                <span className="text-[10px] text-emerald-600 font-medium">Below SLA threshold</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Next Bank Payout</span>
                <div className="text-xl font-bold text-emerald-600 mt-1">₹68,400</div>
                <span className="text-[10px] text-slate-500">Crediting Tuesday</span>
              </div>
            </div>

            {/* Low Stock Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-amber-900 font-bold block">Low Stock Alert: Sony WH-1000XM5</strong>
                  <span className="text-[11px] text-amber-700">18 units left. Replenish inventory to maintain Assured badge.</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('inventory')}
                className="bg-amber-600 text-white font-bold px-3 py-1.5 rounded text-xs shadow-xs"
              >
                Stock Sync
              </button>
            </div>

            {/* Action Orders */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
              <h3 className="font-bold text-xs text-slate-900 mb-3">Orders Awaiting Dispatch</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {orders.map((o) => (
                  <div key={o.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-blue-600">{o.order_number}</span>
                      <p className="font-semibold text-slate-800">{o.product.name}</p>
                      <span className="text-[10px] text-slate-400">Customer: {o.customer_name} • {o.pincode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">₹{o.total_amount.toLocaleString('en-IN')}</span>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded"
                      >
                        Fulfill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & LISTINGS */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border">
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddModal(true)} 
                  className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Single Product
                </button>
                <button 
                  onClick={() => setShowBulkModal(true)} 
                  className="border border-slate-300 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-slate-50"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600" /> Bulk CSV Upload
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase border-b">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Live Stock</th>
                    <th className="p-3">QC Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="p-3 flex items-center gap-2.5">
                        <img src={p.image} alt={p.name} className="w-8 h-8 object-contain rounded border" />
                        <span className="font-semibold text-slate-900 truncate max-w-xs">{p.name}</span>
                      </td>
                      <td className="p-3 font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold ${p.stock < 20 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-[10px]">
                          Approved
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button className="text-blue-600 hover:underline font-semibold">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-blue-600 text-xs">#{o.order_number}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {o.payment_method.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-400">• {o.created_at}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{o.product.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Recipient: {o.customer_name} • {o.address}</p>
                  <p className="text-[11px] text-slate-700 font-semibold mt-1">Value: ₹{o.total_amount.toLocaleString('en-IN')} • Carrier: Ekart Hyperlocal</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button 
                    onClick={() => alert(`Generated Shipping Label & Barcode for ${o.order_number}`)} 
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Barcode className="w-3.5 h-3.5" /> Label
                  </button>
                  <button 
                    onClick={() => alert(`Printed Tax Invoice for ${o.order_number}`)} 
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Invoice
                  </button>
                  <button 
                    onClick={() => onUpdateOrderStatus(o.id, 'shipped')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-xs"
                  >
                    Handover to Ekart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: FLIPKART ADS */}
        {activeTab === 'ads' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Sponsored Product Campaigns (Flipkart Ads)</h3>
            <p className="text-slate-500">Run keyword and category auction bids to put your products at the top of search feeds.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cost Per Click (CPC) Maximum Bid: ₹{adBid.toFixed(2)}</label>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  step="0.5" 
                  value={adBid} 
                  onChange={(e) => setAdBid(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="text-[10px] text-slate-400">Recommended auction range: ₹5.50 - ₹9.00</span>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Daily Campaign Budget: ₹{adBudget}</label>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="250" 
                  value={adBudget} 
                  onChange={(e) => setAdBudget(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <strong className="block font-bold text-slate-900">Estimated Return on Ad Spend (ROAS)</strong>
                <span className="text-slate-500">Based on historic conversion rates in Electronics category</span>
              </div>
              <span className="text-lg font-black text-emerald-600">8.4x ROAS</span>
            </div>

            <button 
              onClick={() => alert(`Ad Campaign Updated: Max Bid ₹${adBid}/click with Daily Budget ₹${adBudget}`)}
              className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-xs"
            >
              Update Bidding Campaign
            </button>
          </div>
        )}

        {/* TAB 5: PAYOUT SETTLEMENTS */}
        {activeTab === 'payouts' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Weekly Payout Settlements & TDS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border p-3 rounded-lg bg-emerald-50/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Upcoming Tuesday Payout</span>
                <div className="text-xl font-bold text-emerald-700 mt-1">₹68,400.00</div>
                <span className="text-[10px] text-slate-500">HDFC Bank Acc: ****56789</span>
              </div>
              <div className="border p-3 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Marketplace Take-Rate</span>
                <div className="text-xl font-bold text-slate-800 mt-1">6.5% - 8.0%</div>
                <span className="text-[10px] text-slate-500">Mobiles & Electronics</span>
              </div>
              <div className="border p-3 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">TDS Section 194-O</span>
                <div className="text-xl font-bold text-slate-800 mt-1">1.00%</div>
                <span className="text-[10px] text-slate-500">Credited to Income Tax Portal</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-bold text-sm text-slate-900">Add Product Listing</h3>
              <button onClick={() => setShowAddModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="e.g. OnePlus 12R 5G (Cool Blue, 128 GB)" 
                  required 
                  className="w-full border rounded p-2" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                  <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP (₹)</label>
                  <input type="number" value={newMrp} onChange={(e) => setNewMrp(e.target.value)} className="w-full border rounded p-2" required />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stock Units</label>
                <input type="number" value={newStock} onChange={(e) => setNewStock(e.target.value)} className="w-full border rounded p-2" required />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5 rounded shadow-xs mt-2">
                Submit Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bulk CSV Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center text-xs">
            <Upload className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-slate-900 mb-1">Bulk Product Catalog Import</h3>
            <p className="text-slate-500 mb-4">Upload standard CSV format file with multiple SKU parameters.</p>
            <button 
              onClick={() => { alert('Bulk CSV Import Successful: 15 items added!'); setShowBulkModal(false); }}
              className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg"
            >
              Simulate Upload 15 SKUs
            </button>
            <button 
              onClick={() => setShowBulkModal(false)}
              className="mt-2 text-slate-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
