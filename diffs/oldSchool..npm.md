diff --git a/README.md b/README.md
index db40ed2..70f7d37 100644
--- a/README.md
+++ b/README.md
@@ -5,7 +5,7 @@ This repository will implement the article and link to the corresponding commits
 
 ## Using JavaScript the “old-school” way
 
-**Branch: oldSchool**
+**Branch: (oldSchool)[https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/oldSchool]**
 
 Showing how you do things with works with browser only, meaning no need for an httpd style server.
 
@@ -39,4 +39,10 @@ Some changes I added had been to override console.log to output to a div on the
         <script src="index.js"></script>
     </body>
 </html>
-```
\ No newline at end of file
+```
+
+## Using a JavaScript package manager (npm)
+
+**Branch: (npm)[https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/npm]**
+
+No special changes besides the names.
\ No newline at end of file
diff --git a/index.html b/index.html
index 381bc5c..2025bf4 100644
--- a/index.html
+++ b/index.html
@@ -3,7 +3,7 @@
     <head>
         <meta charset="UTF-8">
         <title>JavaScript Example</title>
-        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js"></script>
+        <script src="node_modules/moment/min/moment.min.js"></script>
     </head>
     <body>
         <h1>Hello from HTML!</h1>
diff --git a/package.json b/package.json
new file mode 100644
index 0000000..1447c64
--- /dev/null
+++ b/package.json
@@ -0,0 +1,27 @@
+{
+  "name": "modern-js4dinosaurs",
+  "version": "1.0.0",
+  "description": "based on the article of https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70",
+  "main": "index.js",
+  "scripts": {
+    "test": "echo \"Error: no test specified\" && exit 1"
+  },
+  "repository": {
+    "type": "git",
+    "url": "git+https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs.git"
+  },
+  "keywords": [
+    "tutorial",
+    "npm",
+    "javascript"
+  ],
+  "author": "Thorsten Scherler",
+  "license": "ISC",
+  "bugs": {
+    "url": "https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/issues"
+  },
+  "homepage": "https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs#readme",
+  "dependencies": {
+    "moment": "2.19.1"
+  }
+}
