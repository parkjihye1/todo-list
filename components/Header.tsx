import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f5f5f5' }}>
      <Link href="/">
        <a>
          <svg width="118" height="32.5" viewBox="0 0 236 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          
            <path d="M1.96 65C1.16 65 0.76 64.6 0.76 63.8V2.216C0.76 1.416 1.16 1.016 1.96 1.016H28.504C29.272 1.016 29.912 1.272 30.424 1.784L40.024 11.384C40.568 11.928 40.84 12.568 40.84 13.304V29.864C40.84 30.632 40.568 31.272 40.024 31.784L30.424 41.384C29.912 41.928 29.272 42.2 28.504 42.2H16.744V63.8C16.744 64.6 16.344 65 15.544 65H1.96Z" fill="black"/>
          </svg>
        </a>
      </Link>
    </header>
  );
}

export default Header;
