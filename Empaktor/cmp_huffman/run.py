from huffman import compress_data, build_frequency_table, build_huffman_tree, decompress_data

# Exemple 1
data = "dsrxtcfg-èuj_çio48512"
frequency_table = build_frequency_table(data)
huffman_tree = build_huffman_tree(frequency_table)
compressed_data = compress_data(data)
decompressed_data = decompress_data(compressed_data, huffman_tree)

print("Exemple 1 :")
print("Données d'origine :", data)
print("Données encodées :", compressed_data)
print("Données décodées :", decompressed_data)
print()