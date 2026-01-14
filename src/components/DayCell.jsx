export function DayCell({ date, type, hasNote, isToday, onClick }) {
  if (!date) {
    return <div className="day-cell empty"></div>;
  }

  return (
    <div 
      className={`day-cell ${type} ${isToday ? 'today' : ''}`}
      onClick={onClick}
    >
      {date.getDate()}
      {hasNote && <div className="note-indicator"></div>}
    </div>
  );
}
