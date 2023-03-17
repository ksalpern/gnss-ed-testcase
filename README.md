# Genesis frontend test case

Click [here](https://ksalpern-genesis-testcase.netlify.app/) to see\* working the app.
Also, you will be able to see what the app looks like on my local machine [here](https://youtu.be/qByXLYBkQtI).

\*You may need [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) to see videos here.

## Short task description

- This task required me to create a learning application with two pages: a page for courses (Home) and a page for viewing a lesson (Lesson). The [API](https://www.postman.com/aninix/workspace/genesis-front-end-school/overview) for the application is provided, and I forked it into my Postman account to work on it.

- The application has a good user interface, I used TailwindCSS for a fully responsive and mobile-first design but the code is the more important part here.

- On the course (Home) page, I displayed the last 10 courses, each containing the course title, course photo, number of lessons, skills, and rating. The page shows 10 courses and includes pagination. Additionally, when the user hovers over a course, a video without sound plays!

- On the lesson page, the first video of the course is displayed, along with course details and a list of lessons. When the user clicks on a lesson that is not locked, the current video will open and the user should understand which lesson they are viewing. If a lesson is locked, it will be shown as such to the user. Additionally, there are two additional features I implemented:

**Picture-in-picture functionality**: the video can be displayed on top of the page when clicked, and it will stay in the same position on the page while the user navigates other pages.

**Changing the video playback speed through the keyboard** (use the down ↓ and up ↑ arrow keys to adjust the video playback speed) and displaying information about how to use it.

## Some issues I faced with:

- There was a problem with getting the video from API because of the side effects of content migration in s3 buckets. For fixing it I used the hls.js library and [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) Chrome Extention. But for the Home page, I used my local video to make a video play on hover.

- I didn't do tests, it may cause troubles in the future

- I wasn't able to save the user's progress in watching&course the lesson by local storage

## How to start the project on your local machine?

1. Download or clone this repository

2. Install its dependencies: **yarn / npm install**

3. Build the project: **yarn build / npm run build**

4. Start the project: **yarn start / npm start**

5. Download [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) if the app doesn't work

6. The website is now working, hope you enjoy it 😃
