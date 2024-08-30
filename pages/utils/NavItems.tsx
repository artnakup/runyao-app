import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/">หน้าหลัก</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/search">ตรวจสอบสถานะการสมัคร</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">งานวิ่ง</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">เกี่ยวกับเรา</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
