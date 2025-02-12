from visualize import visualize_sorting


def merge_sort(arr):
    if len(arr) > 1:

        # Milieu du tableau
        mid = len(arr)//2

        # Division du tableau en deux et récupération des membres de gauche
        L = arr[:mid]

        # Division du tableau en deux et récupération des membres de droite
        R = arr[mid:]

        # Sorting du sous tableau gauche
        merge_sort(L)

        # Sorting du sous tableau droite
        merge_sort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
            visualize_sorting(arr)

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
            visualize_sorting(arr)

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
            visualize_sorting(arr)
    return arr
