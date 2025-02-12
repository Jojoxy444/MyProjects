from visualize import visualize_sorting


def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    #  si ma division n'est pas à 0
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            #  début de la boucle pour trié
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                visualize_sorting(arr)
                j = j - gap
            arr[j] = temp
            visualize_sorting(arr)
        gap = gap // 2
    return arr
