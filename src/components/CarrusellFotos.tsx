"use client";
import React, { useState,useEffect } from "react";
import Slider from "react-slick";
import { Foto } from "../interfaces/interfaces"; // Asegúrate de que la importación sea correcta
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarruselCategoriasProps {
  data: Foto[];
  title?: string;
  mainImage: string;
}

const CarruselFotos: React.FC<CarruselCategoriasProps> = ({
  data,
  mainImage,
  title,
}) => {
  let limiteImages:number=data.length+1;
 

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: limiteImages<4 ? limiteImages:4,
    slidesToScroll: 1,
    autoplay: true,
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
  
  const [imagePreview, setImagePreview] = useState(api_images + mainImage);
  const [mainImage2, setMainImage2] = useState(mainImage);
  const newImage ={id:0,path:mainImage2,anuncio_id:1};

  useEffect(() => {
    setImagePreview(api_images + mainImage); // Actualiza imagePreview cuando cambie mainImage
  }, [mainImage])
  data=[newImage,...data]
  
  return (
    <div className="bg-white mx-auto py-2">
      <div className=" mx-auto">
        
      {data.length>1 && (
        <div className="mt-5">
          <Slider {...settings}>
            {            data.map((p) => (
              <div key={p.path}>
                <div className="m-1">
                  <div className="flex flex-col items-center border-2 shadow-lg p-2 bg-white">
                  
                    <img
                    
                    src={`${api_images}${p.path}`}
                    alt={p.path}
                    className="z-0 rounded-lg "
                  
                  
                      onMouseEnter={() =>
                        setImagePreview(`${api_images}${p.path}`)
                      }
                  

                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>)}
        <img src={imagePreview} alt={imagePreview}
         
        className="relative mt-8  scale-1 md:hover:transform hover:scale-[2]  md:hover:translate-y-[-80px] md:hover:translate-x-[200px] border-2 p-2 bg-white transition-transform duration-300"></img>
        
      </div>
    </div>
  );
};

export default CarruselFotos;
