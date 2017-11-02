<template>
  <div class='footer' id='newsWidget'>
    <h1>NEWS</h1>
    <section class='news-section'>
      <article v-for='article in news' :key='article.url' class="message is-info">
        <div class='message-header news-title'>
          <h1>{{article.headline}}</h1>
        </div>
        <div class='message-body news-body'>
          <p>{{article.summary}}</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { getNewsFromIEX } from '@/api'
export default {
  name: 'NewsWidget',
  asyncComputed: {
    news: function () {
      return getNewsFromIEX(this.stocks).then(newsObject => {
        let newsArticles = []
        Object.keys(newsObject).forEach(stock => {
          newsArticles = newsArticles.concat(newsObject[stock].news)
        })
        return newsArticles
      })
    }
  },
  props: ['stocks']
}
</script>

<style scoped>
#newsWidget {
  flex-direction: column;
  height: 350px;
  padding: 0px;
  margin-top: 10vh;
  background: #fafafa;
}
h1 {
  font-size: 2em;
}
.news-section {
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-content: flex-start;
  width: 90vw;
  height: 300px;
  overflow-x: scroll;
  align-self: flex-start;
}
.news-section article {
  width: 360px;
  height: 300px;
  overflow-y: hidden;
  border-radius: 0px;
  margin: 0px 5px;
  flex-shrink: 0;
}
.news-section article .news-title {
  height: 60px;
  overflow-y: hidden;
  border-radius: 0px;
}
.news-section article .news-body {
  height: 240px;
  overflow-y: hidden;
}
.news-section article .news-title h1 {
  font-weight: 600;
  font-size: 1.4em;
  text-align: left;
  height: 60px;
  margin: 0px;
  padding: 10px 10.5px 7px 10.5px;
}
.news-section article .news-body p {
  font-weight: 400;
  font-size: 1.3em;
  text-align: left;
  margin: 0px;
  padding: 0px;
}
</style>
