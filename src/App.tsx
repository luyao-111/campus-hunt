import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

export default function App() {
  return (
    // HashRouter 会在网址里加一个 #，完美避开 GitHub Pages 的刷新 404 问题
    <HashRouter>
      <Routes>
        {/* 当网址是 / 时，显示 Home 组件 */}
        <Route path="/" element={<Home />} />
        
        {/* 动态路由：冒号开头代表这是变量，会被 Game.tsx 里的 useParams 抓取 */}
        <Route path="/game/:lang/:routeId/:stage" element={<Game />} />
      </Routes>
    </HashRouter>
  );
}