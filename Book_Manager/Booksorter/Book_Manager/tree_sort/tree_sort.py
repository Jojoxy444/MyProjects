from visualize import visualize_sorting


# Cette classe permet de créer des liens entre les datas (arbre binaire)
class node():
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def insert(self, val):
        if self.val:
            if val < self.val:
                if self.left is None:
                    self.left = node(val)
                else:
                    self.left.insert(val)
            elif val > self.val:
                if self.right is None:
                    self.right = node(val)
                else:
                    self.right.insert(val)
        else:
            self.val = val


def inorder(root, res):
    # Permet de sort les valeurs dans le tableau vide res avec une récursion
    if root:
        inorder(root.left, res)
        res.append(root.val)
        inorder(root.right, res)

def tree_sort(arr):
    # Definir la racine du tableau, ici le premier élément du tableau
    if len(arr) == 0:
        return arr
    root = node(arr[0])
    # Boucle qui crée le tableau binaire en fonction des valeurs du tableau
    for i in range(1, len(arr)):
        root.insert(arr[i])
    # Return le tableau sort
    res = []
    inorder(root, res)
    return res


arr = [7, 1, 5, 2, 19, 14, 17]
print(tree_sort(arr))
