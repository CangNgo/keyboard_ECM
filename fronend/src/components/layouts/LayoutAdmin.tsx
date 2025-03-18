import React, { FC } from 'react'
import AdminHeader from '../commons/admin/AdminHeader'
import Footer from '../commons/Footer'
import { LayoutRouteProps, Outlet } from 'react-router-dom'

const LayoutAdmin: FC<LayoutRouteProps> = ({ children }) => {
  return (
    <div className='w-full'>
      <div className='w-full top-0'>
        <AdminHeader />
        <div className="content w-full flex justify-center mt-32">
          <div className=" max-w-7xl px-4 w-4/5">{children || <Outlet />}</div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default LayoutAdmin
