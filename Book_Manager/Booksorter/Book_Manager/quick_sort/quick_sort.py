from visualize import visualize_sorting


def quick_sort(array):

    left = []
    equal = []
    right = []

    if len(array) > 1:
        pivot = array[0]
        for x in array:
            if x < pivot:
                left.append(x)
            elif x == pivot:
                equal.append(x)
            elif x > pivot:
                right.append(x)

        visualize_sorting(left)
        left = quick_sort(left)

        visualize_sorting(right)
        right = quick_sort(right)

        return (left + equal + right)
    else:
        return array


list = [51, 6, 52, 17, 89, 43, 23, 7]
print(quick_sort(list))