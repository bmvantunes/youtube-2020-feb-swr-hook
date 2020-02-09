import Link from 'next/link';
import React from 'react';

export default function Nav() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  );
}
