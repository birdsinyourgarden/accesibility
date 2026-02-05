import { useState, useRef } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  
  const tabs = [
    { id: 1, label: 'Perfil', content: 'Información de perfil' },
    { id: 2, label: 'Configuración', content: 'Opciones de configuración' },
    { id: 3, label: 'Notificaciones', content: 'Preferencias de notificaciones' }
  ];
  
  const handleKeyDown = (e, index) => {
    let newIndex = index;

    switch(e.key) {
        case 'ArrowRight':
            newIndex = index < tabs.length - 1 ? index + 1 : 0;
            break;
        case 'ArrowLeft':
            newIndex = index > 0 ? index - 1 : tabs.length - 1;
            break;
        case 'Home':
            newIndex = 0;
            break;
        case 'End':
            newIndex = tabs.length - 1;
        default:
            return;
    }

    e.preventDefault();
    setActiveTab(newIndex);

    tabRefs.current[newIndex]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="opciones de usuario">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={el => tabRefs.current[i] = el}
            id={`tab-${i}`}
            role="tab"
            aria-selected={i === activeTab}
            aria-controls={`panel-${i}`}
            tabIndex={i === activeTab ? 0 : -1}
            onClick={() => setActiveTab(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={{
              fontWeight: i === activeTab ? 'bold' : 'normal'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default Tabs;