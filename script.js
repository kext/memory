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
      card1: null,
      card2: null
    }
  },
  methods: {
    flip(i) {
      if (this.cards[i].hidden && this.card2 === null) {
        this.cards[i].hidden = !this.cards[i].hidden
        if (this.card1 === null) {
          this.card1 = i
        } else {
          this.card2 = i
          if (this.cards[this.card1].image === this.cards[this.card2].image) {
            this.card1 = null
            this.card2 = null
          } else {
            setTimeout(() => {
              if (this.card1 !== null) {
                this.cards[this.card1].hidden = !this.cards[this.card1].hidden
                this.card1 = null
              }
              if (this.card2 !== null) {
                this.cards[this.card2].hidden = !this.cards[this.card2].hidden
                this.card2 = null
              }
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
