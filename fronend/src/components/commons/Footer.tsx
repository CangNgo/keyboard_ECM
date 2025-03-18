import React from "react";
import Image from "./Image";
import cang from "../../assets/img/462174035_1265880167773698_7926684173028503711_n.jpg"
interface Props {
  className?: string;
}

export default function Footer({ className = 'md:ml-[1.02rem] mt-10 w-full' }: Props) {
  return (
      <footer className={`bg-gray-800 text-white pt-8 pb-4` + `${className}`}>
          <div className="container ps-12 mx-auto flex flex-wrap items-start">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <Image src="https://xuongthuchanh.poly.edu.vn/assets/xuongfavicon-85673498.png" alt="Logo" className="mb-4 w-16" />
                  <p>Tòa nhà FPT Polytechnic (Tòa T), QTSC 9 Building, </p>
                  <p>  Quận 12, TP Hồ Chí Minh</p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <h3 className="font-semibold text-lg mb-4">Bộ Môn Phát triển Phần Mềm</h3>
                  <ul>
                      <li><a href="#" className="">Facebook</a></li>
                      <li><a href="#" className="">Tiktok</a></li>
                  </ul>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <h3 className="font-semibold text-lg mb-4">Đơn Vị Phát Triển</h3>
                  <ul>
                      <li>Bộ môn Phát triển phần mềm FPL HCM</li>
                      <li>Thực hiển bởi K19.2</li>
                  </ul>
                  <div className="flex my-4 relative">
                      <a target="_blank" className="absolute left-0"></a>
                      <a href='' target="_blank" className="absolute left-[1.5rem]"><Image src={cang} alt="Avatar" className="w-8 h-8 rounded-full"/></a>
                      <a href='' target="_blank" className="absolute left-[3rem]"><Image src={cang} alt="Avatar" className="w-8 h-8 rounded-full"/></a>
                      <a href='' target="_blank" className="absolute left-[4.5rem]"><Image src={cang} alt="Avatar" className="w-8 h-8 rounded-full"/></a>
                      <a href='' target="_blank" className="absolute left-[6rem]"><Image src={cang} alt="Avatar" className="w-8 h-8 rounded-full"/></a>
                      <a href='' target="_blank" className="absolute left-[7.5rem]"><Image src={cang} alt="Avatar" className="w-8 h-8 rounded-full"/></a>
                      <a href='' target="_blank" className="absolute left-[9rem]"><Image src={cang} alt="Avatar" className="w-8 h-8 rounded-full"/></a>
                  </div>

              </div>
          </div>
          <hr className='mt-6 mb-4 mx-auto border-gray-600' />
          <footer className="pb-4 text-center text-gray-500 text-sm">
              © 2024 FPT Polytechnic Hồ Chí Minh - FTT version 1.0
          </footer>
      </footer>
  )
}