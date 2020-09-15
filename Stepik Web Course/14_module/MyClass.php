<?php
class MyClass {
    public function power($x, $y)
    {
        $result=1;
        for($i=1; $i<=$exponent; $i++) {
        $result = $result * $base;  
        }
        return $result;
    }
    public function fib($n)
    {
        return round(pow((sqrt(5)+1)/2, $n) / sqrt(5));
    }
}