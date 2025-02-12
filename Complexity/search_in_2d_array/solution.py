def search_in_2d_array(array: [[int]], nb: int) -> (int, int):
    for i in range(len(array)):
        for j in range(len(array[i])):
            if array[i][j] == nb:
                return (i, j)
    return (-1, -1)
