const router = require('express').Router()
const fs = require('fs')
const puppeteer = require('puppeteer')
// const bodyParser = require('body-parser')

router.post('/pdf', async (req, res) => {
  fs.unlinkSync('result.pdf')
  const { html } = req.body
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  const pdf = await page.pdf({ path: 'result.pdf', format: 'A4' })
  // const pdfStr = pdf.toString('utf8')
  // fs.writeFileSync('result2.pdf', pdf)
  const pdfBuf = pdf.buffer
  res.send(pdfBuf)
})

module.exports = router
