import { useEffect, useState } from 'react'
import axios from 'axios'
function formatDateTime(dateStr) {
  const options = {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: 'numeric'
  }

  const time = new Date(dateStr).toLocaleTimeString('en-US', options)

  const dateOptions = {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'numeric',
    day: '2-digit'
  }

  const date = new Date(dateStr).toLocaleDateString('en-US', dateOptions)

  return `${time} ${date}`
}

export default function News() {
  const [articles, setArticles] = useState([])

  async function getNews() {
    const { data } = await axios.get(
      'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=AISZDKVJxDQpsHmZHul7csGYHW871Wue'
    )
    console.log('News, ', data)
    const n = data.results.map((article) => ({
      title: article.title,
      subsection: article.subsection,
      abstract: article.abstract,
      url: article.url,
      image: article.multimedia[2].url,
      updated: formatDateTime(article.updated_date),
      byline: article.byline
    }))
    setArticles(n)
  }

  useEffect(() => {
    getNews()
  }, [])
  return (
    <div className="w-screen h-screen  px-4 py-8 z-10 overflow-clip grid grid-cols-3 grid-rows-3 gap-8">
      {articles.slice(0, 9).map((article, index) =>
        index == 4 ? (
          <p
            className="border-2 border-slate-300 rounded-lg flex justify-center items-center text-slate-300 text-8xl text-opacity-80 font-bold"
            key={index}
          >
            FUCK
          </p>
        ) : (
          <div
            key={index}
            className="col-span-1 row-span-1 bg-slate-300 rounded-lg  w-full h-full flex gap-3 "
          >
            <div className="ml-3 w-[50%] flex flex-col ">
              {article.image && (
                <img src={article.image} alt={article.title} className="w-[95%] mt-3 rounded-md" />
              )}
              <p className="text-slate-800 font-semibold text-xs my-1 line-clamp-1">
                {article.byline}
              </p>
              <p className="text-gray-600 font-semibold text-xs mt-4">{article.updated}</p>
            </div>
            <div className="mr-3 w-[60%] border-2 border-slate-400 shadow-md bg-gray-400 my-3 rounded-md overflow-hidden flex flex-col justify-between">
              <div>
                <p className="font-semibold text-sm ml-1 mt-3">{article.title}</p>
                <p className="text-sm ml-1 mt-2 mb-1 line-clamp-3 text-ellipsis ">
                  {article.abstract}
                </p>
              </div>
              <div className="w-full justify-center flex">
                <a
                  className="text-blue-800 font-semibold text-xs my-1 text-center w-full underline"
                  href={article.url}
                >
                  Read more...
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
