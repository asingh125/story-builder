/* eslint-disable */

const PORT = process.env.PORT || 3000
const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const Metaphor = require('metaphor-node').default
const cheerio = require('cheerio');
const axios = require('axios')
const puppeteer = require('puppeteer')

const OpenAI = require("openai")
// import { config } from 'dotenv'
// import OpenAI from "openai";


// config()


const openai = new OpenAI({
  apiKey: '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'
});


async function runCompletion (text) {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: "Write a summary with less than 10 words of the following story: '"+text+"'",
      max_tokens:100
    });

    return completion
}


async function getWebpageHTML(url) {
  // Launch a headless Chromium browser
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-gpu'],
  });

  try {
    // Open a new page
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url);

    // Wait for JavaScript to execute (you can adjust the wait time as needed)
    // await page.waitForTimeout(5000); // Wait for 5 seconds

    await page.waitForXPath("//img[contains(@class, 'ResponsiveImage') and @role='presentation']")//waitForTimeout(5000); // Wait for 5 seconds

    // Get the HTML content after JavaScript execution
    const htmlContent = await page.content();

    return htmlContent;
  } catch (error) {
    console.error('Error fetching webpage:', error);
    return null;
  } finally {
    // Close the browser when done
    await browser.close();
  }
}

const apiKey = '4ebada2f-d78a-4131-ae52-f847eb19f24f' // Replace with your actual API key
const metaphor = new Metaphor(apiKey)

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())

app.get('/hello', async (req, res, next) => {
  try {
    res.send("aarushi")
  } catch (err) {
    next(err)
  }
})

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.get('/', (req, res) => {
  res.send('welcome')
})

var server = app.listen(PORT, () => {
})


const get_metaphor_search_results = async (title, story, num_results) => {
  const query = "Here's the link to a book about " + story + ":";
  const searchOptions = {
    numResults: num_results,
    includeDomains: ["goodreads.com"]
  };
  
  // Search API call
  metaphor.search(query, searchOptions)
    .then(response => {
      console.log("SEARCH RESULTS:")
      console.log(response.results)
      response.results.forEach((item) => {
        const url = item['url']
        const title_text = item['title']
        const author = item['author']
        // console.log("GETTING URL: " + url)
        getWebpageHTML(url)
        .then((htmlContent) => {
          if (htmlContent) {
            const $ = cheerio.load(htmlContent)
      
            // Use jQuery selectors to find the image element with the specific id and class
            const $imageElement = $('img.ResponsiveImage[role="presentation"]');
            const $titleElement = $('h1.Text.Text__title1');
          
            // Extract the src attribute from the image element
            const srcAttribute = $imageElement.attr('src')
            const titleH1 = $titleElement.text()
          
            // Now, srcAttribute contains the value of the src attribute
            // console.log(titleH1 + " " + srcAttribute)
            // Publish this as a book_msg
            const books = stories.get(title)['books']
            const new_book = {book_title: titleH1, book_src: srcAttribute, book_url: url}
            books.push(new_book)
            const book_msg = {type: "book", books: books}
            console.log(book_msg)
            socketIO.emit(title, book_msg)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    })

      // // Contents API call
      // metaphor.getContents(doc_ids)
      // .then(response => {
      //   console.log("CONTENTS RESULTS:")
      //   console.log(response.contents)
      //   const book_details = parse_metaphor_document_results(response.contents)
      //   console.log(book_details)

      //   return book_details
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      // })

      return response.results
    })
    .catch(error => {
      console.error('Error:', error)
      return []
    });
}

// const parse_metaphor_document_results = (contents) => {
//   return contents.map((item) => {
//     const title = item['title']
//     const url = item['url']
//     const htmlString = item['extract']
//     // Create a jQuery object from the HTML string
//     const $ = cheerio.load(htmlString)
  
//     // Use jQuery selectors to find the image element with the specific id and class
//     const $imageElement = $('img.ResponsiveImage[role="presentation"]');
  
//     // Extract the src attribute from the image element
//     const srcAttribute = $imageElement.attr('src')
  
//     // Now, srcAttribute contains the value of the src attribute
//     console.log(srcAttribute)

//     return srcAttribute
//   })
// }

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
})

socketIO.listen(server)

const stories = new Map()

const update_player_turn = (room, player) => {
  var turn_index = room.players.indexOf(player)
  if (turn_index == room.players.length - 1) {
    turn_index = 0
  } else {
    turn_index++
  }
  const player_turn_msg = {type: "player_turn", player: room.players[turn_index]}
  console.log(player_turn_msg)
  socketIO.emit(room.title, player_turn_msg)
}

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);

  // Handle user join message
  socket.on('join', (data) => {
    const title = data.title
    const player = data.player
    console.log(player + " is trying to join ")
    console.log(stories)
    if (!stories.has(title)) {
      console.log("map hasnt")
      const room = {title: title, story: "Once upon a time,", players: [player], EOS: false, books: []}
      stories.set(title,room)
    } else {
      const room = stories.get(title)
      room.players.push(player)
      console.log("ROOM")
      console.log(room)
      if (room.players.length == 2) {
        update_player_turn(room, player)
      }
    }
    const story_update_msg = {type: "story_update", story: stories.get(title).story, EOS: false}
    // console.log(story_update_msg)
    // console.log(title + ": " + stories.get(title).players)
    socketIO.emit(title, story_update_msg);
  })

  // Handle add word message
  socket.on('word', (data) => {
    const title = data.title
    var new_word = data.word
    const player = data.player

    // Update room story string
    const room = stories.get(title)
    if (room.EOS) { // if at start of a sentence, capitalize new word
      new_word = new_word.charAt(0).toUpperCase() + new_word.slice(1)
    }
    room.story += " " + new_word
    room.EOS = false
    const story_update_msg = {type: "story_update", story: room.story, EOS: false}
    console.log(story_update_msg)
    socketIO.emit(title, story_update_msg)

    // Update player turn
    update_player_turn(room, player)
  })

  // Handle punctuate message
  socket.on('punctuate', (data) => {
    const title = data.title
    const punctuation = data.punctuation
    const player = data.player

    // Update room story string
    const room = stories.get(title)
    room.story += punctuation
    room.EOS = true
    const story_update_msg = {type: "story_update", story: room.story, EOS: true}
    console.log(story_update_msg)
    socketIO.emit(title, story_update_msg)

    // Update player turn
    update_player_turn(room, player)
  })

  // Handle end story message
  socket.on('end', async (data) => {
    const title = data.title
    const player = data.player
    const room = stories.get(title)

    // Calculate summary and send epilogue message
    const result = await runCompletion(room.story)
    const summary = result.choices[0].text
      console.log(summary)
      const epilogue_msg = {type: "epilogue", story: room.story, summary: summary}
      console.log(summary)
      socketIO.emit(title, epilogue_msg)

      // Load in the books recommended by metaphor
      const results = get_metaphor_search_results(title, summary, 6)
    // const summary = "a girl who attends a hackathon and turns her project into a startup"
    // const summary = room.story
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})



// const story = "Once upon a time, in a world filled with enchantment and magic, there were countless fairy tales waiting to be told. These tales wove together the adventures of brave heroes, cunning witches, and whimsical creatures, each with their own unique story. As these stories unfolded, they transported readers and viewers to far-off lands where dreams came true, and anything was possible. And so, the world of fairy tales continued to captivate hearts and minds, inspiring wonder and imagination for generations to come."

// const response = await runCompletion(story)

// console.log(response);
