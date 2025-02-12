from visualize import visualize_sorting


def flip(array, i):
    # reverse the array from index 0 to i
    debut = 0
    while debut < i:
        array[debut], array[i] = array[i], array[debut]
        visualize_sorting(array)
        i -= 1
        debut += 1


def max_index(array, size):
    # returns the index of the greatest value in the list
    index = 0
    for i in range(0, size):
        if array[i] > array[index]:
            index = i
    return index


def pancake_sort(array):
    size = len(array)
    while size > 1:
        maxdex = max_index(array, size)
        if maxdex != size - 1:
            if maxdex != 0:
                flip(array, maxdex)
            flip(array, size - 1)
        size -= 1

    return array
