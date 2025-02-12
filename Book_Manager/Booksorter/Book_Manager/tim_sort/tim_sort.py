from visualize import visualize_sorting


MIN_MERGE = 32


def calcMinRun(n):
    r = 0
    while n >= MIN_MERGE:
        r |= n & 1
        n >>= 1
    return n + r


def insertionSort(arr, left, right):
    for i in range(left + 1, right + 1):
        j = i
        while j > left and arr[j] < arr[j - 1]:
            arr[j], arr[j - 1] = arr[j - 1], arr[j]
            visualize_sorting(arr)
            j -= 1


def merge(arr, L, m, r):

    # Division de l'array en 2
    len1, len2 = m - L + 1, r - m
    left, right = [], []
    for i in range(0, len1):
        left.append(arr[L + i])
    for i in range(0, len2):
        right.append(arr[m + 1 + i])

    i, j, k = 0, 0, L

    # Après la comparaison, merge des 2
    while i < len1 and j < len2:
        if left[i] <= right[j]:
            arr[k] = left[i]
            i += 1

        else:
            arr[k] = right[j]
            j += 1

        k += 1

    # Copie des éléments de gauche
    while i < len1:
        arr[k] = left[i]
        k += 1
        i += 1

    # Copie des éléments de droite
    while j < len2:
        arr[k] = right[j]
        k += 1
        j += 1


def tim_sort(arr):
    n = len(arr)
    minRun = calcMinRun(n)

    # Sortie des sous tableaux individuels de la taille minimale
    for start in range(0, n, minRun):
        end = min(start + minRun - 1, n - 1)
        insertionSort(arr, start, end)

    # Merging des différentes sizes
    size = minRun
    while size < n:
        for left in range(0, n, 2 * size):

            # Starting and Ending points
            mid = min(n - 1, left + size - 1)
            right = min((left + 2 * size - 1), (n - 1))

            # Merge des sous tableaux du gauche au milieu // du milieu à droite
            if mid < right:
                merge(arr, left, mid, right)

        size = 2 * size
    return arr
