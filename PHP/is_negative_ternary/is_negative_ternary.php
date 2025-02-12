<?php
  function is_negative_ternary ($nombre)
  {
    if (is_int($nombre))
    {
      $ternaire = $nombre < 0 ? "True" : "False";
      echo "$ternaire\n";
    }
    else
    {
        echo "Le parametre n'est pas un Int\n";
    }
  }
?>