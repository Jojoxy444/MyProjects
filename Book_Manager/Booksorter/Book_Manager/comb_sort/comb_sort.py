from visualize import visualize_sorting


def comb_sort(arr):
    gap = len(arr)
    swapped = True
    temp = 0
    while gap != 1 or swapped:
        swapped = False
        gap = int(gap/1.3)
        if gap < 1:
            gap = 1
        for i in range(0, len(arr)-gap):
            if arr[i] > arr[i + gap]:
                temp = arr[i]
                arr[i] = arr[i + gap]
                arr[i + gap] = temp
                visualize_sorting(arr)
                swapped = True
    return arr
