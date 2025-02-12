def search_in_array(array: [int], nb: int) -> int:
    for i in range(len(array)):
        if array[i] == nb:
            return i
    return -1
