import { useState } from 'react'
import { formatDate, getMonthName } from '../utils/dateUtils'

export function DayModal({ date, defaultType, override, onSave, onClose }) {
	const [type, setType] = useState(override?.type || defaultType)
	const [note, setNote] = useState(override?.note || '')
	const [showDateRange, setShowDateRange] = useState(false)
	const [endDateStr, setEndDateStr] = useState('')

	const isRangeType = type === 'vacation' || type === 'sick-leave'

	const handleSave = () => {
		onSave(formatDate(date), { type, note: note.trim() })
		onClose()
	}

	const handleRangeApply = () => {
		if (!endDateStr) {
			alert('Выберите конечную дату')
			return
		}

		const startDate = new Date(date)
		const endDate = new Date(endDateStr)

		if (endDate < startDate) {
			alert('Конечная дата должна быть позже начальной')
			return
		}

		// Сохраняем диапазон
		const dates = []
		const currentDate = new Date(startDate)
		while (currentDate <= endDate) {
			dates.push(formatDate(new Date(currentDate)))
			currentDate.setDate(currentDate.getDate() + 1)
		}

		// Применяем ко всем датам
		dates.forEach(dateStr => {
			onSave(dateStr, { type, note: note.trim() })
		})

		onClose()
	}

	const handleReset = () => {
		onSave(formatDate(date), null)
		onClose()
	}

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal' onClick={e => e.stopPropagation()}>
				<h2>
					{date.getDate()} {getMonthName(date)}
				</h2>

				<div className='modal-field'>
					<label>Тип дня</label>
					<select
						value={type}
						onChange={e => {
							setType(e.target.value)
							setShowDateRange(false)
						}}
					>
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
						<label>
							<input
								type='checkbox'
								checked={showDateRange}
								onChange={e => setShowDateRange(e.target.checked)}
								style={{ marginRight: '6px' }}
							/>
							Применить к диапазону дат
						</label>
					</div>
				)}

				{showDateRange && (
					<div className='modal-field'>
						<label>До какой даты (включительно)</label>
						<input
							type='date'
							value={endDateStr}
							onChange={e => setEndDateStr(e.target.value)}
							min={formatDate(date)}
							style={{
								width: '100%',
								background: '#1a252f',
								border: '1px solid #3d4d5f',
								borderRadius: '6px',
								padding: '10px',
								color: '#fff',
								fontSize: '14px',
							}}
						/>
					</div>
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
					<button className='btn-primary' onClick={showDateRange ? handleRangeApply : handleSave}>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
}
