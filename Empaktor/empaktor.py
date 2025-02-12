import tarfile
import os
import shutil
import sys
import pickle
from cmp_rle.rle import encode_rle, decode_rle
from cmp_burrows.burrows_wheeler import transform_bwt, inverse_bwt
from cmp_huffman.huffman import compress_data, decompress_data, build_frequency_table, build_huffman_tree

# Création d'un dossier temporaire pour stocker les fichiers
dossier_temporaire = 'dossier_temporaire'
dossier_extraction = 'extracted_tar_folder'

if len(sys.argv) < 3:
    print("Commande inconnue")
    sys.exit()

if os.path.exists(dossier_temporaire):
    shutil.rmtree(dossier_temporaire)

os.makedirs(dossier_temporaire)

compression = sys.argv[2]
nom_archive = sys.argv[1]

if compression == "--compression":

    algorithm = sys.argv[3]
    fichiers = sys.argv[4:]

    if algorithm != "rle" and algorithm != "bwt" and algorithm != "huffman":
        print("Les seuls algorithmes utilisables sont 'rle', 'bwt', et 'huffman'")
        shutil.rmtree(dossier_temporaire)
        sys.exit()
    
    if fichiers == []:
        print("Aucun fichier n'est fourni")
        shutil.rmtree(dossier_temporaire)
        sys.exit()
    
    for fichier in fichiers:
        if not os.path.exists(fichier):
            print("Certains fichiers n'existent pas")
            shutil.rmtree(dossier_temporaire)
            sys.exit()
        
        with open(fichier, 'r') as file:
            contenu = file.read()
            
        if algorithm == "rle":
            _, contenu_encodé = encode_rle(contenu)

            fichier_encodé = os.path.join(dossier_temporaire, f'{os.path.basename(fichier)}_encodé.txt')
            with open(fichier_encodé, 'w') as encode_file:
                encode_file.write(contenu_encodé)

        elif algorithm == "bwt":
            encoded_files_folder = os.path.join(dossier_temporaire, 'encoded_files')
            key_files_folder = os.path.join(dossier_temporaire, 'key_files')

            # Créer les dossiers pour les fichiers encodés et les fichiers de clé
            if not os.path.exists(encoded_files_folder):
                os.makedirs(encoded_files_folder)

            if not os.path.exists(key_files_folder):
                os.makedirs(key_files_folder)

            tar_name = nom_archive
            with tarfile.open(tar_name, 'w:gz') as tar:

                for fichier in fichiers:
                    with open(fichier, 'r') as file:
                        contenu = file.read()
        
                    contenu_encodé, original_index = transform_bwt(contenu)
                    fichier_encodé = os.path.join(encoded_files_folder, f'{os.path.basename(fichier)}_encodé.txt')
                    with open(fichier_encodé, 'w') as encode_file:
                        encode_file.write(contenu_encodé)

                    # Créer un fichier de clé pour chaque fichier encodé avec BWT
                    key_content = original_index
                    key_file = os.path.join(key_files_folder, f'{os.path.basename(fichier)}_encodé_key_config.txt')
                    with open(key_file, 'w') as key:
                        key.write(str(key_content))
                    for fichier_encodé in os.listdir(dossier_temporaire):
                        chemin_fichier_encodé = os.path.join(dossier_temporaire, fichier_encodé)
                        if os.path.isfile(chemin_fichier_encodé) and fichier_encodé.endswith('_encodé.txt'):
                            tar.add(chemin_fichier_encodé, arcname=fichier_encodé)
    
        elif algorithm == "huffman":
            encoded_files_folder = os.path.join(dossier_temporaire, 'encoded_files')
            freq_table_folder = os.path.join(dossier_temporaire, 'frequency_tables')
            huffman_tree_folder = os.path.join(dossier_temporaire, 'huffman_trees')

            # Créer les dossiers pour les tables de fréquence, les arbres de Huffman et les fichiers encodés
            if not os.path.exists(freq_table_folder):
                os.makedirs(freq_table_folder)

            if not os.path.exists(huffman_tree_folder):
                os.makedirs(huffman_tree_folder)

            if not os.path.exists(encoded_files_folder):
                os.makedirs(encoded_files_folder)

            with tarfile.open(nom_archive, 'w:gz') as tar:
                for fichier in fichiers:
                    with open(fichier, 'r') as file:
                        contenu = file.read()

                    # Encodage du contenu
                    contenu_encodé = compress_data(contenu)
                    fichier_encodé = os.path.join(encoded_files_folder, f'{os.path.basename(fichier)}_encodé.txt')
                    with open(fichier_encodé, 'w') as encode_file:
                        encode_file.write(contenu_encodé)

                    # Obtenir la table de fréquence et l'arbre de Huffman
                    frequency_table = build_frequency_table(contenu)

                    # Stocker la table de fréquence dans un fichier
                    freq_table_file = os.path.join(freq_table_folder, f'{os.path.basename(fichier)}_encodé_frequency_table.txt')
                    with open(freq_table_file, 'w') as freq_file:
                        for key, value in frequency_table.items():
                            freq_file.write(f"{key}: {value}\n")

                    # Stocker l'arbre de Huffman dans un fichier
                    huffman_tree = build_huffman_tree(frequency_table)
                    huffman_tree_file = os.path.join(huffman_tree_folder, f'{os.path.basename(fichier)}_encodé_huffman_tree.pkl')
                    with open(huffman_tree_file, 'wb') as tree_file:
                        pickle.dump(huffman_tree, tree_file)


                # Ajouter les fichiers de tables de fréquence et d'arbres de Huffman à l'archive
                tar.add(freq_table_folder, arcname='frequency_tables')
                tar.add(huffman_tree_folder, arcname='huffman_trees')

                # Ajouter les fichiers encodés à l'archive dans leur dossier spécifique
                tar.add(encoded_files_folder, arcname='encoded_files')

                # Ajouter le fichier de configuration à l'archive
                config_content = algorithm
                config_file = os.path.join(dossier_temporaire, 'empaktor_config.txt')
                with open(config_file, 'w') as config:
                    config.write(config_content)
                tar.add(config_file, arcname='empaktor_config.txt')

    if algorithm == "bwt" or algorithm == "rle":
        with tarfile.open(nom_archive, 'w:gz') as tar:
            config_content = algorithm
            config_file = os.path.join(dossier_temporaire, 'empaktor_config.txt')
            with open(config_file, 'w') as config:
                config.write(config_content)
            tar.add(config_file, arcname='empaktor_config.txt')

            for fichier_encodé in os.listdir(dossier_temporaire):
                chemin_fichier_encodé = os.path.join(dossier_temporaire, fichier_encodé)
                if os.path.isfile(chemin_fichier_encodé) and fichier_encodé.endswith('_encodé.txt'):
                    tar.add(chemin_fichier_encodé, arcname=fichier_encodé)

            if algorithm == "bwt":
                # Ajouter les dossiers 'encoded_files' et 'key_files' à l'archive
                tar.add(encoded_files_folder, arcname='encoded_files')
                tar.add(key_files_folder, arcname='key_files')
            
    shutil.rmtree(dossier_temporaire)
    print("Archive encodée créée avec succès!")

