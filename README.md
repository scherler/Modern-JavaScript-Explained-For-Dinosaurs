# Modern-JavaScript-Explained-For-Dinosaurs
based on the article of https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70

This repository will implement the article and link to the corresponding commits/branches.

## Using JavaScript the “old-school” way

**Branch: [oldSchool](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/001_oldSchool)**

Showing how you do things with works with browser only, meaning no need for an httpd style server.

Some changes I added had been to override console.log to output to a div on the html.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>JavaScript Example</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js"></script>
    </head>
    <body>
        <h1>Hello from HTML!</h1>
        <div>Console.log here:</div>
        <div id="log"></div>
        <script>
            // https://stackoverflow.com/questions/20256760/javascript-console-log-to-html
            (function () {
                var logger = document.getElementById('log');
                console.log = function (message) {
                    if (typeof message == 'object') {
                        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                    } else {
                        logger.innerHTML += message + '<br />';
                    }
                }
            })();
        </script>
        <script src="index.js"></script>
    </body>
</html>
```

## Using a JavaScript package manager (npm)

**Branch: [npm](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/002_npm)**

No special changes besides the names.

**[Diff](./diffs/001_oldSchool..002_npm)** `git diff 001_oldSchool..002_npm`

## Using a JavaScript module bundler (webpack)

**Branch: [webpack](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/003_webpack)**

No special changes besides adding bundle command to package.json. `npm run bundle`

**[Diff](./diffs/002_npm..003_webpack)** `git diff 002_npm..003_webpack`