import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import fs from 'fs'
import path from 'path'
import Vue from 'vue'
import renderer = require('vue-server-renderer')


dotenv.config()
const port = process.env.SERVER_PORT

const server = express()

server.use(bodyParser.json())
const template = fs.readFileSync(path.join(__dirname, "template/index.template.html"), "utf-8")
const render = renderer.createRenderer({template})
const context = {
  title: "vue SSR",
  meta: `
    <meta name="keyword" content="vue,ssr">
    <meta name="description" content="vue srr demo">
    <meta charset="utf-8" >
  `
}
server.get("/", (req, res) =>{
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问url是: {{url}}</div>`
  })

  render.renderToString(app, context).then(html => {
    res.end(html)
  }).catch(err => {
    console.error(err)
    res.status(500).end('Internal Server Error')
    return
  })

})

server.listen(port, ()=>{
  console.log(`Start app on ${port}....`)
})