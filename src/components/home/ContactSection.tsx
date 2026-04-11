import type { FormEventHandler } from 'react'
import { siteConfig } from '../../config/site'
import { LinkedInIcon, MailIcon, WhatsAppIcon } from '../icons'
import { SafeImage } from '../common/SafeImage'
import { CurvedLoop } from './CurvedLoop'
import { SectionLabel } from './SectionLabel'

type ContactSectionProps = {
  messageSent: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function ContactSection({ messageSent, onSubmit }: ContactSectionProps) {
  return (
    <section id="contact" className="home-section-home section-divider-home">
      <SectionLabel>Contact</SectionLabel>
      <div className="contact-grid-home">
        <div className="reveal">
          <h2 className="contact-title-home">Let&apos;s work together.</h2>
          <p className="contact-copy-home">
            Whether you&apos;re looking for a UX designer for your team, want to discuss a
            project, or just want to connect — I&apos;d love to hear from you.
          </p>

          <div className="contact-cards-home">
            <a href={`mailto:${siteConfig.contactEmail}`} className="contact-card-home">
              <div className="contact-card-head-home">
                <MailIcon />
                <span>Email</span>
              </div>
              <div className="contact-card-value-home contact-card-value-home-fit">{siteConfig.contactEmail}</div>
            </a>

            <a
              href="https://www.linkedin.com/in/xuchen-qi-408513207/?locale=en"
              target="_blank"
              rel="noreferrer"
              className="contact-card-home"
            >
              <div className="contact-card-head-home">
                <LinkedInIcon />
                <span>LinkedIn</span>
              </div>
              <div className="contact-card-value-home contact-card-value-home-compact">Open Profile</div>
            </a>

            <a
              href="https://wa.me/447421726561"
              target="_blank"
              rel="noreferrer"
              className="contact-card-home"
            >
              <div className="contact-card-head-home">
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </div>
              <div className="contact-card-value-home contact-card-value-home-fit">+44 7421 726561</div>
            </a>

            <div className="contact-card-home contact-card-home-qr">
              <div className="contact-card-qr-home">
                <SafeImage
                  src="/assets/wechat-qr.jpg"
                  alt="WeChat QR"
                  className="h-full w-full object-contain"
                  fallbackClassName="flex h-full w-full items-center justify-center bg-black/10 text-center text-xs uppercase tracking-[0.12em] text-site-secondary"
                  fallbackLabel="WeChat QR unavailable"
                />
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form-home reveal" onSubmit={onSubmit}>
          <div className="form-group-home">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" placeholder="Your name" required />
          </div>
          <div className="form-group-home">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group-home">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me about your project or opportunity…"
              required
            />
          </div>
          <button type="submit" className="contact-submit-home" disabled={messageSent}>
            {messageSent ? 'Draft Opened ✓' : 'Send Message'}
          </button>
        </form>

        <CurvedLoop
          marqueeText="· Chyi · Creative · Product Designer · UX Engineer · Vintage Collector · Photographer"
          speed={1.2}
          curveAmount={0}
          direction="right"
          interactive={false}
          className="home-loop-text-home"
        />
      </div>
    </section>
  )
}
