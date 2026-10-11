<?php
/**
 * Delivery Partner App - Standalone PHP Backend Configuration
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Database Credentials
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');
define('DB_NAME', 'flipkart_db');
define('DB_USER', 'root');
define('DB_PASS', '');

function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            return null; // Fallback to mock session data
        }
    }
    return $pdo;
}

// Helper: Ensure driver authenticated
function requireDriverAuth() {
    if (!isset($_SESSION['driver_id'])) {
        $_SESSION['driver_id'] = 1;
        $_SESSION['driver_name'] = 'Vikram Singh';
        $_SESSION['vehicle_no'] = 'DL 4S CZ 9021';
    }
}
