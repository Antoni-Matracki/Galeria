import React, { useState, useEffect } from "react";


const categories = ["Ferrari", "Lamborghini", "Porsche", "BMW", "Mercedes", "Toyota","Lexus", "Audi", "McLaren"];
const API_KEY = "49553999-d879b4443526b8658ddc629e9";
const API_URL = "https://pixabay.com/api/";

const App = () => {
  const [category, setCategory] = useState("Ferrari");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${API_URL}?key=${API_KEY}&q=${category}+sports+car&image_type=photo&per_page=64`
        );
        const data = await response.json();
        setImages(data.hits);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchImages();
  }, [category]);

  return (
    <div className="container">
      <header>
        <h1>Galeria Sportowych Samochodów</h1>
      </header>

      <nav>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <button onClick={() => setCategory(cat)}>{cat}</button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="gallery">
        {images.map((img) => (
          <figure key={img.id} onClick={() => setSelectedImage(img.largeImageURL)}>
            <img src={img.previewURL} alt="" />
          </figure>
        ))}
      </section>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Powiększone" />
        </div>
      )}
    </div>
  );
};

export default App;