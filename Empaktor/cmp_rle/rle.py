# Exécute l'algorithme de compression de données RLE (Run–length encoding) sur la string `str`
def encode_rle(data):
    global encoded_data
    # Stocke la string de sortie
    encoded_data = ""
 
    i = 0
    while i < len(data):
        # Compte les occurrences du caractère à l'index i
        count = 1
 
        while i + 1 < len(data) and data[i] == data[i + 1]:
            count = count + 1
            i = i + 1
 
        # Ajoute le caractère actuel et son nombre au résultat
        
        encoded_data += str(count) + "🔴" + data[i] + "🔴"
        encoded_data_without = encoded_data.replace("🔴", "")
        i = i + 1
    return encoded_data_without, encoded_data

def decode_rle(encoded_data):
    decoded_data = ""
    array = encoded_data[1].split("🔴")[:-1]  # Split les données encodées en utilisant le délimiteur "🔴"
    i = 0
    while i < len(array):
        count = int(array[i])  # Le nombre d'occurrences est à l'index i
        character = array[i + 1]  # Le caractère correspondant est à l'index i + 1
        decoded_data += character * count  # Ajoute le caractère à la sortie en le répétant "count" fois
        i = i + 2  # Passe à la prochaine paire (nombre, caractère)

    return decoded_data
