import { useState, useCallback } from 'react';
import { useProjects } from './context/ProjectContext';
import { useAuth } from './context/AuthContext';
import DesktopIcon from './components/DesktopIcon';
import DesktopParticles from './components/DesktopParticles';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import Window from './components/Window';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';

function App() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { isAuthenticated, logout } = useAuth();

  // UI State
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null); // 'project' | 'admin' | 'login'
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // Open windows list for taskbar
  const openWindows = [];
  if (activeWindow === 'project' && selectedProject) {
    openWindows.push({ id: 'project', title: selectedProject.name, icon: '📁' });
  }
  if (activeWindow === 'admin') {
    openWindows.push({ id: 'admin', title: 'Admin Panel', icon: '⚙️' });
  }
  if (activeWindow === 'login') {
    openWindows.push({ id: 'login', title: 'Giriş', icon: '🔐' });
  }

  // Handlers
  const handleProjectOpen = useCallback((project) => {
    setSelectedProject(project);
    setActiveWindow('project');
    setIsStartOpen(false);
  }, []);

  const handleAdminClick = useCallback(() => {
    setIsStartOpen(false);
    if (isAuthenticated) {
      setActiveWindow('admin');
    } else {
      setActiveWindow('login');
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = useCallback(() => {
    setActiveWindow('admin');
  }, []);

  const handleCloseWindow = useCallback(() => {
    setActiveWindow(null);
    setSelectedProject(null);
    setEditingProject(null);
  }, []);

  const handleVisitProject = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleEditFromDetail = useCallback((project) => {
    setEditingProject(project);
    setActiveWindow('admin');
  }, []);

  const handleDeleteFromDetail = useCallback(
    (id) => {
      if (window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
        deleteProject(id);
        handleCloseWindow();
      }
    },
    [deleteProject, handleCloseWindow]
  );

  const handleDesktopClick = useCallback(() => {
    setIsStartOpen(false);
  }, []);

  const handleWindowSelect = useCallback((id) => {
    // Already showing this window
  }, []);

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      {/* Background Particles */}
      <DesktopParticles />

      {/* Desktop Icons */}
      <div className="icon-grid" onClick={(e) => e.stopPropagation()}>
        {projects.map((project) => (
          <DesktopIcon
            key={project.id}
            project={project}
            onClick={() => { }}
            onDoubleClick={handleProjectOpen}
          />
        ))}

        {/* Admin Add Button (visible when admin) */}
        {isAuthenticated && (
          <div
            className="desktop-icon"
            onDoubleClick={() => {
              setActiveWindow('admin');
              setIsStartOpen(false);
            }}
            role="button"
            tabIndex={0}
            title="Yeni Proje Ekle"
          >
            <div
              className="desktop-icon__placeholder"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
                border: '2px dashed rgba(99,102,241,0.4)',
                fontSize: '1.4rem',
              }}
            >
              +
            </div>
            <span className="desktop-icon__label">Proje Ekle</span>
          </div>
        )}
      </div>

      {/* Taskbar */}
      <Taskbar
        onStartToggle={() => setIsStartOpen((prev) => !prev)}
        isStartOpen={isStartOpen}
        onAdminClick={handleAdminClick}
        isAdmin={isAuthenticated}
        openWindows={openWindows}
        activeWindowId={activeWindow}
        onWindowSelect={handleWindowSelect}
      />

      {/* Start Menu */}
      {isStartOpen && (
        <StartMenu
          projects={projects}
          onProjectClick={handleProjectOpen}
          onClose={() => setIsStartOpen(false)}
          isAdmin={isAuthenticated}
          onAdminClick={handleAdminClick}
          onLogout={logout}
        />
      )}

      {/* Project Detail Window */}
      {activeWindow === 'project' && selectedProject && (
        <Window
          title={selectedProject.name}
          icon={selectedProject.imageUrl || '📁'}
          onClose={handleCloseWindow}
          id="project-detail-window"
        >
          <ProjectDetail
            project={selectedProject}
            onVisit={handleVisitProject}
            isAdmin={isAuthenticated}
            onEdit={handleEditFromDetail}
            onDelete={handleDeleteFromDetail}
          />
        </Window>
      )}

      {/* Admin Panel Window */}
      {activeWindow === 'admin' && isAuthenticated && (
        <Window
          title="Admin Panel — Proje Yönetimi"
          icon="⚙️"
          onClose={handleCloseWindow}
          isLarge
          id="admin-panel-window"
        >
          <AdminPanel
            projects={projects}
            onAdd={addProject}
            onUpdate={updateProject}
            onDelete={deleteProject}
            onClose={handleCloseWindow}
          />
        </Window>
      )}

      {/* Login Window */}
      {activeWindow === 'login' && !isAuthenticated && (
        <Window
          title="Admin Girişi"
          icon="🔐"
          onClose={handleCloseWindow}
          id="login-window"
        >
          <LoginForm
            onSuccess={handleLoginSuccess}
            onClose={handleCloseWindow}
          />
        </Window>
      )}
    </div>
  );
}

export default App;
