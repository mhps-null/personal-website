import { useState, useEffect } from "react";
import CustomCalendar from "../components/Appointment/CustomCalendar";
import TimeRangePicker from "../components/Appointment/TimeRangePicker";
import BookingModal from "../components/Appointment/BookingModal";

export default function ScheduleSection() {
  // Format today's date as YYYY-MM-DD
  const getTodayStr = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [busySlots, setBusySlots] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch busy slots from Cloudflare Worker for selectedDate
  useEffect(() => {
    let isMounted = true;

    async function fetchAvailability() {
      try {
        const res = await fetch(
          `https://contact-form-worker.mhps-null.workers.dev/api/calendar/availability?date=${selectedDate}`
        );
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.busySlots) {
            setBusySlots(data.busySlots);
            return;
          }
        }
      } catch {
        // Fallback default sample schedule if worker is offline
      }

      // Default realistic sample for demo: Haris has class/practicum between 10:00-11:30 and 15:30-17:00
      if (isMounted) {
        setBusySlots([
          { start: "10:00", end: "11:30" },
          { start: "15:30", end: "17:00" },
        ]);
      }
    }

    fetchAvailability();
    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const handleConfirmRange = ({ startTime, endTime, duration }) => {
    setActiveBooking({
      date: selectedDate,
      startTime,
      endTime,
      duration,
    });
    setIsModalOpen(true);
  };

  return (
    <section
      id="schedule"
      className="w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="w-full max-w-7xl mt-8 mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Schedule an Appointment
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Pick a date and freely select your preferred time. Synced in real-time with my calendar availability.
          </p>
        </div>

        {/* Bespoke Calendar & Time Selection Card */}
        <div className="w-full max-w-5xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8 transition-colors duration-300 transform-gpu">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Calendar (5 cols) */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-6">
              <CustomCalendar
                selectedDate={selectedDate}
                onSelectDate={(date) => setSelectedDate(date)}
              />
            </div>

            {/* Right Column: Visual Timeline & Time Range Picker (7 cols) */}
            <div className="lg:col-span-7">
              <TimeRangePicker
                selectedDate={selectedDate}
                busySlots={busySlots}
                onConfirmRange={handleConfirmRange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingDetails={activeBooking}
      />
    </section>
  );
}
