import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css'; // Agar kerak bo'lsa stilni qo'shish uchun

function App() {
  const [mangas, setMangas] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMangas = async () => {
    try {
      const response = await fetch(`https://api.example.com/mangas?page=${page}`);
      const data = await response.json();

      if (data.length == 0) {
        setHasMore(false);
      } else {
        setMangas((prevMangas) => [...prevMangas, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Manga yuklashda xato yuz berdi:", error);
    }
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  return (
    <div className="App">
      <h1>Manga List</h1>
      <InfiniteScroll
        dataLength={mangas.length}
        next={fetchMangas}
        hasMore={hasMore}
        loader={<h4>Yuklanmoqda...</h4>} 
        endMessage={<p>Hammasi ko'rsatilgan!</p>}
      >
        <div>
          {mangas.map((manga, index) => (
            <div key={index} className="manga-item">
              <h3>{manga.title}</h3>
              <img src={manga.imageUrl} alt={manga.title} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
