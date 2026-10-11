<?php
/**
 * Flipkart Clone - Global Configuration & Database Connection
 * Production-ready PDO Connection & Helper Utilities
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Database Credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'flipkart_db');
define('SITE_NAME', 'Shopping Mystery');
define('CURRENCY_SYMBOL', '₹');
define('BASE_URL', '/');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // If DB is offline, provide mock fallback indicator
    $pdo = null;
    $db_error = $e->getMessage();
}

/**
 * Format Indian Rupee currency
 */
function format_price($amount) {
    return '₹' . number_format((float)$amount, 0, '.', ',');
}

/**
 * Sanitize User Input
 */
function clean_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

/**
 * Send JSON Response for AJAX requests
 */
function json_response($status, $message, $data = []) {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

/**
 * Check Login Status
 */
function is_user_logged_in() {
    return isset($_SESSION['user_id']);
}

function is_seller_logged_in() {
    return isset($_SESSION['seller_id']);
}

function is_admin_logged_in() {
    return isset($_SESSION['admin_id']);
}

function is_delivery_logged_in() {
    return isset($_SESSION['delivery_id']);
}
?>
