import './App.css';
import SiteNavigation from './components/SiteNavigation.jsx';
import DeskHero from './components/DeskHero.jsx';
import WorkDesk from './components/WorkDesk.jsx';
import ExperiencePlanner from './components/ExperiencePlanner.jsx';
import AboutDesk from './components/AboutDesk.jsx';
import SkillsKeyboard from './components/SkillsKeyboard.jsx';
import ContactDesk from './components/ContactDesk.jsx';

function App() {
  return (
    <div className="page">
      <SiteNavigation />
      <main>
        <DeskHero />
        <WorkDesk />
        <ExperiencePlanner />
        <AboutDesk />
        <SkillsKeyboard />
        <ContactDesk />
      </main>
    </div>
  );
}

export default App;
