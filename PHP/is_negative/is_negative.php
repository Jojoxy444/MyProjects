<?php
  function is_negative ($nombre)
  {
    if (is_int($nombre))
    {
      if ($nombre < 0)
      {
        echo "True\n";
      }
      else
      {
        echo "False\n";
      }
    }
    else
    {
        echo "Le parametre n'est pas un Int\n";
    }
  }
?>