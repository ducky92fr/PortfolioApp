<template>
  <div class='footer' id='newsWidget'>
    <h1>NEWS</h1>
    <section class='news-section'>
      <article v-for='article in news' :key='article.url' class="message is-info">
        <div class='message-header news-title'>
          <h1><a :href="article.url" target="_blank">{{titleFormat(article.headline)}}</a></h1>
          <p>{{date(article.datetime)}}</p>  
        </div>
        <div class='message-body news-body'>
          <p>
            <span><a :href="article.url" target="_blank">{{article.headline}}</a> - </span>          
            {{article.summary}}
          </p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { getNewsFromIEX } from '@/api'
import dateFormat from 'dateformat'
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
  props: ['stocks'],
  methods: {
    titleFormat: function (title) {
        if (title.length <= 30) {
          return title
        } else {
          return title.slice(0, 35) + '...'
        }
      },
    date: function (date) {
      return  dateFormat(date, 'mmmm dS, yyyy')
    }
  }
}
</script>

<style scoped>
#newsWidget {
  flex-direction: column;
  align-items: flex-start;
  width: 100vw;
  height: 350px;
  padding: 23px 20px 20px 20px;
  margin-top: auto;
  background: #2196f3d1;
  border: 1px solid #6db0ea;
  box-shadow: 0px 1px 3px 1px rgb(96, 99, 101);
}
#newsWidget a {
  text-decoration: none;
}
h1 {
  font-size: 2em;
  font-weight: 600;
}
.news-section {
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-content: flex-start;
  width: 96vw;
  height: 380px;
  box-sizing: content-box;
  overflow-x: scroll;
  align-self: flex-start;
}
.news-section article {
  width: 360px;
  height: 95%;
  overflow-y: hidden;
  border-radius: 0px;
  margin: 0px 5px;
  flex-shrink: 0;
  border: 1px solid #3f51b5;
  box-shadow: 2px 2px 3px 1px rgba(64, 64, 64, 0.8);
  background-color: white;
}
.news-section article .news-title {
  height: 15%;
  min-height: 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  overflow-y: hidden;
  border-radius: 0px;
  background-color: #fbfbfb;
  color: #11537d;
}
.news-section article .news-body {
  height: 85%;
  overflow-y: hidden;
  padding: 5px 10px;
  padding-left: 10px;
  border: none;
}
.news-section article .news-title h1 {
  font-weight: 600;
  font-size: 1.4em;
  height: 60%;
  line-height: 27px;
  text-align: left;
  overflow-y: hidden;
  margin: 0px;
}
.news-section article .news-title p {
  font-weight: 600;
  font-size: 1.3em;
  height: 40%;
  font-style: italic;
  text-align: left;
  overflow-y: hidden;
  margin: 0px;
}
.news-section article .news-body p {
  font-weight: 400;
  font-size: 1.3em;
  text-align: left;
  line-height: 25px;
  text-align: justify;
  margin: 0px;
  padding: 0px;
  color: #2b2a2a;
}
.news-section article .news-body p span {
  font-weight: 600;
}
</style>
