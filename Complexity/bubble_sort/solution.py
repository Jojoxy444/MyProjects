def bubble_sort(array: [int]) -> [int]:
    for i in range(len(array)):
        for j in range(len(array)-1, i, -1):
            if array[j - 1] > array[j]:
                (array[j - 1], array[j]) = (array[j], array[j - 1])
    return array
