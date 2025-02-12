<?php 
    
    define('HOST','localhost');
    define('DB_NAME','site');
    define('USER','joan');
    define('PASS','');
    

    $db = new PDO("mysql:host=" . HOST . ";dbname=" . DB_NAME, USER, PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    echo "Connect > OK !";

    $sql = 'SELECT * FROM me';
    
    $resultat = $db->query($sql);

    while($row = $resultat->fetch())
    {
        echo "\n"." ".$row['id']." ".$row['firstname']." ".$row['lastname']." ".$row['email']." ".$row['phone']." ".$row['address']." ".$row['city']." ".$row['country']." ".$row['birth_date']." ".$row['description']."\n";
    }
        
?>