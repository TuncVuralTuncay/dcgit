const express = require("express")
const { JsonDatabase } = require("wio.db")
const db = new JsonDatabase("./data.json")
const app = express()

app.get("/", (req,res) => {
    res.sendFile("./index.html", {root: __dirname})
})
app.get("/g/:code/", (req,res) => {
    var code = req.query.code
    var sa = db.fetch(code+"_")
    var as = db.fetch(`${code}`)
    if(db.fetch(code+"_")) {
        res.redirect(sa)
    } else if(as) {
        res.redirect("https://"+as)
    } else {
        res.sendFile("./index.html", {root: __dirname})
    }
})
app.get("/olustur", (req,res) => {
    const ojurl = req.query.orurl
    const ozlrl = req.query.ozlurl
    console.log(ojurl)
    console.log(ozlrl)
        if (ojurl.startsWith('discord.gg/') === true) {
            if(db.has(ozlrl) === true) {
                res.send("Bu özel url alınmış :( lütfen başka url deneyin")
            }
            db.set(`${ozlrl}`,`${ojurl}`)
            res.send(`
            <h1>Linkin oluşturuldu <a href="/g/${ozlrl}">Tıkla</a> ve git </h1>
            <p>Url : dcgit.ml/g/${ozlrl}`)
        } else if(ojurl.startsWith('https://discord.gg/')===true){
            if(db.has(ozlrl+"_") === true) {
                res.send("Bu özel url alınmış :( lütfen başka url deneyin")
            }
            db.set(`${ozlrl}_`,`${ojurl}`)
            res.send(`
            <h1>Linkin oluşturuldu <a href="/g/${ozlrl}">Tıkla</a> ve git </h1>
            <p>Url : dcgit.ml/g/${ozlrl}`)
        } else {
            res.send("Discord sunucu urlniz discord.gg/ veya https://discord.gg/ ile başlamalıdır <a href='/'>tıkla ve ana sayfaya dön</a>")
        }
})
app.get("/error/:text", (req,res) => {
    var text = req.params.text
    res.sendStatus(500).send(`
    <h1>HATA `+ text+ `</h1>`)
})

app.listen(3000)