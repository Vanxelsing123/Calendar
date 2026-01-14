export function Legend() {
	return (
		<div className='legend'>
			<div className='legend-item'>
				<div className='legend-color' style={{ background: '#6FCF97' }}></div>
				<span>Дневная</span>
			</div>
			<div className='legend-item'>
				<div className='legend-color' style={{ background: '#8B7BB8' }}></div>
				<span>Ночная</span>
			</div>
			<div className='legend-item'>
				<div className='legend-color' style={{ background: '#505050' }}></div>
				<span>Выходной</span>
			</div>
			<div className='legend-item'>
				<div className='legend-color' style={{ background: '#D4AF37' }}></div>
				<span>Больничный</span>
			</div>
			<div className='legend-item'>
				<div className='legend-color' style={{ background: '#5DADE2' }}></div>
				<span>Отпуск</span>
			</div>
			<div className='legend-item'>
				<div className='legend-color' style={{ background: '#fff' }}></div>
				<span>Индикатор Заметки</span>
			</div>
		</div>
	)
}
