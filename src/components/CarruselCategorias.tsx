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
    slidesToShow: 4,
    slidesToScroll: 4,
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

  return (
    <div className="w-4/5 bg-slate-200 mx-auto py-4 px-10 shadow-lg rounded-lg -mt-4">
      <div className="container mx-auto mt-5">
        <div className="mt-3">
          <Slider {...settings}>
            {data.map((p) => (
              <div key={p.id}>
                <div
                  className="bg-white overflow-hidden rounded-lg shadow-lg border border-gray-300 opacity-100 m-1"
                >
                  <div className="p-2">
                  <img src={`https://nest-users-production.up.railway.app/api/v1${p.imagen}`} alt={p.nombre} />

                    <h1 className="text-4xl">{p.nombre}</h1>
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
