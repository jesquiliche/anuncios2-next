"use client";
import React from "react";
import Slider from "react-slick";
import { Foto } from "../interfaces/interfaces"; // Asegúrate de que la importación sea correcta

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarruselCategoriasProps {
  data: Foto[];
  title?: string;
}

const CarruselFotos: React.FC<CarruselCategoriasProps> = ({ data, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
        prevArrow: <button className="slick-prev">Previous</button>,
        nextArrow: <button className="slick-next">Next</button>,
      },
    ],
  };

  const api_images = process.env.NEXT_PUBLIC_IMAGES_URL;
  return (
    <div className="bg-white mx-auto py-2 mt-10">
      <div className=" mx-auto">
        <div>
          <Slider {...settings}>
            {data.map((p) => (
              <div key={p.path}>
                <div className="m-1">
                  <div className="flex flex-col items-center border-2 shadow-lg p-2 bg-white">
                    <img
                      src={`${api_images}${p.path}`}
                      alt={p.path}
                      className="h-full z-0 rounded-lg hover:scale-[1.3] transform transition-transform cursor-pointer hover:z-50"
                      onMouseEnter={() => console.log(p.path)}
                   />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CarruselFotos;