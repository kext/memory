const shuffle = a => {
  const r = []
  while (a.length > 0) {
    r.push(...a.splice(Math.floor(Math.random() * a.length), 1))
  }
  return r
}
const createCards = n => {
  const r = []
  for (let i = 0; i < n; ++i) {
    r.push({
      image: Math.floor(i / 2),
      hidden: true
    })
  }
  return shuffle(r)
}

const app = Vue.createApp({
  data() {
    return {
      cards: createCards(16),
      tmp: null,
      found: 0
    }
  },
  methods: {
    flip(i) {
      if (this.found < this.cards.length && this.cards[i].hidden) {
        this.cards[i].hidden = false
        if (this.tmp === null) {
          this.tmp = i
        } else {
          if (this.cards[this.tmp].image === this.cards[i].image) {
            this.tmp = null
            this.found += 2
            if (this.found === this.cards.length) {
              setTimeout(() => {
                this.cards.forEach(c => c.hidden = true)
                setTimeout(() => {
                  this.cards = createCards(this.cards.length)
                  this.found = 0
                }, 600)
              }, 5000)
            }
          } else {
            const j = this.tmp
            this.tmp = null
            setTimeout(() => {
              this.cards[i].hidden = true
              this.cards[j].hidden = true
            }, 1000)
          }
        }
      }
    },
    img(i) {
      return {
        'background-image': 'url(img/' + i + '.jpg)'
      }
    }
  }
})
.mount('#app')

window.addEventListener('keydown', e => {
  if (e.key === 'f') {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.querySelector('html').requestFullscreen()
    }
  }
})
