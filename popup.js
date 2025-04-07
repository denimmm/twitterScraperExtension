document.getElementById('scrape_button').addEventListener('click', function() {

    // Send a message to the background script to start scraping
    chrome.runtime.sendMessage({ action: 'scrapeTweets' }, function(response) {

        if (response.status === 'started') {
            console.log('Tweet scraping started.');
            document.getElementById(status_text).innerHTML("scraped\n");
        }
    });
});