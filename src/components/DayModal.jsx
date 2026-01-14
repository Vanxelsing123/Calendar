import { useState } from 'react'
import { formatDate, getMonthName } from '../utils/dateUtils'

export function DayModal({ date, defaultType, override, onSave, onClose }) {
	const [type, setType] = useState(override?.type || defaultType)
	const [note, setNote] = useState(override?.note || '')
	const [useRange, setUseRange] = useState(false)
	const [startDateStr, setStartDateStr] = useState(formatDate(date))
	const [endDateStr, setEndDateStr] = useState(formatDate(date))

	const isRangeType = type === 'vacation' || type === 'sick-leave'

	const handleSave = () => {
		if (isRangeType && useRange) {
			// Применяем к диапазону
			const startDate = new Date(startDateStr)
			const endDate = new Date(endDateStr)

			if (endDate < startDate) {
				alert('Конечная дата не может быть раньше начальной')
				return
			}

			// Собираем все даты в массив
			const dates = []
			const currentDate = new Date(startDate)

			while (currentDate <= endDate) {
				dates.push(formatDate(new Date(currentDate)))
				currentDate.setDate(currentDate.getDate() + 1)
			}

			// Передаем массив дат с флагом isMultiple
			onSave(dates, { type, note: note.trim() }, true)
			onClose()
		} else {
			// Применяем к одному дню
			onSave(formatDate(date), { type, note: note.trim() })
			onClose()
		}
	}

	const handleReset = () => {
		onSave(formatDate(date), null)
		onClose()
	}

	const handleTypeChange = newType => {
		setType(newType)
		if (newType !== 'vacation' && newType !== 'sick-leave') {
			setUseRange(false)
		}
	}

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal' onClick={e => e.stopPropagation()}>
				<h2>
					{date.getDate()} {getMonthName(date)}
				</h2>

				<div className='modal-field'>
					<label>Тип дня</label>
					<select value={type} onChange={e => handleTypeChange(e.target.value)}>
						<option value='day-shift'>День (8:00-20:00)</option>
						<option value='night-shift'>Ночь (20:00-8:00)</option>
						<option value='rest-day'>Отсыпной</option>
						<option value='day-off'>Выходной</option>
						<option value='vacation'>Отпуск</option>
						<option value='sick-leave'>Больничный</option>
					</select>
				</div>

				{isRangeType && (
					<div className='modal-field'>
						<label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
							<input
								type='checkbox'
								checked={useRange}
								onChange={e => setUseRange(e.target.checked)}
								style={{ marginRight: '8px', cursor: 'pointer' }}
							/>
							Применить к диапазону дат
						</label>
					</div>
				)}

				{isRangeType && useRange && (
					<>
						<div className='modal-field'>
							<label>С какой даты</label>
							<input
								type='date'
								value={startDateStr}
								onChange={e => setStartDateStr(e.target.value)}
								style={{
									width: '100%',
									background: '#1a252f',
									border: '1px solid #3d4d5f',
									borderRadius: '6px',
									padding: '10px',
									color: '#fff',
									fontSize: '14px',
									fontFamily: 'inherit',
								}}
							/>
						</div>
						<div className='modal-field'>
							<label>По какую дату (включительно)</label>
							<input
								type='date'
								value={endDateStr}
								onChange={e => setEndDateStr(e.target.value)}
								style={{
									width: '100%',
									background: '#1a252f',
									border: '1px solid #3d4d5f',
									borderRadius: '6px',
									padding: '10px',
									color: '#fff',
									fontSize: '14px',
									fontFamily: 'inherit',
								}}
							/>
						</div>
					</>
				)}

				<div className='modal-field'>
					<label>Заметка</label>
					<textarea
						value={note}
						onChange={e => setNote(e.target.value)}
						placeholder='Добавить заметку...'
					/>
				</div>

				<div className='modal-buttons'>
					{override && (
						<button className='btn-danger' onClick={handleReset}>
							Сбросить
						</button>
					)}
					<button className='btn-secondary' onClick={onClose}>
						Отмена
					</button>
					<button className='btn-primary' onClick={handleSave}>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
}
