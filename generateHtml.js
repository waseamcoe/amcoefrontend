import React from "react"
import ReactDOMServer from "react-dom/server"
import fs from "fs"
import Navigation from "./app/components/Navigation"
import Loading from "./app/components/Loading"
import { StaticRouter as Router } from "react-router-dom/server"

function Shell() {
  return (
    <Router>
      <Loading />
    </Router>
  )
}

const startOfHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/style.css" />
    <title>Home</title>
    <link rel="icon" type="image/png" href="https://res.cloudinary.com/dmw39pbxq/image/upload/q_10/v1722691227/1000075734_hlznks.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Trispace:wght@800&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
    <script src="https://kit.fontawesome.com/238a2d0049.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Cantarell&family=Inter:wght@100;700&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Cantarell&family=Inter:wght@100;700&family=Work+Sans:wght@600&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Abel:wght@0,200...1000;1,200...1000&display=swap" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
    <meta name="google-site-verification" content="E8NNf-rPeUR81--JzfDyPtlSO-w8CElPoVkhnpC8JbY" />
  </head>
  <body>
    <div id="root">`

const endOfHTML = `</div>
    </body>
  </html>`

/* Use Node tools (outside the scope of this course) to setup a
  stream we can write to that saves to a file on our hard drive
*/
const fileName = "./app/index-template.html"
const writeStream = fs.createWriteStream(fileName)

// Add the start of our HTML template to the stream
writeStream.write(startOfHTML)

/*
  Add the actual React generated HTML to the stream.
  We can use ReactDomServer (you can see how we imported
  that at the very top of this file) to generate a string
  of HTML text that a Node stream can leverage.
*/
const myStream = ReactDOMServer.renderToPipeableStream(<Shell />, {
  onAllReady() {
    myStream.pipe(writeStream)
    // End the stream with the final bit of our HTML
    writeStream.end(endOfHTML)
  },
})
