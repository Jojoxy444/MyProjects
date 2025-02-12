from visualize import visualize_sorting


def insertion_sort(arr):
    if (arr and len(arr) > 0):
        for i in range(1, len(arr)):
            key = arr[i]
            j = i-1
            while j >= 0 and key < arr[j]:
                arr[j + 1] = arr[j]
                j -= 1
                visualize_sorting(arr)
            arr[j + 1] = key
            visualize_sorting(arr)
    return arr
