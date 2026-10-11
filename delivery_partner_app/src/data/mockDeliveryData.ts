export interface DeliveryOrder {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  pincode: string;
  landmark: string;
  item_name: string;
  item_image: string;
  item_quantity: number;
  amount: number;
  payment_method: 'cod' | 'prepaid';
  status: 'assigned' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'failed';
  otp_code: string;
  distance: string;
  eta_minutes: number;
  open_box_required: boolean;
  notes?: string;
  rating?: number;
  review?: string;
  rated_at?: string;
}

export interface RiderProfile {
  id: number;
  name: string;
  phone: string;
  vehicle_no: string;
  vehicle_model: string;
  hub_name: string;
  rating: number;
  total_deliveries: number;
  today_earnings: number;
  cod_in_hand: number;
  online_status: boolean;
  battery_level: number;
  current_location: string;
}

export const INITIAL_RIDER: RiderProfile = {
  id: 101,
  name: 'Vikram Singh',
  phone: '+91 91234 56780',
  vehicle_no: 'DL 4S CZ 9021',
  vehicle_model: 'Honda Activa 6G (Black)',
  hub_name: 'Ekart Sector 62 Hub, Noida',
  rating: 4.9,
  total_deliveries: 1420,
  today_earnings: 1250,
  cod_in_hand: 24898,
  online_status: true,
  battery_level: 89,
  current_location: 'Sector 62, Noida, UP (GPS Locked)'
};

export const INITIAL_DELIVERY_ORDERS: DeliveryOrder[] = [
  {
    id: 1,
    order_number: 'OD4298174201',
    customer_name: 'Rahul Sharma',
    customer_phone: '9876543210',
    address: 'Flat 402, Lotus Heights, Sector 62',
    pincode: '201301',
    landmark: 'Near Fortis Hospital',
    item_name: 'Nothing Phone (2a) 5G (Black, 128 GB)',
    item_image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
    item_quantity: 1,
    amount: 23999,
    payment_method: 'cod',
    status: 'out_for_delivery',
    otp_code: '4921',
    distance: '1.4 km',
    eta_minutes: 8,
    open_box_required: true,
    notes: 'Please verify Open-Box contents before taking OTP'
  },
  {
    id: 2,
    order_number: 'OD7719284102',
    customer_name: 'Priya Kapoor',
    customer_phone: '9811223344',
    address: 'Villa 12, Palm Meadows, Indirapuram',
    pincode: '201014',
    landmark: 'Behind Shipra Mall',
    item_name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    item_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    item_quantity: 1,
    amount: 26990,
    payment_method: 'prepaid',
    status: 'assigned',
    otp_code: '8104',
    distance: '3.2 km',
    eta_minutes: 18,
    open_box_required: false,
    notes: 'Prepaid order • Leave with security if unavailable'
  },
  {
    id: 3,
    order_number: 'OD1029384756',
    customer_name: 'Amit Verma',
    customer_phone: '9988776655',
    address: 'Tower B, Flat 901, Shipra Sun City',
    pincode: '201014',
    landmark: 'Near Central Park',
    item_name: 'Highlander Men Slim Fit Casual Shirt',
    item_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    item_quantity: 1,
    amount: 899,
    payment_method: 'cod',
    status: 'assigned',
    otp_code: '3391',
    distance: '4.5 km',
    eta_minutes: 25,
    open_box_required: false,
    notes: 'Collect exact cash ₹899'
  }
];

export const NAVIGATION_STEPS = [
  { id: 1, instruction: 'Head north on Sector 62 Main Rd toward Fortis Roundabout', distance: '400 m', icon: 'fa-arrow-up' },
  { id: 2, instruction: 'Turn right at Mother Dairy Marg junction', distance: '850 m', icon: 'fa-arrow-turn-right' },
  { id: 3, instruction: 'Take the 2nd exit at roundabout toward Lotus Heights', distance: '300 m', icon: 'fa-diamond-turn-right' },
  { id: 4, instruction: 'Arrive at Gate 2, Lotus Heights (Flat 402, Tower 4 on left)', distance: '50 m', icon: 'fa-location-dot' }
];
