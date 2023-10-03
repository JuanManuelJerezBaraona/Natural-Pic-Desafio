import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import IconHeart from "../components/IconHeart";

const Favorites = () => {
  const { photos, likedPhotos, setLikedPhotos } = useContext(MyContext)

  const handleLikeClick = (photoId) => {
    const updateLikedPhotos = likedPhotos.includes(photoId)
    ? likedPhotos.filter((id) => id !== photoId)
    : [...likedPhotos, photoId]
    setLikedPhotos(updateLikedPhotos) 
  }

  return (
    <div>
      <h1>Fotos favoritas</h1>
      <div className="p-3 gallery grid-columns-5">
        {likedPhotos.map((photoId) => {
        const favoritePhoto = photos.find((photo) => photo.id === photoId)

        if (favoritePhoto) {
            return (
              <div key={favoritePhoto.id} className="photo-container">
                <img
                  src={favoritePhoto.image}
                  alt={favoritePhoto.description}
                  className="photo"
                  onClick={() => handleLikeClick(favoritePhoto.id)}
                />
                <div className="heart-container">
                  <IconHeart filled={true} /> {/* El corazón siempre está lleno para fotos favoritas */}
                </div>
                <p className="description">{favoritePhoto.description}</p>
              </div>
            );
          }
        })}
        </div>
    </div>
  );
};
export default Favorites;
