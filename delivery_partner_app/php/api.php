<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'update_location':
        $lat = $_POST['lat'] ?? 28.6280;
        $lng = $_POST['lng'] ?? 77.3649;
        echo json_encode([
            'status' => 'success',
            'message' => 'Rider GPS coordinates synced',
            'coordinates' => ['lat' => (float)$lat, 'lng' => (float)$lng],
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        break;

    case 'verify_otp':
        $order_id = $_POST['order_id'] ?? 0;
        $otp = $_POST['otp'] ?? '';
        if ($otp === '4921' || $otp === '8104' || $otp === '3391') {
            echo json_encode([
                'status' => 'success',
                'verified' => true,
                'message' => 'OTP verified successfully'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'verified' => false,
                'message' => 'Invalid OTP code'
            ]);
        }
        break;

    default:
        echo json_encode([
            'status' => 'success',
            'api_version' => '1.0',
            'service' => 'Ekart Fleet Delivery Partner API'
        ]);
        break;
}
