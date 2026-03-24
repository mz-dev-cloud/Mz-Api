const express = require('express')
const { exec } = require('child_process')
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express() // 👈 TEM QUE VIR PRIMEIRO
app.use(express.static('site'))
// BUSCAR POSTS ALEATÓRIOS
app.get('/posts', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        res.json(response.data.slice(0, 5))
    } catch (err) {
        res.json({ error: 'deu ruim' })
    }
})

app.get('/', (req, res) => {
    res.json({
        status: 'zero api online',
        endpoints: {
            ytmp3: '/ytmp3?url=linkdoyoutube',
            ytmp4: '/ytmp4?url=linkdoyoutube'
        }
    })
})

app.get('/tiktok', (req, res) => {
    const url = req.query.url

    if (!url) {
        return res.json({ error: 'manda link do tiktok' })
    }

    const file = `tt_${Date.now()}.mp4`

    exec(`yt-dlp -o "${file}" ${url}`, (err) => {
        if (err) {
            return res.json({ error: 'erro ao baixar tiktok' })
        }

        res.download(file, () => {
            fs.unlinkSync(file)
        })
    })
})


app.get('/tiktokmp3', (req, res) => {
    const url = req.query.url

    if (!url) {
        return res.json({ error: 'manda o link do tiktok aí né campeão' })
    }

    const file = `tiktok_audio_${Date.now()}.mp3`

    exec(`yt-dlp -x --audio-format mp3 -o "${file}" ${url}`, (err) => {

        if (err) {
            return res.json({ error: 'erro ao baixar áudio do tiktok' })
        }

        res.download(file, () => {
            fs.unlinkSync(file)
        })
    })
})


app.get('/playmp3', (req, res) => {
    const nome = req.query.nome

    if (!nome) {
        return res.json({ error: 'manda o nome da música aí' })
    }

    const file = `musica_${Date.now()}.mp3`

    exec(`yt-dlp -x --audio-format mp3 -o "${file}" "ytsearch1:${nome}"`, (err) => {

        if (err) {
            return res.json({ error: 'erro ao buscar música' })
        }

        res.download(file, () => {
            fs.unlinkSync(file)
        })
    })
})


app.get('/playmp4', (req, res) => {
    const nome = req.query.nome

    if (!nome) {
        return res.json({ error: 'manda o nome do vídeo aí' })
    }

    const file = `video_${Date.now()}.mp4`

    exec(`yt-dlp -f mp4 -o "${file}" "ytsearch1:${nome}"`, (err) => {

        if (err) {
            return res.json({ error: 'erro ao buscar vídeo' })
        }

        res.download(file, () => {
            fs.unlinkSync(file)
        })
    })
})







app.get('/ytmp3', (req, res) => {
    const url = req.query.url

    if (!url) {
        return res.json({ error: 'manda a url do YouTube aí' })
    }

    const file = `audio_${Date.now()}.mp3`

    exec(`yt-dlp -x --audio-format mp3 -o "${file}" ${url}`, (err) => {
        if (err) {
            return res.json({ error: 'erro ao baixar áudio' })
        }

        res.download(file, () => {
            fs.unlinkSync(file)
        })
    })
})

app.get('/ytmp4', (req, res) => {
    const url = req.query.url

    if (!url) {
        return res.json({ error: 'cadê a url praga?' })
    }

    const file = `video_${Date.now()}.mp4`

    exec(`yt-dlp -f mp4 -o "${file}" ${url}`, (err) => {
        if (err) {
            return res.json({ error: 'erro ao baixar vídeo' })
        }

        res.download(file, () => {
            fs.unlinkSync(file)
        })
    })
})

app.listen(3000, () => {
    console.log('Zero api rodando na rota http://localhost:3000')
})