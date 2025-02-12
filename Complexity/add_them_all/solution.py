def add_them_all(array: [int]) -> int:
    if not array:
        return 0
    first_element = array[0]
    if isinstance(first_element, (int, float)):
        rest_of_sum = add_them_all(array[1:])
        return first_element + rest_of_sum
    else:
        return 0
