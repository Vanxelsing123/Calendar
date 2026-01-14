import { useEffect, useMemo, useState } from 'react'
import { DayModal } from './components/DayModal'
import { Legend } from './components/Legend'
import { MonthBlock } from './components/MonthBlock'
import { SetupScreen } from './components/SetupScreen'
import { SideMenu } from './components/SideMenu'
import { formatDate, parseDate } from './utils/dateUtils'
import { storage } from './utils/storage'

export function App() {
	const [configuredShiftNumber, setConfiguredShiftNumber] = useState(null)
	const [configuredStartDate, setConfiguredStartDate] = useState(null)
	const [configuredStartType, setConfiguredStartType] = useState(null)
	const [currentViewingShift, setCurrentViewingShift] = useState('1')
	const [overrides, setOverrides] = useState({})
	const [modalData, setModalData] = useState(null)
	const [menuOpen, setMenuOpen] = useState(false)
	const today = useMemo(() => new Date(), [])

	const currentMonth = today.getMonth()
	const currentYear = today.getFullYear()

	useEffect(() => {
		const savedDate = storage.getStartDate()
		// ... остальной код
	}, [])

	useEffect(() => {
		if (configuredStartDate) {
			setTimeout(() => {
				const container = document.querySelector('.calendar-container')
				const currentMonthBlock = document.querySelector(
					`[data-month="${currentYear}-${currentMonth}"]`
				)
				if (container && currentMonthBlock) {
					const offset = currentMonthBlock.offsetTop - container.offsetTop
					container.scrollTop = offset
				}
			}, 100)
		}
	}, [configuredStartDate, currentYear, currentMonth])

	useEffect(() => {
		const savedDate = storage.getStartDate()
		const savedNumber = storage.getStartShiftNumber()
		const savedType = storage.getStartShiftType()
		const savedCurrent = storage.getCurrentShift()

		if (savedDate && savedNumber && savedType) {
			setConfiguredShiftNumber(savedNumber)
			setConfiguredStartDate(parseDate(savedDate))
			setConfiguredStartType(savedType)
			setCurrentViewingShift(savedCurrent)
		}
		setOverrides(storage.getOverrides())
	}, [])

	useEffect(() => {
		if (configuredStartDate) {
			const container = document.querySelector('.calendar-container')
			const currentMonthBlock = document.querySelector(
				`[data-month="${currentYear}-${currentMonth}"]`
			)
			if (container && currentMonthBlock) {
				const offset = currentMonthBlock.offsetTop - container.offsetTop
				container.scrollTop = offset
			}
		}
	}, [configuredStartDate, currentYear, currentMonth]) // Добавил зависимости

	const handleSetupComplete = (dateStr, shiftNumber, shiftType) => {
		const date = parseDate(dateStr)

		// Корректируем дату начала в зависимости от выбранного типа
		// Цикл: день(0) → ночь(1) → отсыпной(2) → выходной(3)
		// Нужно найти день когда начался цикл (день)
		const cycleOffset = {
			'day-shift': 0,
			'night-shift': -1,
			'rest-day': -2,
			'day-off': -3,
		}

		const adjustedDate = new Date(date)
		adjustedDate.setDate(adjustedDate.getDate() + cycleOffset[shiftType])

		setConfiguredShiftNumber(shiftNumber)
		setConfiguredStartDate(adjustedDate)
		setConfiguredStartType('day-shift') // Всегда начинаем с дня после корректировки
		setCurrentViewingShift(shiftNumber)

		storage.setStartDate(formatDate(adjustedDate))
		storage.setStartShiftNumber(shiftNumber)
		storage.setStartShiftType('day-shift')
		storage.setCurrentShift(shiftNumber)
	}

	const handleShiftChange = shiftNumber => {
		setCurrentViewingShift(shiftNumber)
		storage.setCurrentShift(shiftNumber)
	}

	const handleDayClick = (date, defaultType, override) => {
		setModalData({ date, defaultType, override })
	}

	const handleSaveOverride = (dateStr, data) => {
		const newOverrides = { ...overrides }
		if (data) {
			newOverrides[dateStr] = data
		} else {
			delete newOverrides[dateStr]
		}
		setOverrides(newOverrides)
		storage.setOverrides(newOverrides)
	}

	const handleReset = () => {
		if (confirm('Сбросить все настройки и начать заново?')) {
			storage.clear()
			setConfiguredShiftNumber(null)
			setConfiguredStartDate(null)
			setConfiguredStartType(null)
			setCurrentViewingShift('1')
			setOverrides({})
		}
	}

	if (!configuredStartDate) {
		return (
			<>
				<div className='header'>
					<h1>График смен</h1>
				</div>
				<SetupScreen onComplete={handleSetupComplete} />
			</>
		)
	}

	// Рассчитываем стартовую дату для текущей просматриваемой смены
	// Каждая смена смещена на 1 день относительно другой
	const shiftOffset = parseInt(currentViewingShift) - parseInt(configuredShiftNumber)
	const viewingStartDate = new Date(configuredStartDate)
	viewingStartDate.setDate(viewingStartDate.getDate() + shiftOffset)

	// Генерация месяцев
	const months = []

	for (let offset = -6; offset <= 6; offset++) {
		const date = new Date(currentYear, currentMonth + offset, 1)
		months.push({ year: date.getFullYear(), month: date.getMonth() })
	}

	// Данные для меню смен
	const shifts = [
		{ number: '1', info: 'Бригада 1' },
		{ number: '2', info: 'Бригада 2' },
		{ number: '3', info: 'Бригада 3' },
		{ number: '4', info: 'Бригада 4' },
	]

	return (
		<>
			<div className='header'>
				<div className='header-left'>
					<button className='burger-button' onClick={() => setMenuOpen(true)}>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<h1>График смен</h1>
				</div>
				<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
					<span className='current-shift-badge'>Смена {currentViewingShift}</span>
					<button onClick={handleReset}>Сброс</button>
				</div>
			</div>

			<SideMenu
				isOpen={menuOpen}
				onClose={() => setMenuOpen(false)}
				currentShift={currentViewingShift}
				onShiftChange={handleShiftChange}
				shifts={shifts}
			/>

			<Legend />
			<div className='calendar-container'>
				{months.map(({ year, month }) => (
					<MonthBlock
						key={`${year}-${month}`}
						year={year}
						month={month}
						startDate={viewingStartDate}
						startShiftType={configuredStartType}
						overrides={overrides}
						today={today}
						onDayClick={handleDayClick}
					/>
				))}
			</div>

			{modalData && (
				<DayModal
					date={modalData.date}
					defaultType={modalData.defaultType}
					override={modalData.override}
					onSave={handleSaveOverride}
					onClose={() => setModalData(null)}
				/>
			)}
		</>
	)
}
