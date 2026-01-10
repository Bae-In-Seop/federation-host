import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root container missing in index.html')
}

const basename = import.meta.env.BASE_URL

createRoot(container).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
)
