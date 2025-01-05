let transcriptData = null;
let videoMetadata = null;

async function extractTranscript() {
    const urlInput = document.getElementById('youtubeUrl');
    const loader = document.getElementById('loader');
    const viewTranscriptBtn = document.getElementById('viewTranscriptBtn');
    
    try {
        const url = urlInput.value.trim();
        if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
            throw new Error('Please enter a valid YouTube URL');
        }

        loader.style.display = 'block';
        viewTranscriptBtn.style.display = 'none';

        // Using the same base URL and endpoint as in test-api.py
        const baseUrl = "https://brightify-snap-buzz-production.up.railway.app";
        const endpoint = "/extract";

        const response = await fetch(baseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to fetch transcript (Status: ${response.status})`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Check if we have transcript data
        if (!data || !data.transcript) {
            throw new Error('No transcript data received');
        }

        // Format the transcript text
        transcriptData = data.transcript
            .map((item) => {
                const minutes = Math.floor(item.offset / 60);
                const seconds = Math.floor(item.offset % 60);
                const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                return `[${timestamp}] ${item.text.replace(/&amp;/g, '&')}`;  // Fix HTML entities
            })
            .join('\n');

        // Store metadata if available
        videoMetadata = data.metadata || {};

        viewTranscriptBtn.style.display = 'block';

    } catch (error) {
        console.error('Error details:', error);
        alert(`Error: ${error.message}`);
    } finally {
        loader.style.display = 'none';
    }
}

function formatDuration(durationStr) {
    if (!durationStr) return '';
    // Handle YouTube duration format "PT56M16S"
    const matches = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) return '';
    
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = matches[3] ? parseInt(matches[3]) : 0;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatViews(viewCount) {
    if (!viewCount) return '0 views';
    const views = parseInt(viewCount);
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
}

function showTranscript() {
    if (!transcriptData) return;
    
    const modal = document.getElementById('transcriptModal');
    const content = document.getElementById('transcriptContent');
    
    const metadataHtml = videoMetadata ? `
        <div class="video-metadata">
            ${videoMetadata.title ? `<h3 class="video-title">${videoMetadata.title}</h3>` : ''}
            <div class="metadata-details">
                <div class="metadata-primary">
                    ${videoMetadata.channel ? `
                        <div class="channel">
                            <img src="${videoMetadata.thumbnailUrl || ''}" class="thumbnail" alt="thumbnail">
                            <span class="channel-name">${videoMetadata.channel}</span>
                        </div>
                    ` : ''}
                    ${videoMetadata.duration ? `<span class="duration">⏱️ ${formatDuration(videoMetadata.duration)}</span>` : ''}
                </div>
                <div class="metadata-stats">
                    ${videoMetadata.views ? `<span class="views">👁️ ${formatViews(videoMetadata.views)}</span>` : ''}
                    ${videoMetadata.likes ? `<span class="likes">👍 ${formatViews(videoMetadata.likes)}</span>` : ''}
                </div>
            </div>
        </div>
    ` : '';

    content.innerHTML = `
        ${metadataHtml}
        <div class="transcript-text">
            ${transcriptData.split('\n').map(line => `<p>${line}</p>`).join('')}
        </div>
    `;
    
    modal.style.display = 'block';
}

// Update the styles
const styles = `
    .video-metadata {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e5e7eb;
        margin: -1.5rem -1.5rem 0 -1.5rem;
        background: #f9fafb;
    }

    .video-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1rem;
        line-height: 1.3;
    }

    .metadata-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
    }

    .metadata-primary {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .channel {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding-right: 1rem;
        border-right: 2px solid #e5e7eb;
    }

    .channel-name {
        font-weight: 500;
        color: #4b5563;
    }

    .thumbnail {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }

    .metadata-stats {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .metadata-stats span,
    .duration {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.8rem;
        background: white;
        border-radius: 6px;
        font-size: 0.9rem;
        color: #4b5563;
        border: 1px solid #e5e7eb;
    }

    .transcript-text {
        padding: 1.5rem 2rem;
        overflow-x: hidden;
    }
    
    .transcript-text p {
        margin-bottom: 0.3rem;
        padding: 0.4rem 0.5rem 0.4rem 3.8rem;
        border-radius: 4px;
        position: relative;
        transition: background-color 0.2s;
        line-height: 1.5;
    }

    .transcript-text p:hover {
        background-color: #f8f9ff;
    }

    .transcript-text p::before {
        content: attr(data-timestamp);
        position: absolute;
        left: 0.5rem;
        color: #6366f1;
        font-size: 0.85rem;
        font-family: monospace;
        opacity: 0.8;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

function closeModal() {
    const modal = document.getElementById('transcriptModal');
    modal.style.display = 'none';
}

async function copyTranscript() {
    if (!transcriptData) return;
    
    try {
        await navigator.clipboard.writeText(transcriptData);
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Text';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text:', err);
        alert('Failed to copy transcript');
    }
}

// Auto-extract when pasting URL
document.getElementById('youtubeUrl').addEventListener('paste', (e) => {
    setTimeout(extractTranscript, 0);
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('transcriptModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Add this function to test the API
async function testAPI() {
    const testURL = 'https://www.youtube.com/watch?v=_JNCqY8ltSg';
    try {
        const response = await fetch('https://brightify-snap-buzz-production.up.railway.app/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                url: testURL
            })
        });

        console.log('Test API Response Status:', response.status);
        const data = await response.text();
        console.log('Test API Response:', data);
    } catch (error) {
        console.error('Test API Error:', error);
    }
}

// Call this in the browser console to test the API
// testAPI(); 

// Add event listener for input changes
document.getElementById('youtubeUrl').addEventListener('input', function(e) {
    const url = e.target.value.trim();
    if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) {
        extractTranscript();
    }
}); 