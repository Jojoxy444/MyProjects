<?php
function hello ($texte = "")
{
  if ($texte === "")
  {
    echo "Hello world !\n";
  }
  else
  {
    echo "Hello $texte !\n";
  }
}
?>