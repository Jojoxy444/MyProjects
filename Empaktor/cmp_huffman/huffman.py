from collections import defaultdict
import heapq

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        # If frequencies are equal, prioritize characters with lower ASCII values
        if self.freq == other.freq:
            if self.char is not None and other.char is not None:
                return self.char < other.char
            elif self.char is not None:
                return True
            elif other.char is not None:
                return False
        return self.freq < other.freq

def build_frequency_table(data):
    frequency_table = defaultdict(int)
    for char in data:
        frequency_table[char] += 1
    return frequency_table

def build_huffman_tree(frequency_table):
    priority_queue = [Node(char, freq) for char, freq in frequency_table.items()]
    heapq.heapify(priority_queue)

    while len(priority_queue) > 1:
        left_child = heapq.heappop(priority_queue)
        right_child = heapq.heappop(priority_queue)

        merged_node = Node(None, left_child.freq + right_child.freq)
        merged_node.left = left_child
        merged_node.right = right_child

        heapq.heappush(priority_queue, merged_node)

    return priority_queue[0]

def build_huffman_codes(node, current_code, huffman_codes):
    if node.char is not None:
        huffman_codes[node.char] = current_code
    if node.left is not None:
        build_huffman_codes(node.left, current_code + "0", huffman_codes)
    if node.right is not None:
        build_huffman_codes(node.right, current_code + "1", huffman_codes)

def compress_data(data):
    frequency_table = build_frequency_table(data)
    huffman_tree = build_huffman_tree(frequency_table)
    huffman_codes = {}
    build_huffman_codes(huffman_tree, "", huffman_codes)

    compressed_data = ''.join([huffman_codes[char] for char in data])
    return compressed_data

def decompress_data(compressed_data, huffman_tree):
    current_node = huffman_tree
    decompressed_data = ""

    for bit in compressed_data:
        if bit == "0" and current_node.left is not None:
            current_node = current_node.left
        elif bit == "1" and current_node.right is not None:
            current_node = current_node.right

        if current_node.char is not None:
            decompressed_data += current_node.char
            current_node = huffman_tree

    return decompressed_data