import requests
from urllib.parse import urlparse, parse_qs

def extract_video_id(youtube_url: str) -> str:
    """
    Extract video ID from YouTube URL
    """
    try:
        parsed_url = urlparse(youtube_url)
        if 'youtube.com' in parsed_url.netloc:
            return parse_qs(parsed_url.query)['v'][0]
        elif 'youtu.be' in parsed_url.netloc:
            return parsed_url.path[1:]
        else:
            raise ValueError("Not a valid YouTube URL")
    except Exception as e:
        raise ValueError(f"Could not extract video ID: {str(e)}")

def get_transcript(youtube_url: str) -> dict:
    """
    Get transcript from Railway API using YouTube URL
    """
    try:
        # Make API request
        base_url = "https://brightify-snap-buzz-production.up.railway.app"
        endpoint = "/extract"  # Changed to correct endpoint
        
        # Send POST request with URL in body
        response = requests.post(
            base_url + endpoint, 
            json={"url": youtube_url}  # Send URL in JSON body
        )
        
        # Print response details for debugging
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {response.headers}")
        
        try:
            response.raise_for_status()
            return response.json()
        except requests.exceptions.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            print(f"Raw Response: {response.text}")
            return None
        except requests.exceptions.HTTPError as e:
            print(f"HTTP Error: {e}")
            print(f"Error Response: {response.text}")
            return None
            
    except ValueError as e:
        print(f"URL Error: {e}")
        return None
    except requests.RequestException as e:
        print(f"API Error: {e}")
        return None

# Test with your YouTube URL
if __name__ == "__main__":
    youtube_url = "https://www.youtube.com/watch?v=_JNCqY8ltSg&t=182s"
    
    print("Fetching transcript...")
    result = get_transcript(youtube_url)
    
    if result:
        print("\nSuccess! Received data:")
        if 'metadata' in result:
            print("\nMetadata:")
            print(result['metadata'])
        if 'transcript' in result:
            print("\nTranscript:")
            print(result['transcript'])
    else:
        print("Failed to get transcript")