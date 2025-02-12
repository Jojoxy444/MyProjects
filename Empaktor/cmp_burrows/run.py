from burrows_wheeler import transform_bwt, inverse_bwt

# Exemple 1
data = "fneuzbfezaipfzg123456()))(@@@@::)"
transformed_data, key = transform_bwt(data)
original_data = inverse_bwt(transformed_data, key)
print("Exemple 1 :")
print("Données d'origine :", data)
print("Transformée de Burrows-Wheeler :", transformed_data)
print("Données inversées :", original_data)
print()

# Exemple 2
data = "11111gggggrrryyyyy3333"
transformed_data, key = transform_bwt(data)
original_data = inverse_bwt(transformed_data, key)
print("Exemple 2 :")
print("Données d'origine :", data)
print("Transformée de Burrows-Wheeler :", transformed_data)
print("Données inversées :", original_data)
print()

# Exemple 3
data = "hhhhhh44444466666@@@@AAAssss"
transformed_data, key = transform_bwt(data)
original_data = inverse_bwt(transformed_data, key)
print("Exemple 2 :")
print("Données d'origine :", data)
print("Transformée de Burrows-Wheeler :", transformed_data)
print("Données inversées :", original_data)
print()