<?php
function increment_array ($array, $nombre)
{
  $list = array();
  for ($i = 0; $i < sizeof($array); $i++)
  {
    if (is_int($array[$i]) == false)
    {
      echo "L'index $i n'est pas un Int";
      return;
    }
    elseif (is_int($nombre) == false)
    {
      echo "L'increment n'est pas un Int";
      return;
    }    
    else
    {
      array_push($list, $array[$i] + $nombre);
    }
  }
  return $list;
}
?>