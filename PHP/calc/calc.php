<?php
function calc($operator = '', $number = null) {
    static $result = 0;
    if ($operator === '=') {
        $result = $number;
    } elseif (is_numeric($number)) {
        if ($operator === '+') {
            $result += $number;
        } elseif ($operator === '-') {
            $result -= $number;
        } elseif ($operator === '*') {
            $result *= $number;
        } elseif ($operator === '/') {
            if ($number != 0) {
                $result /= $number;
            } else {
                echo "Division by 0!\n";
            }
        } elseif ($operator === '%') {
            if ($number != 0) {
                $result %= $number;
            } else {
                echo "Division by 0!\n";
            }
        } 
    }
    return $result;
}
?>