Here is your **cleaned, production-ready Markdown** version.

- ✅ Removed excessive blank lines
- ✅ Tightened spacing
- ✅ Preserved full structure and content
- ✅ Maintained heading hierarchy
- ✅ Ready for GitHub, docs site, or version control

---

# D'Oasis Dashboard System - Comprehensive Feature Specification

## Client & Admin Dashboard Requirements (Industry Standard)

---

## Document Information

**Version:** 2.0
**Last Updated:** February 2026
**Product:** D'Oasis Counseling & Coaching Platform
**Status:** Feature Specification - Ready for Development

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Client Dashboard Features](#client-dashboard-features)
3. [Admin Dashboard Features](#admin-dashboard-features)
4. [Shared Features & Infrastructure](#shared-features--infrastructure)
5. [Data Architecture](#data-architecture)
6. [User Experience Guidelines](#user-experience-guidelines)
7. [Technical Requirements](#technical-requirements)
8. [Security & Compliance](#security--compliance)
9. [Analytics & Reporting](#analytics--reporting)
10. [Future Enhancements](#future-enhancements)

---

## System Overview

### Product Vision

A dual-dashboard system that provides clients with a calming, supportive "Sanctuary" for their healing journey while giving the practitioner a powerful "Sanctuary Control" hub for efficient practice management.

### Core Principles

1. **Calm First** - Reduce anxiety through clarity and simplicity
2. **Context-Aware** - Show the right information at the right time
3. **Progress-Oriented** - Celebrate growth and forward movement
4. **Efficient Operations** - Streamline admin work to focus on client care
5. **Mobile-Responsive** - Full functionality on all devices

---

## Client Dashboard Features

**Route:** `/dashboard`
**User Role:** Client
**Primary Goal:** Support, guide, and reduce anxiety

---

### 1. Personalized Welcome Section

**Status Bar**

- Personalized greeting
- Current date and time
- Weather widget (optional)
- Daily affirmation

**User Profile Summary**

- Profile photo (uploadable)
- Name and program
- "Days in journey" counter
- Edit profile link

**Additional**

- Mood check-in (1–5 scale + note)
- Streak indicator
- Milestone badges

---

### 2. Quick Stats Dashboard

**Current**

- Upcoming session
- Reflections count
- Current plan

**Enhanced**

- Sessions completed (progress bar)
- Days until next session
- Growth score
- Resources accessed
- Check-ins completed

**Visual**

- Card-based layout
- Color-coded status
- Hover details

---

### 3. Next Session Widget

**Includes**

- Date/time
- Type
- Zoom link
- Countdown timer
- Add to calendar
- Pre-session checklist
- Preparation prompts
- Tech check tools
- Duration
- Session number
- Join/reschedule/cancel actions

**Empty State**

- Schedule CTA
- Suggested times

---

### 4. Session History & Timeline

- Completed session list
- Shared summaries
- Personal notes
- Recordings
- Feedback status
- Visual milestone timeline
- Growth insights

---

### 5. Journal & Reflections

**Display**

- Preview
- Date
- Mood
- Word count
- Tags
- Search/filter

**Quick Entry**

- Prompt
- Voice-to-text
- Image upload
- Mood selector

**Features**

- Templates
- Prompt library
- Private toggle
- Share toggle
- Export PDF
- Archive

**Analytics**

- Theme tracking
- Writing frequency
- Mood trends
- Word cloud

---

### 6. Resources & Learning Center

- Assigned worksheets
- Books/articles
- Audio/video
- Bookmark/download
- Completion tracking

**Categories**

- Grief
- Faith
- Boundaries
- Relationships
- Growth

---

### 7. Goals & Progress

- Goal list
- 0–100% tracking
- Target dates
- Completion celebration
- Visual charts

---

### 8. Wellness Check-In

- Mood
- Energy
- Sleep
- Stress
- Trend graphs
- Practitioner share

---

### 9. Payments & Billing

- Plan summary
- Sessions remaining
- Next payment
- History
- Receipts
- Update payment method
- Promo codes
- Payment plans

---

### 10. Communication Hub

- Secure messaging
- Notifications
- Preferences (email/SMS/in-app)

---

### 11. Community & Support

- Restoration Circles
- Crisis resources
- FAQs
- Future peer support

---

### 12. Settings & Preferences

- Personal info
- Password
- Privacy
- Notifications
- Accessibility

---

### 13. Mobile Considerations

- Push notifications
- Offline journaling
- Quick check-in
- Biometric login
- Voice entries

---

# Admin Dashboard Features

**Route:** `/dashboard/admin`
**User Role:** Practitioner/Admin
**Primary Goal:** Efficient practice management

---

### 1. Admin Overview

- Today's sessions
- Tasks
- Unread messages
- Key metrics (clients, revenue, attendance, cancellations)

---

### 2. Sanctuary Schedule

- Month/week/day/agenda views
- Drag-drop rescheduling
- Availability rules
- Color-coded session types
- Google/Apple/Outlook sync
- Auto reminders

---

### 3. Soul Directory

- Client grid
- Filters
- Sorting
- Bulk actions
- Quick preview

---

### 4. Individual Client Profile

Tabs:

- Overview
- Sessions
- Notes
- Goals
- Resources
- Communication
- Billing
- Documents
- Activity log

Quick actions always visible.

---

### 5. Sanctuary Priorities

- Categorized tasks
- Recurring tasks
- Time tracking
- Templates

---

### 6. Analytics & Reporting

- Revenue
- Client retention
- Attendance
- Engagement
- Custom reports
- Financial summaries

---

### 7. Messaging System

- Inbox
- Templates
- Bulk messaging
- Automated sequences

---

### 8. Resource Library Management

- Upload
- Categorize
- Assign
- Analytics

---

### 9. Forms & Assessments

- Drag-drop builder
- Conditional logic
- Distribution
- Response analytics

---

### 10. Financial Management

- Revenue dashboard
- Invoicing
- Payment processing
- Expense tracking
- Integrations

---

### 11. Marketing & Growth

- Lead management
- Referral tracking
- Content calendar
- Email campaigns

---

### 12. Settings & Configuration

- Practice info
- Services
- Policies
- Booking rules
- Payment config
- User management
- Integrations
- Data/privacy

---

### 13. Help & Support

- Knowledge base
- Support requests
- Release notes

---

# Shared Features & Infrastructure

- Real-time updates
- Global search
- Notifications center
- Dark mode
- Keyboard shortcuts
- Export tools
- Audit log
- Mobile responsiveness
- PWA support

---

# Data Architecture

Supabase PostgreSQL schema with core tables:

- profiles
- sessions
- journals
- programs
- client_programs
- admin_todos
- resources
- client_resources
- messages
- goals
- check_ins
- payments
- notifications
- system_settings

Additional:

- milestones
- forms
- form_responses
- calendar_blocks
- tags
- analytics_events

Service layer includes:

- AppointmentService
- JournalService
- ProfileService
- ProgramService
- TaskService
- MessageService
- ResourceService
- NotificationService
- PaymentService
- AnalyticsService
- CheckInService

---

# Technical Stack

Frontend:

- Next.js 14+
- TailwindCSS
- Zustand
- React Query
- React Hook Form
- FullCalendar
- Recharts
- Tiptap
- Framer Motion

Backend:

- Supabase
- Zoom API
- Stripe
- Calendly
- Google Drive
- Google Calendar
- Dropbox
- SendGrid/Resend
- Twilio

Performance:

- FCP <1.5s
- TTI <3s
- LCP <2.5s

---

# Security & Compliance

- RBAC
- Supabase RLS
- TLS 1.3
- Encrypted storage
- SQL/XSS/CSRF protection
- Rate limiting
- HIPAA-ready configuration
- Data export & deletion rights

---

# Analytics & Reporting

Track:

- Acquisition
- Retention
- CLV
- Attendance
- Revenue
- Engagement
- Admin efficiency

---

# Future Enhancements

**Phase 2**

- AI journal insights
- Personalized recommendations
- Voice journaling
- Mobile app
- Predictive analytics

**Phase 3**

- AI chatbot
- Outcome prediction
- Marketplace
- Multi-language support
- Smart scheduling

---

# Implementation Roadmap

**Phase 1 (MVP)**
Core dashboards, scheduling, journals, tasks, authentication

**Phase 2**
Resources, messaging, analytics, integrations

**Phase 3**
Community, automation, optimization

---

# Conclusion

This system balances powerful practice management with calming, client-centered design — supporting both operational excellence and meaningful healing journeys.
