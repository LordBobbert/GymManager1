import os

def generate_file_map(directory, level=0):
    """Recursively generate the file map for a directory."""
    items = sorted(os.listdir(directory))
    for item in items:
        path = os.path.join(directory, item)
        if os.path.isdir(path):
            print("\t" * level + f"{item}/")
            generate_file_map(path, level + 1)
        else:
            print("\t" * level + item)

def create_file_map(directory="."):
    """Generate a file map starting from the given directory."""
    if os.path.exists(directory) and os.path.isdir(directory):
        print(f"File Map of {os.path.abspath(directory)}")
        print("-" * 40)
        generate_file_map(directory)
    else:
        print(f"Directory {directory} does not exist or is not a directory.")

if __name__ == "__main__":
    # Provide the root directory from which to generate the map
    # By default, it generates the map from the current directory.
    create_file_map(".")
