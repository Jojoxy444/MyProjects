from visualize import visualize_sorting


def intro_sort(arr):
    maxdepth = (len(arr).bit_length() - 1)*2
    intro_sort_helper(arr, 0, len(arr), maxdepth)
    return arr


def intro_sort_helper(arr, start, end, maxdepth):
    if end - start <= 1:
        return
    elif maxdepth == 0:
        heapsort(arr, start, end)
    else:
        p = partition(arr, start, end)
        intro_sort_helper(arr, start, p + 1, maxdepth - 1)
        intro_sort_helper(arr, p + 1, end, maxdepth - 1)


def partition(arr, start, end):
    pivot = arr[start + (end - start) // 2]
    i = start - 1
    j = end

    while True:
        i = i + 1
        while arr[i] < pivot:
            i = i + 1
        j = j - 1
        while arr[j] > pivot:
            j = j - 1

        if i >= j:
            return j

        swap(arr, i, j)
        visualize_sorting(arr)  


def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]


def heapsort(arr, start, end):
    build_max_heap(arr, start, end)
    for i in range(end - 1, start, -1):
        swap(arr, start, i)
        visualize_sorting(arr)


def build_max_heap(arr, start, end):
    def parent(i):
        max_heapify(arr, index=0, start=start, end=i)
        return (i - 1)//2
    length = end - start
    index = parent(length - 1)
    while index >= 0:
        max_heapify(arr, index, start, end)
        index = index - 1


def max_heapify(arr, index, start, end):
    def left(i):
        return 2*i + 1

    def right(i):
        return 2*i + 2

    size = end - start
    L = left(index)
    R = right(index)
    if (L < size and arr[start + L] > arr[start + index]):
        largest = L
    else:
        largest = index
    if (R < size and arr[start + R] > arr[start + largest]):
        largest = R
    if largest != index:
        swap(arr, start + largest, start + index)
        visualize_sorting(arr)
        max_heapify(arr, largest, start, end)


list = [62, 47, 57, 69, 1, 33, 76, 54, 21, 73]
print(intro_sort(list))
