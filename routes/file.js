const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
// const bodyParser = require('body-parser')

router.post('/pdf', async (req, res) => {
  fs.unlinkSync('result.pdf')
  const { html } = req.body
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  await page.pdf({ path: 'result.pdf', format: 'A4' })
  // const url = path.resolve(__dirname, '../result.pdf')
  // res.setHeader('Content-Type', 'multipart/form-data')
  res.send('ok')
})

router.get('/pdf', async (req, res) => {
  const url = path.resolve(__dirname, '../result.pdf')
  const { title } = req.query
  res.download(url, title)
})

module.exports = router
