import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import ProjectPage from '../pages/ProjectPage.jsx'
import ExperiencePage from '../pages/ExperiencePage.jsx'
import ToolsPage from '../pages/ToolsPage.jsx'
import WritingsPage from '../pages/WritingsPage.jsx'
import WritingDetailPage from '../pages/WritingDetailPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/writings" element={<WritingsPage />} />
      <Route path="/writings/:slug" element={<WritingDetailPage />} />
    </Routes>
  )
}

export default App