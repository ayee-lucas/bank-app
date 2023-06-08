import React from 'react';
import NavBar from '../components/Home/NavBar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavBar/>
      <div className="bg-violet-50 h-screen">{children}</div>
    </section>
  );
}