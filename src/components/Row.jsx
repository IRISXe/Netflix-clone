import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    const slider = document.getElementById('slider' + rowID);
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider' + rowID);
    slider.scrollLeft += 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={'slider' + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
          }}
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>

      {/* Inline style tag for Chrome/Safari scrollbar hiding */}
      <style>{`
        #slider${rowID}::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Row;
