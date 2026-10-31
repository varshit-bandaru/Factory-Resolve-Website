"use client";
import { useEffect, useRef } from "react";
export default function DemoBookingModal({ contactEmail, onClose }) {
  const dialogRef = useRef(null);
  const bookingLinkRef = useRef(null);
  const subject = encodeURIComponent("Book a demo — Factory Resolve");
  const bookingLink = `mailto:${contactEmail}?subject=${subject}`;
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    bookingLinkRef.current.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    const { left, right, top, bottom } =
      event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < left ||
      event.clientX > right ||
      event.clientY < top ||
      event.clientY > bottom
    ) {
      onClose();
    }
  }
  return (
    <dialog
      ref={dialogRef}
      className="contact-modal demo-booking-dialog"
      aria-labelledby="demo-booking-title"
      aria-describedby="demo-booking-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
    >
      <div className="modal-head">
        <div>
          <p className="eyebrow">
            <span></span> See Factory Resolve in action
          </p>
          <h2 id="demo-booking-title">Book a demo.</h2>
        </div>
        <button
          className="modal-close"
          type="button"
          aria-label="Close demo booking"
          onClick={onClose}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <p id="demo-booking-description" className="demo-booking-copy">
        Explore how your team can capture, route, and resolve factory work. Get
        in touch to arrange a walkthrough.
      </p>
      <div className="demo-contact-card">
        <span className="demo-contact-avatar" aria-hidden="true">
          BV
        </span>
        <div className="demo-contact-details">
          <h3>B.Varshit</h3>
          <p>Founder, Factory Resolve</p>
          <address>
            <a ref={bookingLinkRef} href={bookingLink}>
              {contactEmail}
            </a>
          </address>
        </div>
      </div>
      <p className="demo-booking-copy">
        Email us with your company and preferred availability, including your
        time zone. We’ll reply to arrange your demo.
      </p>
    </dialog>
  );
}


