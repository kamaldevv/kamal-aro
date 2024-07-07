const youtubePlaylist = document.getElementById('youtubePlaylist');
const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems';
const params = {
    part: 'snippet',
    maxResults: 12,
    playlistId: 'UUbdiovrPX0spsJLbEisvAgQ', 
    key: 'AIzaSyCI_3-GwYdeMm6wMnInJyf44rzYahQmx3M' 
};
const url = new URL(apiUrl);
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.items.forEach(item => {
            const videoId = item.snippet.resourceId.videoId;
            const videoTitle = item.snippet.title;
            const videoDate = item.snippet.publishedAt;
            const videoHTML = `
                <div class="col-md-3 mb-4"> <!-- Tambahkan class mb-4 untuk margin bottom -->
                    <div class="card">
                        <iframe class="card-img-top" width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" title="${videoTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <div class="card-body">
                            <p>${videoTitle}</p>
                            <small>${new Date(videoDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>
            `;

            youtubePlaylist.innerHTML += videoHTML;
        });
    })
    .catch(err => console.error('Error fetching YouTube API:', err));