
import requests
import base64

def get_file_from_github(repo, file_path):
    # GitHub API URL for the repo and file
    url = f'https://api.github.com/repos/{repo}/contents/{file_path}'
    
    # Make a GET request to fetch the file content
    response = requests.get(url)
    
    if response.status_code == 200:
        file_data = response.json()
        
        # The content is base64 encoded, so we decode it
        content = base64.b64decode(file_data['content']).decode('utf-8')
        return content
    else:
        return f"Error: {response.status_code} - {response.text}"

# Example usage
repo_name = "LordBobbert/GymManager1"
file_path = "GymManager/GitHubAPI.py"  # Updated with the correct file name and path

file_content = get_file_from_github(repo_name, file_path)
print(file_content)
