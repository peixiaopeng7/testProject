import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { CharactersPage } from './pages/CharactersPage';
import { ExportPage } from './pages/ExportPage';
import { OverviewPage } from './pages/OverviewPage';
import { ScriptPage } from './pages/ScriptPage';
import { StoryboardPage } from './pages/StoryboardPage';
import { StylePage } from './pages/StylePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<OverviewPage />} />
          <Route path="script" element={<ScriptPage />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="storyboard" element={<StoryboardPage />} />
          <Route path="style" element={<StylePage />} />
          <Route path="export" element={<ExportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
