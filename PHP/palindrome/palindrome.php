<?php
function palindrome ($string)
{
  $string_lower = strtolower($string);
  $string_final = str_replace(' ', '', $string_lower);

  $string_strrev = strrev($string);
  $string_strrev_lower = strtolower($string_strrev);
  $string_strrev_final = str_replace(' ', '', $string_strrev_lower);

  if ($string == "" || $string_final != $string_strrev_final)
  {
    echo "False\n";
  }
  elseif ($string_final == $string_strrev_final)
  {
    echo "True\n";
  }
}
?>