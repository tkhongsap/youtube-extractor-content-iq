if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
  throw new Error('YouTube API key is not configured in environment variables');
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
}

export async function searchYouTubeVideos(query: string): Promise<YouTubeVideo[]> {
  // YouTube API search parameters:
  // - part=snippet: Returns the video details (title, description, thumbnails, etc.)
  // - maxResults=20: Number of videos to return (max allowed is 50)
  // - type=video: Only return videos (not playlists or channels)
  // - q: The search query from user input
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(
      query
    )}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to fetch videos');
  }

  // Get additional statistics (view counts) for all videos in a single batch request
  const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
  const statsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const statsData = await statsResponse.json();

  // Combine video details with their statistics
  return data.items.map((item: any, index: number) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high.url,
    channelTitle: item.snippet.channelTitle,
    viewCount: statsData.items[index]?.statistics.viewCount || '0',
    publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
  }));
}

export async function getMyRecentVideos(): Promise<YouTubeVideo[]> {
  try {
    // Default search when page loads
    // You can modify this query to show different types of videos by default
    return await searchYouTubeVideos('AI Trends in 2025');
  } catch (error) {
    console.error('Error fetching recent videos:', error);
    return [];
  }
} 