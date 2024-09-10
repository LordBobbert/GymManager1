import requests
import base64
import os

def get_file_from_github(repo, file_path):
    # GitHub API URL for the repo and file
    url = f'https://api.github.com/repos/{repo}/contents/{file_path}'
    
    # Make a GET request to fetch the file content
    response = requests.get(url)
    
    if response.status_code == 200:
        try:
            file_data = response.json()

            # Check if 'content' exists in the response
            if 'content' in file_data:
                # The content is base64 encoded, so we decode it
                content = base64.b64decode(file_data['content']).decode('utf-8')
                return content
            else:
                return "Error: Content not found in the response"
        except Exception as e:
            return f"Error decoding the file content: {str(e)}"
    else:
        return f"Error: {response.status_code} - {response.text}"

# Example usage
repo_name = "LordBobbert/GymManager1"
file_path = "GitHubAPI.py"  # Updated with the correct file name and 
access_token = os.getenv('GITHUB_TOKEN')

file_content = get_file_from_github(repo_name, file_path)
print(file_content)
