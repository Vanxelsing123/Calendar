import { useState } from 'react';
import { formatDate } from '../utils/dateUtils';

export function SetupScreen({ onComplete }) {
  const [dateStr, setDateStr] = useState(() => {
    const today = new Date();
    return formatDate(today);
  });
  const [shiftNumber, setShiftNumber] = useState('1');
  const [shiftType, setShiftType] = useState('day-shift');

  const handleSubmit = () => {
    if (dateStr && shiftNumber && shiftType) {
      onComplete(dateStr, shiftNumber, shiftType);
    }
  };

  return (
    <div className="setup-screen">
      <h2>Добро пожаловать!</h2>
      <p>
        Настройте свой график работы.<br/>
        Выберите дату, номер смены и тип смены для начала отсчёта.
      </p>
      
      <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', color: '#a0b0c0', fontSize: '14px' }}>
            Дата начала
          </label>
          <input 
            type="date" 
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', color: '#a0b0c0', fontSize: '14px' }}>
            Номер смены
          </label>
          <select 
            value={shiftNumber}
            onChange={e => setShiftNumber(e.target.value)}
            style={{ 
              width: '100%',
              background: '#2B3E50',
              border: '1px solid #3d4d5f',
              borderRadius: '6px',
              padding: '12px',
              color: '#fff',
              fontSize: '16px'
            }}
          >
            <option value="1">Смена 1</option>
            <option value="2">Смена 2</option>
            <option value="3">Смена 3</option>
            <option value="4">Смена 4</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', color: '#a0b0c0', fontSize: '14px' }}>
            Тип смены
          </label>
          <select 
            value={shiftType}
            onChange={e => setShiftType(e.target.value)}
            style={{ 
              width: '100%',
              background: '#2B3E50',
              border: '1px solid #3d4d5f',
              borderRadius: '6px',
              padding: '12px',
              color: '#fff',
              fontSize: '16px'
            }}
          >
            <option value="day-shift">День (8:00-20:00)</option>
            <option value="night-shift">Ночь (20:00-8:00)</option>
          </select>
        </div>
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '8px' }}>
        Начать
      </button>
    </div>
  );
}
