import {
	formatDate,
	getMonthName,
	getShiftType,
	getWeekdayShort,
	isSameDay,
} from '../utils/dateUtils'
import { DayCell } from './DayCell'

export function MonthBlock({
	year,
	month,
	startDate,
	startShiftType,
	overrides,
	today,
	onDayClick,
}) {
	const firstDay = new Date(year, month, 1)
	const lastDay = new Date(year, month + 1, 0)
	const startWeekday = firstDay.getDay()
	const daysInMonth = lastDay.getDate()

	const days = []

	for (let i = 0; i < startWeekday; i++) {
		days.push(null)
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day)
		days.push(date)
	}

	return (
		<div className='month-block' data-month={`${year}-${month}`}>
			<div className='month-header'>{getMonthName(firstDay)}</div>

			<div className='weekdays'>
				{[0, 1, 2, 3, 4, 5, 6].map(i => (
					<div key={i} className='weekday'>
						{getWeekdayShort(i)}
					</div>
				))}
			</div>

			<div className='days-grid'>
				{days.map((date, idx) => {
					if (!date) {
						return <DayCell key={`empty-${idx}`} />
					}

					const dateStr = formatDate(date)
					const override = overrides[dateStr]
					const defaultType = getShiftType(date, startDate, startShiftType)
					const type = override?.type || defaultType
					const hasNote = override?.note && override.note.length > 0
					const isToday = isSameDay(date, today)

					return (
						<DayCell
							key={dateStr}
							date={date}
							type={type}
							hasNote={hasNote}
							isToday={isToday}
							onClick={() => onDayClick(date, defaultType, override)}
						/>
					)
				})}
			</div>
		</div>
	)
}
