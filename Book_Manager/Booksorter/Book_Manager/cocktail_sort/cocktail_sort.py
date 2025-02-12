from visualize import visualize_sorting


def cocktail_sort(arr):
    swap = True
    start = 0  # Premier élément
    end = len(arr) - 1  # Dernier élément
    while (swap is True):  # Boucle qui parcourt dans les deux sens du tableau
        swap = False
        for a in range(start, end):
            if (arr[a] > arr[a+1]):
                arr[a], arr[a+1] = arr[a+1], arr[a]
                swap = True
                visualize_sorting(arr)

        if (swap is False):
            end = end-1  # Le dernier élément est bien placé, on décalle de 1

        for a in range(end-1, start-1, -1):
            if (arr[a] > arr[a+1]):
                arr[a], arr[a+1] = arr[a+1], arr[a]
                swap = True
                visualize_sorting(arr)
        start = start+1  # Le premier élément est bien placé, on décalle de 1
    return arr
