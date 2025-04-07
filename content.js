


$(document).ready(function () {
    console.log("ready to scrape baby\n");
    function getTweets(){
        //gets all of the tweets in the search
        const tweets = document.querySelectorAll('[data-testid="tweet"]');

        //loop through each tweet and save to csv file
        for(const tweet of tweets){
            const csv_line = [];


            //get the username
            csv_line.push(tweet.querySelector('a').href)

            //get the text of each tweet
            csv_line.push(
                Array.from(tweet.querySelector('[data-testid="tweetText"]').querySelectorAll('span')).map(
                //collect and combine the spans into a single string
                span => span.textContent.trim()
                ).join(' ')
            );

            //get the date
            csv_line.push(tweet.querySelector('time').dateTime);

            //get the cashtag
            csv_line.push(tweet.querySelector('[data-testid="SearchBox_Search_Input"]').value);

            //get stats
            const stats_label = tweet.querySelector('[role="group"]').ariaLabel;
            const stats_regex = /\d+/gm;
            const tokens = stats_regex.exec(stats_label);

            //get replies
            csv_line.push(tokens[0]);
            //get retweets
            csv_line.push(tokens[1]);
            //get likes
            csv_line.push(tokens[2]);
            //get bookmarks
            csv_line.push(tokens[3]);
            //views
            csv_line.push(tokens[4]);

            //get sentiment

            //write to csv
            console.log(csv_line.join(',' + "\n"));
        }
    }


    //listen for messages from the popup
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'scrapeTweets') {
            getTweets();
            sendResponse({ status: 'started' });
        }
    });


});