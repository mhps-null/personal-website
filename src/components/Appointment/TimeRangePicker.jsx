import { useState, useMemo, useRef } from "react";

// Helper: Convert "HH:MM" to minutes from midnight
const timeToMinutes = (timeStr) => {
  if (!timeStr || !timeStr.includes(":")) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

// Format duration into readable text
const formatDuration = (startStr, endStr) => {
  const start = timeToMinutes(startStr);
  const end = timeToMinutes(endStr);
  const diff = end - start;

  if (diff <= 0) return "Invalid duration";

  const hours = Math.floor(diff / 60);
  const mins = diff % 60;

  if (hours > 0 && mins > 0) return `${hours} hr ${mins} min (${diff} mins)`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} (${diff} mins)`;
  return `${mins} minutes`;
};

/**
 * NumericTimeInput: Strictly allows XX:XX with only numbers (0-9)
 * and an uneditable, static colon ":" separator.
 */
function NumericTimeInput({ value, onChange }) {
  const parts = (value || "13:00").split(":");
  const hh = parts[0] ?? "13";
  const mm = parts[1] ?? "00";

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  const handleHoursChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) {
      val = val.slice(-2);
    }
    if (val !== "" && Number(val) > 23) {
      val = "23";
    }
    onChange(`${val}:${mm}`);

    if (val.length === 2) {
      setTimeout(() => {
        minutesRef.current?.focus();
        minutesRef.current?.select();
      }, 0);
    }
  };

  const handleHoursBlur = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val === "") val = "09";
    else if (val.length === 1) val = `0${val}`;
    else if (Number(val) > 23) val = "23";
    onChange(`${val}:${mm}`);
  };

  const handleMinutesChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) {
      val = val.slice(-2);
    }
    if (val !== "" && Number(val) > 59) {
      val = "59";
    }
    onChange(`${hh}:${val}`);
  };

  const handleMinutesBlur = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val === "") val = "00";
    else if (val.length === 1) val = `0${val}`;
    else if (Number(val) > 59) val = "59";
    onChange(`${hh}:${val}`);
  };

  const handleMinutesKeyDown = (e) => {
    if (e.key === "Backspace" && (mm === "" || mm === "00")) {
      hoursRef.current?.focus();
      hoursRef.current?.select();
    }
  };

  return (
    <div className="inline-flex items-center justify-center">
      {/* Box 1: Hours Input */}
      <input
        ref={hoursRef}
        type="text"
        inputMode="numeric"
        maxLength={2}
        value={hh}
        onChange={handleHoursChange}
        onBlur={handleHoursBlur}
        onFocus={(e) => e.target.select()}
        placeholder="HH"
        className="w-10 xs:w-12 sm:w-14 md:w-16 h-9 sm:h-11 text-center font-mono text-sm sm:text-base md:text-lg font-bold rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-red-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-red-500/20 outline-none shadow-sm transition-all"
      />

      {/* Static Colon separator centered */}
      <span className="w-3 sm:w-5 text-center text-base sm:text-xl font-bold font-mono text-slate-400 dark:text-slate-500 select-none">
        :
      </span>

      {/* Box 2: Minutes Input */}
      <input
        ref={minutesRef}
        type="text"
        inputMode="numeric"
        maxLength={2}
        value={mm}
        onChange={handleMinutesChange}
        onBlur={handleMinutesBlur}
        onFocus={(e) => e.target.select()}
        onKeyDown={handleMinutesKeyDown}
        placeholder="MM"
        className="w-10 xs:w-12 sm:w-14 md:w-16 h-9 sm:h-11 text-center font-mono text-sm sm:text-base md:text-lg font-bold rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-red-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-red-500/20 outline-none shadow-sm transition-all"
      />

      {/* Static WIB positioned inline */}
      <span className="text-[10px] sm:text-xs font-semibold font-mono text-slate-400 dark:text-slate-500 select-none ml-1 sm:ml-2">
        WIB
      </span>
    </div>
  );
}

// Helper: Get current WIB date string (YYYY-MM-DD) and current WIB minutes from midnight
const getWibNow = () => {
  const now = new Date();
  const dateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const timeStr = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const [h, m] = timeStr.split(":").map(Number);
  return {
    dateStr,
    timeStr,
    nowMinutes: h * 60 + m,
  };
};

// Calculate initial slot based on date & current time
const getInitialSlot = (date) => {
  const { dateStr, nowMinutes } = getWibNow();
  if (date === dateStr) {
    // If today: pick next available 30-min block with 15m advance buffer
    const nextStart = Math.max(7 * 60, Math.ceil((nowMinutes + 15) / 30) * 30);
    if (nextStart < 20 * 60) {
      const startH = String(Math.floor(nextStart / 60)).padStart(2, "0");
      const startM = String(nextStart % 60).padStart(2, "0");
      const endVal = nextStart + 60;
      const endH = String(Math.floor(endVal / 60)).padStart(2, "0");
      const endM = String(endVal % 60).padStart(2, "0");
      return { start: `${startH}:${startM}`, end: `${endH}:${endM}` };
    }
  }
  // Default for future dates
  return { start: "10:00", end: "11:00" };
};

export default function TimeRangePicker({
  selectedDate,
  busySlots = [],
  onConfirmRange,
}) {
  // Working Day Window: 07:00 to 21:00
  const dayStartMinutes = 7 * 60; // 07:00
  const dayEndMinutes = 21 * 60; // 21:00

  // Smart default selection based on current date & time
  const [startTime, setStartTime] = useState(() => getInitialSlot(selectedDate).start);
  const [endTime, setEndTime] = useState(() => getInitialSlot(selectedDate).end);

  // Check if range conflicts with any busy slots, operating boundaries (07:00 - 21:00), or past times
  const conflict = useMemo(() => {
    const { dateStr, nowMinutes } = getWibNow();
    const startMin = timeToMinutes(startTime);
    const endMin = timeToMinutes(endTime);

    // 1. Anti-Past Date Check
    if (selectedDate < dateStr) {
      return "The selected date has already passed. Please choose a future date";
    }

    // 2. Anti-Past Time Check for Today
    if (selectedDate === dateStr) {
      if (nowMinutes >= dayEndMinutes - 15) {
        return "Operating hours for today have ended (07:00 – 21:00 WIB). Please select another date";
      }
      if (startMin < nowMinutes) {
        return `Start time (${startTime} WIB) has already passed`;
      }
    }

    // 3. Operating boundaries
    if (startMin < dayStartMinutes) {
      return "Start time cannot be earlier than 07:00 WIB";
    }

    if (endMin > dayEndMinutes) {
      return "End time cannot be later than 21:00 WIB";
    }

    if (endMin <= startMin) {
      return "End time must be after start time";
    }

    if (endMin - startMin < 15) {
      return "Minimum appointment duration is 15 minutes";
    }

    if (endMin - startMin > 240) {
      return "Maximum appointment duration is 4 hours";
    }

    // 4. Overlap with Google Calendar busy slots
    for (const slot of busySlots) {
      const slotStart = timeToMinutes(slot.start);
      const slotEnd = timeToMinutes(slot.end);

      // Overlap condition
      if (startMin < slotEnd && endMin > slotStart) {
        return `Overlaps with busy schedule (${slot.start} – ${slot.end} WIB)`;
      }
    }

    return null;
  }, [selectedDate, startTime, endTime, busySlots, dayStartMinutes, dayEndMinutes]);

  // Timeline representation percentage
  const totalDayMins = dayEndMinutes - dayStartMinutes;
  const getTimelinePercent = (timeStr) => {
    const m = timeToMinutes(timeStr);
    const clamped = Math.max(dayStartMinutes, Math.min(dayEndMinutes, m));
    return ((clamped - dayStartMinutes) / totalDayMins) * 100;
  };

  const selectedStartPercent = getTimelinePercent(startTime);
  const selectedWidthPercent =
    getTimelinePercent(endTime) - selectedStartPercent;

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span>Schedule for {selectedDate}</span>
            <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:bg-red-500/15 dark:text-red-400 border border-blue-500/20 dark:border-red-500/30">
              WIB (GMT+7)
            </span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose your preferred start and end time.
          </p>
        </div>

        {/* Selected Duration Badge */}
        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center bg-slate-50 dark:bg-slate-800/40 sm:bg-transparent sm:dark:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
          <div className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">Total Duration</div>
          <div className="text-xs sm:text-sm font-bold text-blue-600 dark:text-red-400">
            {formatDuration(startTime, endTime)}
          </div>
        </div>
      </div>

      {/* Visual Day Timeline Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
          <span>07:00</span>
          <span>10:30</span>
          <span>14:00</span>
          <span>17:30</span>
          <span>21:00</span>
        </div>

        <div className="relative h-6 sm:h-7 w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-inner">
          {/* Busy Slots */}
          {busySlots.map((slot, idx) => {
            const left = getTimelinePercent(slot.start);
            const width = getTimelinePercent(slot.end) - left;
            return (
              <div
                key={idx}
                style={{ left: `${left}%`, width: `${width}%` }}
                className="absolute top-0 bottom-0 bg-red-500/20 dark:bg-red-500/30 border-x border-red-500/40 flex items-center justify-center text-[10px] text-red-500 font-semibold"
                title={`Busy: ${slot.start} - ${slot.end}`}
              >
                <span className="hidden sm:inline">Busy</span>
              </div>
            );
          })}

          {/* User's Selected Time Range (Highlighted, clean without text label) */}
          <div
            style={{
              left: `${selectedStartPercent}%`,
              width: `${Math.max(2, selectedWidthPercent)}%`,
            }}
            className={`absolute top-0 bottom-0 rounded-lg transition-all duration-300 flex items-center justify-center ${
              conflict
                ? "bg-red-500/50 border-2 border-red-500 animate-pulse"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-red-600 dark:to-rose-600 shadow-md shadow-blue-500/30 dark:shadow-red-500/40 border border-blue-400 dark:border-red-400"
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-blue-600 dark:bg-red-500" />
            <span>Your Selection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-red-500/30 border border-red-500/50" />
            <span>Busy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-slate-200 dark:bg-slate-700" />
            <span>Available</span>
          </div>
        </div>
      </div>

      {/* Manual Numeric Time Inputs */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-2">
        {/* Start Time Numeric Input */}
        <div className="flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 dark:text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Time
          </label>
          <NumericTimeInput value={startTime} onChange={setStartTime} />
        </div>

        {/* End Time Numeric Input */}
        <div className="flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 dark:text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            End Time
          </label>
          <NumericTimeInput value={endTime} onChange={setEndTime} />
        </div>
      </div>

      {/* Conflict Validation / Status */}
      {conflict ? (
        <div className="p-3 sm:p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <span className="font-bold">Invalid Selection:</span> {conflict}. Please adjust your time.
          </div>
        </div>
      ) : (
        <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50/50 dark:bg-red-950/20 border border-blue-200/80 dark:border-red-900/50 text-xs text-blue-700 dark:text-red-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600 dark:text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>
              <strong className="text-blue-800 dark:text-red-200">Available!</strong> {startTime} – {endTime} WIB
            </span>
          </div>

          <button
            type="button"
            onClick={() => onConfirmRange({ startTime, endTime, duration: formatDuration(startTime, endTime) })}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 dark:bg-red-500 dark:hover:bg-red-600 active:scale-95 text-white font-medium rounded-xl shadow-md hover:glow-indigo dark:hover:glow-red transition-all text-xs whitespace-nowrap text-center flex items-center justify-center"
          >
            Continue to Book &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
