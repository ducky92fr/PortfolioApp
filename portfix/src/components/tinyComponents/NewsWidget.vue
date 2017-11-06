<template>
  <div class='footer' id='newsWidget'>
    <h1>News</h1>
    <section class='news-section' v-if='news'>
      <article v-for='article in news' :key='article.url' class="message is-info">
        <div class='message-header news-title'>
          <h1><a :href="article.url" target="_blank">{{titleFormat(article.headline)}}</a></h1>
          <p>{{date(article.datetime)}}
            <span class="tickerTag" v-if='article.ticker'>{{article.ticker}}</span>
            </p>  
        </div>
        <div class='message-body news-body'>
          <p>
            <span><a :href="article.url" target="_blank">{{article.headline}}</a> - </span>          
            {{article.summary}}
          </p>
        </div>
      </article>
    </section>
    <section class='intro' v-if='!news'>
      <h1>Add some stocks to your portfolio to start getting related news here!</h1>
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
        let urls = []
        Object.keys(newsObject).forEach(stock => {
          let array_of_news = newsObject[stock].news
          array_of_news.forEach(news => {
            if (news.summary != 'No summary available.') {
              let ticker
              let related = news.related.split(',')
              related.forEach(item => {
                if (item === stock) {
                  ticker = stock
                  return
                }
              })
              news.ticker = ticker
              if (urls.indexOf(news.url) === -1) {
                newsArticles.push(news)
                urls.push(news.url)
              }
            }
          })
        })
       newsArticles = newsArticles.sort(function(a, b) {
            a = new Date(a.datetime)
            b = new Date(b.datetime)
            return a > b ? - 1 : a < b ? 1 : 0
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
  background-color: rgba(33, 150, 243, 0.82);
  border: 1px solid #6db0ea;
  box-shadow: 0px 1px 3px 1px rgb(96, 99, 101);
}
#newsWidget a {
  text-decoration: none;
}
h1:first-of-type {
  font-size: 2em;
  font-weight: 600;
  color: #fffefe;
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
  border: 1px solid #96949438;
  box-shadow: 0.5px 0.5px 4px 0px rgba(64, 64, 64, 0.8);
  background-color: white;
}
.news-section article .news-title {
  height: 55px;
  line-height: 20px;
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
  height: 160px;
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
  color: #11537d;
}
.news-section article .news-title p {
  font-weight: 600;
  font-size: 1.3em;
  height: 28px;
  font-style: italic;
  text-align: left;
  overflow-y: hidden;
  margin: 0px;
}
.news-section article .news-body p {
  font-weight: 400;
  font-size: 1.3em;
  text-align: left;
  line-height: 24px;
  margin: 0px;
  padding: 0px;
  color: #2b2a2a;
  padding-right: 5px;
}
.news-section article .news-body p span {
  font-weight: 600;
}
.tickerTag {
  font-style: normal;
  font-size: 0.9em;
  color: white;
  background-color: #1cd41c;
  padding: 2px 8px;
  margin-left: 10px;
  border-radius: 3px;
  width: 45px;
  text-align: center;
  display: inline-block;
}
.intro {
  width: 100vw;
  margin-top: 50px;
  text-align: center;
}
</style>
