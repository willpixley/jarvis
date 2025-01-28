import axios from 'axios'

export const NYT_API_URL = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=yourkey'

const nytApiKey = import.meta.env.NYT_KEY
const nytApiSecret = import.meta.env.NYT_SECRET
