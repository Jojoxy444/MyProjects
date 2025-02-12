def transform_bwt(input_str):
    
    # Création du tableau comportant les rotations
    rotations = [input_str[i:] + input_str[:i] for i in range(len(input_str))]
    # Tri des rotations
    sorted_rotations = sorted(rotations)
    # Extraction de la dernière lettre de chaque rotation
    bwt_transformed = ''.join(rotation[-1] for rotation in sorted_rotations)
    
    # Recherche de l'indice de la rotation originale
    original_index = sorted_rotations.index(input_str)
    
    # Retourne la transformation et l'indice original
    return bwt_transformed, original_index

def inverse_bwt(bwt_transformed, original_index):
    
    # Crée une liste de tuples contenant le caractère et son index dans la transformation
    chars_with_indexes = [(char, index) for index, char in enumerate(bwt_transformed)]
    
    # Trie la liste par caractère
    sorted_chars = sorted(chars_with_indexes)
    
    # Initialise le tableau pour la reconstruction de la séquence originale
    original_sequence = [''] * len(bwt_transformed)
    
    # Remplit le tableau en suivant les indices
    for i in range(len(bwt_transformed)):
        original_sequence[i] = sorted_chars[original_index][0]
        original_index = sorted_chars[original_index][1]
    
    # Reconstitue la séquence d'origine en fusionnant les caractères
    return ''.join(original_sequence)
