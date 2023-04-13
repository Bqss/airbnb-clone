import React from "react";
import Card from "./Card";

import img1 from "./../assets/image/Card1/1.jpg";
import img2 from "./../assets/image/Card1/2.jpg";
import img3 from "./../assets/image/Card1/3.jpg";
import img4 from "./../assets/image/Card1/4.jpg";
import img5 from "./../assets/image/Card1/5.jpg";
import img6 from "./../assets/image/Card1/6.jpg";
import img7 from "./../assets/image/Card1/7.jpg";
import img8 from "./../assets/image/Card1/8.jpg";
import img9 from "./../assets/image/Card1/9.jpg";
import img10 from "./../assets/image/Card1/10.jpg";

import image1 from "./../assets/image/Card2/1.webp";
import image2 from "./../assets/image/Card2/2.webp";
import image3 from "./../assets/image/Card2/3.webp";
import image4 from "./../assets/image/Card2/4.webp";
import image5 from "./../assets/image/Card2/5.webp";
import image6 from "./../assets/image/Card2/6.webp";
import image7 from "./../assets/image/Card2/7.webp";
import image8 from "./../assets/image/Card2/8.webp";

function Content() {

  let datanew = [
    {
      image: image1,
      lokasi: "Tukadmungga,Indonesia",
      tempat: "Di pantai",
      waktu: "5 malam 23-28 Okt",
      pajak: 701,
      rating: '4,93'
    },
    {
      image: image2,
      lokasi: "Tukadmungga,Indonesia",
      tempat: "Di pantai",
      waktu: "6 malam 24-30 Jul",
      pajak: 1.426,
      rating: '4,98'
    },
    {
      image: image3,
      lokasi: "Seririt,Indonesia",
      tempat: "Di pantai",
      waktu: "5 malam 1-6 Mei",
      pajak: 1.261,
      rating: '5,0'
    },
    {
      image: image4,
      lokasi: "Lovina Seririt,Indonesia",
      tempat: "Berjarak 273 kilometer",
      waktu: "5 malam 6-11 Mei",
      pajak: 1.004,
      rating: '4,89'
    },
    {
      image: image5,
      lokasi: "West Selemadeg,Indonesia",
      tempat: "Di pantai",
      waktu: "5 malam 9-14 Jun",
      pajak: 2.031,
      rating: '5,0'
    },
    {
      image: image6,
      lokasi: "Lovina Seririt,Indonesia",
      tempat: "Di pantai",
      waktu: "5 malam 1-6 Apr",
      pajak: 1.240,
      rating: '4,93'
    },
    {
      image: image7,
      lokasi: "Seseh-Tanah Lot,Indonesia",
      tempat: "Berjarak 302 kilometer",
      waktu: "5 malam 8-13 Mei",
      pajak: 7.300,
      rating: '5,0'
    },
    {
      image: image8,
      lokasi: "Mengwi,Kabupaten Badung,Indonesia",
      tempat: "Di pantai",
      waktu: "5 malam 13-16 Mei",
      pajak: 7.090,
      rating: '4,67'
    }  
  ];

// start card loop =====
function CardLoop() {
    return datanew.map((data, i) => {
      return (
          <div className="w-[300px] h-[400px] text-sm" key={i}>
            <img src={data.image} alt="" className="h-[280px] rounded-xl" />
            <br />
            <nav className="flex items-center justify-between">
              <b>{data.lokasi}</b>
              <nav className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{data.rating}</p>
              </nav>
            </nav>
            <p className="text-gray-500">{data.tempat}</p>
            <p className="text-gray-500">{data.waktu}</p>
            <a href="">
              <u>
                total sebelum pajak <b key={data.pajak}>$</b>
              </u>
            </a>
          </div>
      );
    });
  }
  // end card loop ====

  return (
    <div>
      <section className="w-full h-[80px] flex justify-center items-center gap-3 text-xs sticky top-[79px]  bg-white border-b-[1px] border-slate-200">
        <div className="w-[85%] flex items-center">
          <Card name="Pantai" img={img1} />
          <Card name="Kolam renang keren" img={img2} />
          <Card name="Pemandangan cantik" img={img3} />
          <Card name="Kubah" img={img4} />
          <Card name="Tropis" img={img5} />
          <Card name="Kamar pribadi" img={img6} />
          <Card name="Populer" img={img7} />
          <Card name="Desain keren" img={img8} />
          <Card name="Rumah kecil" img={img9} />
          <Card name="wow!" img={img10} />
        </div>

        <div className="w-[15%]">
          <nav className="py-2   w-[85px] border-2 rounded-xl border-gray-200 flex justify-center items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <p>Filter</p>
          </nav>
        </div>
      </section>

      <section className="flex justify-around flex-wrap mt-10 ">
        {/* call function CardLoop */}
        {CardLoop()}
      </section>
      
    </div>
  );
}

export default Content;
