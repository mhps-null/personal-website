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
    <div className="relative inline-flex items-center justify-center">
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
        className="w-14 sm:w-16 h-11 text-center font-mono text-lg font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-red-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-red-500/20 outline-none shadow-sm transition-all"
      />

      {/* Static Colon separator centered */}
      <span className="w-6 text-center text-xl font-bold font-mono text-slate-400 dark:text-slate-500 select-none">
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
        className="w-14 sm:w-16 h-11 text-center font-mono text-lg font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-red-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-red-500/20 outline-none shadow-sm transition-all"
      />

      {/* Static WIB positioned to the right without shifting the colon center */}
      <span className="absolute left-[calc(100%+0.5rem)] text-xs sm:text-sm font-semibold font-mono text-slate-400 dark:text-slate-500 select-none whitespace-nowrap">
        WIB
      </span>
    </div>
  );
}

export default function TimeRangePicker({
  selectedDate,
  busySlots = [],
  onConfirmRange,
}) {
  // Working Day Window: 07:00 to 21:00
  const dayStartMinutes = 7 * 60; // 07:00
  const dayEndMinutes = 21 * 60; // 21:00

  // Default selection: 13:00 to 14:00 (1 hour)
  const [startTime, setStartTime] = useState("13:00");
  const [endTime, setEndTime] = useState("14:00");

  // Check if range conflicts with any busy slots
  const conflict = useMemo(() => {
    const startMin = timeToMinutes(startTime);
    const endMin = timeToMinutes(endTime);

    if (endMin <= startMin) {
      return "End time must be after start time";
    }

    for (const slot of busySlots) {
      const slotStart = timeToMinutes(slot.start);
      const slotEnd = timeToMinutes(slot.end);

      // Overlap condition
      if (startMin < slotEnd && endMin > slotStart) {
        return `Overlaps with busy schedule (${slot.start} - ${slot.end})`;
      }
    }

    return null;
  }, [startTime, endTime, busySlots]);

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
    <div className="w-full space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Schedule for {selectedDate}
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:bg-red-500/15 dark:text-red-400 border border-blue-500/20 dark:border-red-500/30">
              WIB (GMT+7)
            </span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose your preferred start and end time.
          </p>
        </div>

        {/* Selected Duration Badge */}
        <div className="text-right">
          <div className="text-xs font-semibold text-slate-400">Total Duration</div>
          <div className="text-sm font-bold text-blue-600 dark:text-red-400">
            {formatDuration(startTime, endTime)}
          </div>
        </div>
      </div>

      {/* Visual Day Timeline Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>07:00</span>
          <span>10:30</span>
          <span>14:00</span>
          <span>17:30</span>
          <span>21:00</span>
        </div>

        <div className="relative h-7 w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-inner">
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

        <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-600 dark:bg-red-500" />
            <span>Your Selection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50" />
            <span>Busy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" />
            <span>Available</span>
          </div>
        </div>
      </div>

      {/* Manual Numeric Time Inputs */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        {/* Start Time Numeric Input */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <label className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-blue-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Time
          </label>
          <NumericTimeInput value={startTime} onChange={setStartTime} />
        </div>

        {/* End Time Numeric Input */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <label className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-indigo-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            End Time
          </label>
          <NumericTimeInput value={endTime} onChange={setEndTime} />
        </div>
      </div>

      {/* Conflict Validation / Status */}
      {conflict ? (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <span className="font-bold">Schedule Conflict:</span> {conflict}. Please adjust your start or end time.
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-red-950/20 border border-blue-200/80 dark:border-red-900/50 text-xs text-blue-700 dark:text-red-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>
              <strong className="text-blue-800 dark:text-red-200">Available!</strong> {startTime} – {endTime} WIB
            </span>
          </div>

          <button
            type="button"
            onClick={() => onConfirmRange({ startTime, endTime, duration: formatDuration(startTime, endTime) })}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-red-500 dark:hover:bg-red-600 active:scale-95 text-white font-medium rounded-xl shadow-md hover:glow-indigo dark:hover:glow-red transition-all text-xs whitespace-nowrap"
          >
            Continue to Book &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
