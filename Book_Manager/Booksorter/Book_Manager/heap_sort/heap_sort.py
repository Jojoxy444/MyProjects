from visualize import visualize_sorting


def heap_sort(arr):
    if len(arr) <= 1:
        return arr
    temp = arr.copy()
    # On divise la liste en deux
    for i in range(len(temp) // 2 - 1, -1, -1):
        heapify(temp, len(temp), i)

    for i in range(len(temp) - 1, 0, -1):
        # swap(temp, i, 0)
        temp[i], temp[0] = temp[0], temp[i]
        visualize_sorting(temp)
        heapify(temp, i, 0)
    return temp


def heapify(arr, n, root):
    largest = root
    left_child = 2 * root + 1
    right_child = 2 * root + 2

    if left_child < n and arr[left_child] > arr[largest]:
        largest = left_child
    if right_child < n and arr[right_child] > arr[largest]:
        largest = right_child

    if largest != root:
        arr[root], arr[largest] = arr[largest], arr[root]
        visualize_sorting(arr)
        heapify(arr, n, largest)
