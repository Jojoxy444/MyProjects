<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="aboutme.css">
    <title>About Me</title>
</head>
<body>
    <header>
        <img class="logo-paul" src="Images/logo paul.png" alt="">
        <h1 class="nom">Paul Cassan</h1> 
            <nav>
                <ul>
                    <li class="lien1"> <a href="index.php">Home</a> </li>
                    <li class="lien1"><a href="myprojects.php">My Projects</a> </li>
                    <li class="lien1"> <a href="aboutme.php">About Me</a> </li>
                </ul>   
            </nav>
            <h1 class="welcome">About me</h1>

           <!-- <?php 
    
                define('HOST','localhost');
                define('DB_NAME','site');
                define('USER','joan');
                define('PASS','');

                $db = new PDO("mysql:host=" . HOST . ";dbname=" . DB_NAME, USER, PASS);
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sql = 'SELECT * FROM me where id = 2';

                $resultat = $db->query($sql);

                $row = $resultat->fetch();

                echo $row['firstname'];
            ?> 
            -->

            <div class="informations">
                <h1 class="table">Prenom : Paul</h1>
                <h1 class="table">Nom : Cassan</h1>  
                <h1 class="table">Email : paulcassan05@gmail.com</h1>
                <h1 class="table">Telephone : 06 98 12 23 35</h1>        
                <h1 class="table">Adresse : Village Kokiri</h1>  
                <h1 class="table">Ville : Paris</h1>  
                <h1 class="table">Pays : France</h1> 
                <h1 class="table">Date de naissance : 2001-01-12</h1>
                <h1 class="table">Description : ceci est un test</h1>   
            </div>
    
    </header>

    <img class="fond" src="Images/fond.png" alt="fond d'écran">
    
    <footer>
        <img class="logo3" src="Images/logo copyright.png" alt="copyright mention">
        <p class="copyright">2023</p>
        <div>
            <a class="lien" href="https://github.com/lamouchedu94"><img class="logo" src="Images/logo git lab.png" alt="git hub"></a>
            <a class="lien" href="https://www.instagram.com"><img class="logo" src="Images/logo instagram.png" alt="instagram"></a>
            <a class="lien" href="https://fr.linkedin.com"><img class="logo2" src="Images/logo linkedin.png" alt="linkedin"></a>
        </div>
    </footer>
</body>
</html>

