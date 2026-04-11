import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PhotographyPage } from './pages/PhotographyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/projects/:slug" element={<CaseStudyPage />} />
        <Route path="/case-study-strata.html" element={<Navigate to="/projects/strata" replace />} />
        <Route path="/case-study-dimension.html" element={<Navigate to="/projects/dimension" replace />} />
        <Route path="/case-study-vitrum.html" element={<Navigate to="/projects/vitrum" replace />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/photography.html" element={<PhotographyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
