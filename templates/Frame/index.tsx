import React from 'react'
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

type Props = {
  id: string,
  role: string,
  label: string,
  desc?: string,
  className?: string,
  children: any,
};

const Frame = ({ id, role, label, desc, className, children }: Props) => {
  return (
    <div
      id={id}
      role={role}
      aria-labelledby={label}
      aria-describedby={desc}
      className={className}
    >
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Frame