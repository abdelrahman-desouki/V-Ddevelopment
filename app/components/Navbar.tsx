import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  const menuItems = [
    { name: 'Work', path: '/work' },
    { name: 'Our Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        if (scrolled) {
          setTimeout(() => setAnimateIcon(true), 100);
        } else {
          setIsMenuOpen(false);
          setAnimateIcon(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const toggleMenu = () => {
    if (isScrolled) setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={`${styles.logo} ${isScrolled ? styles.logoScrolled : ''}`}>
          {isScrolled ? 'VD' : 'VANGUARD DEVELOPMENT'}
        </Link>
      </div>

      {!isScrolled ? (
        <ul className={`${styles.menuList} ${styles.horizontalMenu}`}>
          {menuItems.map(({ name, path }) => (
            <li key={name} className={styles.menuItem}>
              <Link href={path}>{name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <button 
            className={`${styles.menuIconFixed} ${animateIcon ? styles.menuIconAnimated : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <div className={styles.menuIconContainer}>
              <span className={`${styles.menuDot} ${styles.dot1}`}></span>
              <span className={`${styles.menuDot} ${styles.dot2}`}></span>
              <span className={`${styles.menuDot} ${styles.dot3}`}></span>
              <span className={`${styles.menuDot} ${styles.dot4}`}></span>
              <span className={styles.menuText}>Menu</span>
            </div>
          </button>

          {isMenuOpen && (
            <ul className={`${styles.menuList} ${styles.verticalMenu}`}>
              {menuItems.map(({ name, path }) => (
                <li key={name} className={styles.menuItem} onClick={handleCloseMenu}>
                  <Link href={path}>{name}</Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
