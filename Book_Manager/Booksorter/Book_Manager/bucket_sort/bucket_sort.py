from visualize import visualize_sorting


def bucket_sort(arr):
    "Bucket sort algorithm which take an array to sort as parameter"

    # Array in which we will merge the sorted seals
    temp = []

    # Check if entry array is not null or not empty
    if (arr and len(arr) > 0):
        # Range of the buckets
        bucket_range = max(arr) - min(arr)

        # Size of the buckets
        bucket_size = bucket_range // len(arr) + 1

        # Array which contains every buckets
        buckets = []

        # Init buckets
        for i in range(len(arr)):
            buckets.append([])

        # Append each arr values into its corresponding bucket
        for i in range(len(arr)):
            bucket_index = (arr[i] - min(arr)) // bucket_size
            buckets[bucket_index].append(arr[i])

        # Sort each bucket
        for i in range(len(buckets)):
            buckets[i] = bubble_sort(buckets[i])

        # Assemble each bucket into a single array
        for i in range(len(buckets)):
            for j in range(len(buckets[i])):
                temp.append(buckets[i][j])
                visualize_sorting(temp)

    # Return the sorted array
    return temp


def bubble_sort(arr):
    "Bubble sort algorithm which take an array to sort as parameter"

    # Create a copy of the input array to avoidmodifying the original
    temp = arr.copy()
    # Outer loop to iterate through the array
    for i in range(len(temp) - 1):
        # Inner loop for pairwise comparisons
        for j in range(len(temp) - i - 1):
            if (temp[j] > temp[j + 1]):
                # Swap if current element is greater than the next one
                swap(temp, j, j + 1)
    # Return the sorted array
    return temp


def swap(arr, x: int, y: int):
    "Swap two elements in an array"

    # Store the element at index x in temp variable
    temp = arr[x]
    # Assign value in element at y index to element at x index
    arr[x] = arr[y]
    # Assign temp value to element at y index
    arr[y] = temp
