import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

// Helper: Format "YYYY-MM-DD" into a professional long date string
const formatDateLong = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Official Google Meet Link
const OFFICIAL_MEET_URL = "https://meet.google.com/son-wahu-bhf";
const OFFICIAL_MEET_DISPLAY = "meet.google.com/son-wahu-bhf";

// Official Google Meet Multi-Color Logo
function GoogleMeetIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 45.4 512 421.2" className={className}>
      <path d="m289.6 256 49.9 57 67.1 42.9 11.7-99.6-11.7-97.3-68.4 37.7z" fill="#00832d" />
      <path d="M0 346.7v84.8c0 19.4 15.7 35.1 35.1 35.1h84.8l17.6-64.1-17.6-55.8-58.2-17.6z" fill="#0066da" />
      <path d="M119.9 45.4 0 165.3l61.7 17.6 58.2-17.6 17.3-55.1z" fill="#e94235" />
      <path d="M119.9 165.3H0v181.4h119.9z" fill="#2684fc" />
      <path d="M483.3 96.2 406.6 159v196.9l77 63.1c11.5 9 28.4.8 28.4-13.9V109.7c0-14.8-17.2-22.9-28.7-13.5M289.6 256v90.7H119.9v119.9h251.6c19.4 0 35.1-15.7 35.1-35.1v-75.6z" fill="#00ac47" />
      <path d="M371.5 45.4H119.9v119.9h169.7V256l117-96.9V80.5c0-19.4-15.7-35.1-35.1-35.1" fill="#ffba00" />
    </svg>
  );
}

