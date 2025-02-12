from rle import encode_rle, decode_rle

# Exemple 1
data = "AAABBBCCD"
encoded_data = encode_rle(data)
decoded_data = decode_rle(encoded_data)
print("Exemple 1 :")
print("Données d'origine :", data)
print("Données encodées :", encoded_data[0])
print("Données décodées :", decoded_data)
print()

# Exemple 2
data = "@@@@@@@@@@@@11111111bbbb```````````(((§§è!(§è§è!!çç!è!§è!çbbbaagggggyyyyyAAAççççç0000"
encoded_data = encode_rle(data)
decoded_data = decode_rle(encoded_data)
print("Exemple 2 :")
print("Données d'origine :", data)
print("Données encodées :", encoded_data[0])
print("Données décodées :", decoded_data)
print()
