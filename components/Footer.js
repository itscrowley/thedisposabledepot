import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          
          {/* Brand Info */}
          <div className={styles.footerCol}>
            <h2 className={styles.footerLogo}>The Disposable Depot</h2>
            <p className={styles.text}>
              Best quality disposable items for all your business and event needs. Wholesale rates available.
            </p>
            <div className={styles.socialLinks}>
    
             {/* 1. Facebook Link */}
             <a 
                href="https://www.facebook.com/TheDisposableDepot" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="Facebook"
             >
                <i className="fab fa-facebook-f"></i>
             </a>

             {/* 2. Instagram Link */}
             <a 
                href="https://www.instagram.com/the_disposable_depot/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="Instagram"
             >
                <i className="fab fa-instagram"></i>
             </a>

             {/* 3. WhatsApp Link */}
             <a 
                href="https://wa.me/919814812623?text=Hello,%20I%20am%20interested%20in%20your%20products." 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="WhatsApp"
             >
                <i className="fab fa-whatsapp"></i>
             </a>

            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerCol}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/" className={styles.link}>Home</Link></li>
              <li><Link href="/#catalogue" className={styles.link}>Our Products</Link></li>
              <li><Link href="/calculator" className={styles.link}>Party Planner (Calculator)</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info + MAP ADDED HERE */}
          <div className={styles.footerCol}>
            <h3>Contact Us</h3>
            <ul className={styles.contactInfo}>
              <li>
                <span className={styles.icon}><i className="fas fa-map-marker-alt"></i></span>
                <span>Jalandhar, Punjab</span>
              </li>
              <li>
                <span className={styles.icon}><i className="fas fa-phone-alt"></i></span>
                <span>+91 98148-12623</span>
              </li>
              <li>
                <span className={styles.icon}><i className="fas fa-envelope"></i></span>
                <span>thedisposabledepot@gmail.com</span>
              </li>
            </ul>

            {/* 👇👇 NEW COMPACT & DARK MODE READY MAP 👇👇 */}
<div className={styles.mapContainer}>
  <iframe 
    className={styles.mapFrame}
    title="Google Map Location"
    /* 👇 Aapka Location Link */
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.384666063467!2d75.54823437613587!3d31.32070395697664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b9b8b8b8b8b%3A0x123456789abcdef!2sThe%20Disposable%20Depot!5e0!3m2!1sen!2sin!4v1700000000000"
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
{/* 👆👆 END MAP 👆👆 */}

          </div>

        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} The Disposable Depot. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