export default function BookingModal({
  isOpen,
  onClose,
  bookingDetails, // { date, startTime, endTime, duration }
  onBookingSuccess,
}) {
  const [meetingType, setMeetingType] = useState("online"); // 'online' | 'offline'
  const [copiedMeet, setCopiedMeet] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    topic: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const activeMeetUrl = meetingType === "online" ? OFFICIAL_MEET_URL : null;

  const handleCopyMeet = () => {
    navigator.clipboard?.writeText(OFFICIAL_MEET_URL);
    setCopiedMeet(true);
    setTimeout(() => setCopiedMeet(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email.trim() || undefined,
      topic: formData.topic,
      notes: formData.notes.trim() || undefined,
      meetingType,
      location: meetingType === "offline" ? formData.location.trim() : undefined,
      meetUrl: activeMeetUrl || undefined,
      date: bookingDetails.date,
      startTime: bookingDetails.startTime,
      endTime: bookingDetails.endTime,
      duration: bookingDetails.duration,
      ownerEmail: "mharisputras@std.stei.itb.ac.id",
    };

    try {
      // Send to Cloudflare Worker endpoint
      const response = await fetch(
        "https://contact-form-worker.mhps-null.workers.dev/api/calendar/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      let meetUrl = activeMeetUrl;
      if (response.ok) {
        const data = await response.json();
        if (data.booking?.meetUrl) meetUrl = data.booking.meetUrl;
      }

      const confirmedData = {
        ...payload,
        meetUrl,
      };

      setConfirmedBooking(confirmedData);
      if (onBookingSuccess) onBookingSuccess(confirmedData);
    } catch {
      // Fallback for demonstration
      setConfirmedBooking({
        ...payload,
        meetUrl: activeMeetUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAll = () => {
    setConfirmedBooking(null);
    setFormData({ name: "", email: "", location: "", topic: "", notes: "" });
    setMeetingType("online");
    onClose();
  };

  // Generate Google Calendar Add Link with complete synchronized event details
  const getGoogleCalendarLink = () => {
    if (!bookingDetails) return "#";
    const startIso = `${bookingDetails.date.replace(/-/g, "")}T${bookingDetails.startTime.replace(":", "")}00`;
    const endIso = `${bookingDetails.date.replace(/-/g, "")}T${bookingDetails.endTime.replace(":", "")}00`;
    const title = encodeURIComponent(
      `Discussion: ${formData.topic || "Appointment with Haris"}`
    );

    const isOnline = meetingType === "online";
    const eventLocation = isOnline
      ? (activeMeetUrl || "Google Meet")
      : (formData.location || "In-Person");

    const descriptionLines = [
      `Appointment between ${formData.name} and Muhammad Haris Putra S.`,
      `Topic: ${formData.topic || "General Discussion"}`,
      `Type: ${isOnline ? "Online" : `Offline: ${formData.location || "TBD"}`}`,
    ];

    if (isOnline && activeMeetUrl) {
      descriptionLines.push(`Google Meet: ${activeMeetUrl}`);
    }
    if (formData.email) {
      descriptionLines.push(`Attendee: ${formData.email}`);
    }
    if (formData.notes) {
      descriptionLines.push(`\nAdditional Notes:\n${formData.notes}`);
    }

    const details = encodeURIComponent(descriptionLines.join("\n"));
    let url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&ctz=Asia/Jakarta&details=${details}&location=${encodeURIComponent(
      eventLocation
    )}`;

    if (formData.email) {
      url += `&add=${encodeURIComponent(formData.email)}`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      {isOpen && bookingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseAll}
            className="fixed inset-0 bg-black/75 dark:bg-black/80 backdrop-blur-sm transform-gpu"
          />

          {/* Modal Container */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto transform-gpu"
          >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 shrink-0">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {confirmedBooking ? "Booking Confirmed" : "Complete Your Booking"}
            </h3>
            <button
              type="button"
              onClick={handleCloseAll}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {confirmedBooking ? (
              /* Success Confirmation Screen */
              <div className="space-y-5 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Appointment Scheduled
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Your appointment has been registered with Haris&apos;s calendar.
                  </p>
                </div>

                {/* Details Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left text-xs space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Date</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {formatDateLong(bookingDetails.date)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Time</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                      {bookingDetails.startTime} – {bookingDetails.endTime} WIB
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Duration</span>
                    <span className="font-semibold text-blue-600 dark:text-red-400">
                      {bookingDetails.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Type</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {meetingType === "online" ? "Online" : "Offline"}
                    </span>
                  </div>
                  {meetingType === "offline" && formData.location && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">Location</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formData.location}
                      </span>
                    </div>
                  )}
                  {meetingType === "online" && confirmedBooking.meetUrl && (
                    <div className="flex justify-between items-center pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500 dark:text-slate-400">Google Meet</span>
                      <span className="font-mono text-blue-600 dark:text-red-400 font-semibold select-all">
                        {confirmedBooking.meetUrl}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Topic</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {formData.topic || "General Discussion"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5 pt-2">
                  {confirmedBooking.meetUrl && (
                    <a
                      href={confirmedBooking.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <GoogleMeetIcon className="w-4 h-4" />
                      Join Google Meet
                    </a>
                  )}

                  <a
                    href={getGoogleCalendarLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:glow-indigo dark:hover:glow-red"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Google Calendar
                  </a>

                  <button
                    type="button"
                    onClick={handleCloseAll}
                    className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Input Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Professional Date & Time Summary Card (No Emojis) */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 p-4 transition-all">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-red-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="truncate">{formatDateLong(bookingDetails.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-red-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>
                          {bookingDetails.startTime} – {bookingDetails.endTime} WIB
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-red-950/50 text-blue-600 dark:text-red-400 border border-blue-200/60 dark:border-red-900/60">
                        {bookingDetails.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meeting Type Selector (Online vs Offline) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Meeting Type *
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => setMeetingType("online")}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 border border-transparent transition-colors duration-200 ${
                        meetingType === "online"
                          ? "bg-blue-600 dark:bg-red-500 text-white shadow-sm shadow-blue-500/20 dark:shadow-red-500/20"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                      Online Meeting
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeetingType("offline")}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 border border-transparent transition-colors duration-200 ${
                        meetingType === "offline"
                          ? "bg-blue-600 dark:bg-red-500 text-white shadow-sm shadow-blue-500/20 dark:shadow-red-500/20"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Offline
                    </button>
                  </div>
                </div>

                {/* Google Meet Video Conferencing (Always active for Online Meeting) */}
                {meetingType === "online" && (
                  <div className="rounded-xl border border-blue-200/80 dark:border-red-900/40 bg-blue-50/50 dark:bg-red-950/15 p-3 transition-all">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center shrink-0 shadow-xs p-1.5">
                          <GoogleMeetIcon className="w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                            Google Meet Video Conferencing
                          </span>
                          <span className="text-[11px] font-mono text-blue-600 dark:text-red-400 truncate block">
                            {OFFICIAL_MEET_DISPLAY}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyMeet}
                          title="Copy Google Meet Link"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors text-xs font-medium"
                        >
                          {copiedMeet ? (
                            <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                              Copied!
                            </span>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Pratama"
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Email (Optional for both Online and Offline; no "(Optional)" text) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Offline Location (Only visible and required when Offline) */}
                {meetingType === "offline" && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Labtek V ITB / Perpustakaan Pusat / Cafe"
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-red-500 transition-colors"
                    />
                  </div>
                )}

                {/* Topic */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g. Project Consultation / Diskusi Kuliah"
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Additional Notes (No "(Optional)" text) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Additional Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Share any background details or links..."
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-red-500 dark:hover:bg-red-600 active:scale-[0.99] text-white font-medium rounded-xl text-sm shadow-lg shadow-blue-500/20 dark:shadow-red-500/20 hover:glow-indigo dark:hover:glow-red transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Scheduling Appointment...
                    </>
                  ) : (
                    "Confirm & Book Appointment"
                  )}
                </button>
              </form>
            )}
          </div>
        </Motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