elif nom_archive == "--extract":
    nom_archive = sys.argv[2]
    
    if not os.path.exists(nom_archive):
        print(f"L'archive '{nom_archive}' n'existe pas")
        shutil.rmtree(dossier_temporaire)
        sys.exit()

    if not os.path.exists(dossier_extraction):
        os.makedirs(dossier_extraction)

    with tarfile.open(nom_archive, 'r:gz') as tar:
        tar.extractall(path=dossier_temporaire)

    config_file_path = os.path.join(dossier_temporaire, 'empaktor_config.txt')
    with open(config_file_path, 'r') as config_file:
        algorithm = config_file.read()
    
    if algorithm == "rle":
        for fichier_encodé in os.listdir(dossier_temporaire):
            chemin_fichier_encodé = os.path.join(dossier_temporaire, fichier_encodé)
            if os.path.isfile(chemin_fichier_encodé) and fichier_encodé.endswith('_encodé.txt'):
                with open(chemin_fichier_encodé, 'r') as file:
                    contenu_encodé = file.read()
                    
                    # Utilisez simplement split pour obtenir les données encodées
                    array = contenu_encodé.split("🔴")[:-1]
                    contenu_décodé = ""
                    i = 0
                    while i < len(array):
                        count = int(array[i])  # Le nombre d'occurrences est à l'index i
                        character = array[i + 1]  # Le caractère correspondant est à l'index i + 1
                        contenu_décodé += character * count  # Ajoute le caractère à la sortie en le répétant "count" fois
                        i = i + 2  # Passe à la prochaine paire (nombre, caractère)

                    nom_fichier_sans_extension = os.path.splitext(fichier_encodé)[0]
                    fichier_décodé = os.path.join(dossier_extraction, f'{nom_fichier_sans_extension}_décodé.txt')
                    with open(fichier_décodé, 'w') as decode_file:
                        decode_file.write(contenu_décodé)

    elif algorithm == "bwt":
        encoded_files_folder = os.path.join(dossier_temporaire, 'encoded_files')
        key_files_folder = os.path.join(dossier_temporaire, 'key_files')

        for root, dirs, files in os.walk(encoded_files_folder):
            for file in files:
                if file.endswith('.txt'):
                    fichier_encodé = os.path.join(root, file)
                    # Récupérer le fichier de clé correspondant
                    key_file_name = f"{os.path.splitext(os.path.basename(fichier_encodé))[0]}_key_config.txt"
                    key_file = os.path.join(key_files_folder, key_file_name)
                    with open(fichier_encodé, 'r') as encoded_file, open(key_file, 'r') as key_config:
                        contenu_encodé = encoded_file.read()
                        key = int(key_config.read())

                    contenu_décodé = inverse_bwt(contenu_encodé, key)

                    nom_fichier_sans_extension = os.path.splitext(file)[0]
                    fichier_décodé = os.path.join(dossier_extraction, f'{nom_fichier_sans_extension}_décodé.txt')
                    with open(fichier_décodé, 'w') as decode_file:
                        decode_file.write(contenu_décodé)

    elif algorithm == "huffman":
        encoded_files_folder = os.path.join(dossier_temporaire, 'encoded_files')
        freq_table_folder = os.path.join(dossier_temporaire, 'frequency_tables')
        huffman_tree_folder = os.path.join(dossier_temporaire, 'huffman_trees')

        if not os.path.exists(encoded_files_folder):
            os.makedirs(encoded_files_folder)
        if not os.path.exists(freq_table_folder):
            os.makedirs(freq_table_folder)
        if not os.path.exists(huffman_tree_folder):
            os.makedirs(huffman_tree_folder)

        with tarfile.open(nom_archive, 'r:gz') as tar:
            tar.extractall(path=dossier_temporaire)

        for fichier in os.listdir(encoded_files_folder):
            if fichier.endswith('_encodé.txt'):
                chemin_fichier_encodé = os.path.join(encoded_files_folder, fichier)
                with open(chemin_fichier_encodé, 'r') as file:
                    contenu_encodé = file.read()

                # Charger la table de fréquence et l'arbre de Huffman
                freq_table_file = os.path.join(freq_table_folder, f'{os.path.splitext(fichier)[0]}_frequency_table.txt')
                huffman_tree_file = os.path.join(huffman_tree_folder, f'{os.path.splitext(fichier)[0]}_huffman_tree.pkl')

                with open(freq_table_file, 'r') as freq_file, open(huffman_tree_file, 'rb') as tree_file:
                    freq_table_data = freq_file.read()
                    reconstructed_tree = pickle.load(tree_file)

                # Reconstituer la table de fréquence
                frequency_table = {}
                lines = freq_table_data.split('\n')
                for line in lines:
                    if line.strip() != '':
                        key, value = line.split(': ')
                        frequency_table[key] = int(value)

                # Décompresser les données
                contenu_décodé = decompress_data(contenu_encodé, reconstructed_tree)

                # Écrire le fichier décompressé
                fichier_décodé = os.path.join(dossier_extraction, f'{os.path.splitext(fichier)[0]}_décodé.txt')
                with open(fichier_décodé, 'w') as decode_file:
                    decode_file.write(contenu_décodé)

    else:
        raise ValueError(f"Algorithme inconnu : {algorithm}")

    shutil.rmtree(dossier_temporaire)
    print("Fichiers extraits et décodés avec succès!")

else:
    shutil.rmtree(dossier_temporaire)
    print("Commande inconnue")