export function SideMenu({ isOpen, onClose, currentShift, onShiftChange, shifts }) {
  return (
    <>
      <div 
        className={`menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>Графики смен</h2>
          <button className="menu-close" onClick={onClose}>×</button>
        </div>
        
        <div className="menu-content">
          <div className="menu-section">
            <h3>Выберите смену</h3>
            <div className="shift-list">
              {shifts.map((shift) => (
                <div
                  key={shift.number}
                  className={`shift-item ${currentShift === shift.number ? 'active' : ''}`}
                  onClick={() => {
                    onShiftChange(shift.number);
                    onClose();
                  }}
                >
                  <div className="shift-item-header">
                    <span className="shift-number">Смена {shift.number}</span>
                    {currentShift === shift.number && (
                      <span className="shift-badge">Активна</span>
                    )}
                  </div>
                  <div className="shift-info">{shift.info}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
