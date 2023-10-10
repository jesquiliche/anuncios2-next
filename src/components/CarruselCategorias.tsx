'use client'
import React from "react";
import Slider from "react-slick";
import { Categoria } from "../interfaces/interfaces"; // Asegúrate de que la importación sea correcta

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarruselCategoriasProps {
  data: Categoria[];
  title?: string;
}

const CarruselCategorias: React.FC<CarruselCategoriasProps> = ({ data, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 5,
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

  const api_images=process.env.NEXT_PUBLIC_IMAGES_URL; 
  return (
    <div className="w-4/5 bg-slate-100 mx-auto  px-5 shadow-lg rounded-lg mt-4">
      <div className="container mx-auto">
        <div>
          <Slider {...settings}>
            {data.map((p) => (
              <div key={p.id}>
                <div
                  className="m-1"
                >
                  <div className="flex  h-40 items-center">
                  <img src={`${api_images}${p.imagen}`} alt={p.nombre} />

                    
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

export default CarruselCategorias;
