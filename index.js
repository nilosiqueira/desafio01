const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const ageMiddleware = (req, res, next) => {
  if (req.query.age) {
    return next()
  }
  return res.redirect('/')
}
app.get('/', (req, res) => res.render('age'))

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  }
  return res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/minor', ageMiddleware, (req, res) =>
  res.render('minor', { age: req.query.age })
)
app.get('/major', ageMiddleware, (req, res) =>
  res.render('major', { age: req.query.age })
)

app.listen(3000)
