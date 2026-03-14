import React from 'react'
import {
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Mail, Phone, MapPin, Package
} from 'lucide-react'
import './Footer.css'

const COLS = {
  CATEGORIES: ['Apparel','Bags','Drinkware','Tech','Office','Travel','Gifts','Health & Wellness','Tradeshow'],
  SERVICES:   ['Order Rack','Decorating','Screen Imprinting','Embroidery','Laser Engraving','Color Printing','Stone Accessories','Digital Printing'],
  TOOLS:      ['Create Account','Online Status','Online Ordering','Customer Portal','Found a Rep','Customer Testimonials','About Us','Contact'],
  CONTACT:    [],
}

const PARTNERS = [
  { name: 'ASI',           abbr: 'ASI' },
  { name: 'PPAI',          abbr: 'PPAI' },
  { name: 'UPIC',          abbr: 'UPIC' },
  { name: 'Promo Standard',abbr: 'PROMO STD' },
  { name: 'PromoCode',     abbr: 'PPB CODE CONDUCT' },
]

const SOCIAL = [
  { Icon: Facebook,  label: 'Facebook'  },
  { Icon: Twitter,   label: 'Twitter'   },
  { Icon: Linkedin,  label: 'LinkedIn'  },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Youtube,   label: 'YouTube'   },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">

      {/* ── Partner logos bar — matches design exactly ── */}
      {/* <div className="footer__partners">
        <div className="wrap footer__partners-row">
          {PARTNERS.map(p => (
            <a key={p.name} href="#" className="footer__partner" aria-label={p.name}>
              <span className="footer__partner-inner">{p.abbr}</span>
            </a>
          ))}
        </div>
      </div> */}

      {/* ── Main 4-column grid ── */}
      <div className="footer__main">
        <div className="wrap footer__grid">

          {/* Categories */}
          <nav className="footer__col" aria-labelledby="fc-cats">
            <h3 className="footer__col-title" id="fc-cats">Categories</h3>
            <ul className="footer__links" role="list">
              {COLS.CATEGORIES.map(l => (
                <li key={l}><a href="#" className="footer__link">{l}</a></li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav className="footer__col" aria-labelledby="fc-svc">
            <h3 className="footer__col-title" id="fc-svc">Services</h3>
            <ul className="footer__links" role="list">
              {COLS.SERVICES.map(l => (
                <li key={l}><a href="#" className="footer__link">{l}</a></li>
              ))}
            </ul>
          </nav>

          {/* Tools */}
          <nav className="footer__col" aria-labelledby="fc-tools">
            <h3 className="footer__col-title" id="fc-tools">Tools</h3>
            <ul className="footer__links" role="list">
              {COLS.TOOLS.map(l => (
                <li key={l}><a href="#" className="footer__link">{l}</a></li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer__col" aria-labelledby="fc-contact">
            <h3 className="footer__col-title" id="fc-contact">Contact</h3>
            <address className="footer__contact" aria-label="Contact information">
              <a href="tel:+15551234567" className="footer__contact-row">
                <Phone size={13} aria-hidden="true" />
                <span>+1 (555) 123-4567</span>
              </a>
              <a href="mailto:info@onlineshopping.com" className="footer__contact-row">
                <Mail size={13} aria-hidden="true" />
                <span>info@onlineshopping.com</span>
              </a>
              <span className="footer__contact-row">
                <MapPin size={13} aria-hidden="true" />
                <span>123 Commerce Blvd,<br />New York, NY 10001</span>
              </span>
            </address>

            {/* Social icons — matches design */}
            <div className="footer__social" aria-label="Social media links">
              {SOCIAL.map(({ Icon, label }) => (
                <a key={label} href="#" className="footer__soc-btn" aria-label={label}>
                  <Icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <div className="wrap footer__bottom-row">
          {/* Logo */}
          <a href="#" className="footer__logo" aria-label="Online Shopping Home">
            <Package size={18} strokeWidth={2} aria-hidden="true" />
            <span className="footer__logo-txt">
              <strong>ONLINE</strong><small>SHOPPING</small>
            </span>
          </a>

          <p className="footer__copy">
            © {new Date().getFullYear()} Online Shopping. All rights reserved.
          </p>

          <nav aria-label="Legal links">
            <ul className="footer__legal" role="list">
              <li><a href="#" className="footer__legal-link">Privacy Policy</a></li>
              <li><a href="#" className="footer__legal-link">Terms of Service</a></li>
              <li><a href="#" className="footer__legal-link">Accessibility</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
