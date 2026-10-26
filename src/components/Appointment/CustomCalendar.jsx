import { useState } from "react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CustomCalendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // First day of current month (0-6)
  const firstDay = new Date(year, month, 1).getDay();
  // Total days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const formatDateStr = (y, m, d) => {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  const daysGrid = [];
  // Empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    daysGrid.push({ type: "empty", key: `empty-${i}` });
  }

  // Days in month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    dateObj.setHours(0, 0, 0, 0);

    const dateStr = formatDateStr(year, month, day);
    const isPast = dateObj < today;
    const isToday = dateObj.getTime() === today.getTime();
    const isSelected = selectedDate === dateStr;

    daysGrid.push({
      type: "day",
      dayNumber: day,
      dateStr,
      isPast,
      isToday,
      isSelected,
      key: `day-${day}`,
    });
  }

  return (
    <div className="w-full select-none">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1 sm:px-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {MONTH_NAMES[month]} {year}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            Select a date to view available time slots
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Next month"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">
        {DAY_NAMES.map((name) => (
          <div key={name} className="py-1">
            {name}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {daysGrid.map((item) => {
          if (item.type === "empty") {
            return <div key={item.key} className="h-9 sm:h-10 md:h-11" />;
          }

          const { dayNumber, dateStr, isPast, isToday, isSelected } = item;

          return (
            <button
              key={item.key}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(dateStr)}
              className={`relative h-9 sm:h-10 md:h-11 rounded-lg sm:rounded-xl flex flex-col items-center justify-center font-medium text-xs sm:text-sm transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 dark:bg-red-500 text-white font-bold shadow-lg shadow-blue-500/30 dark:shadow-red-500/40 scale-105 z-10"
                  : isPast
                  ? "text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 border border-transparent"
              }`}
            >
              <span>{dayNumber}</span>

              {/* Today dot indicator */}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 sm:bottom-1.5 w-1 h-1 rounded-full bg-blue-600 dark:bg-red-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
