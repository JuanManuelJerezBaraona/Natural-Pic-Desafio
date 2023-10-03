import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useEffect } from "react";
import IconHeart from "./IconHeart";

const Gallery = () => {
  const { photos, setPhotos, likedPhotos, setLikedPhotos } = useContext(MyContext)

  useEffect(() => {
    const consultAPI = async () => {
      const url = "/photos.json";
      const response = await fetch(url)
      const result = await response.json()

      const photosArray = result.photos.map(photo => {
        const object = {
          id: photo.id,
          description: photo.alt,
          image: photo.src.tiny,
          liked: photo.liked
        }
        return object
      })
      setPhotos(photosArray)
    }
    consultAPI()
  }, [])

  const handleLikeClick = (photoId) => {
    const updateLikedPhotos = likedPhotos.includes(photoId)
    ? likedPhotos.filter((id) => id !== photoId)
    : [...likedPhotos, photoId]
    setLikedPhotos(updateLikedPhotos) 
  }

  return (
    <div className="gallery grid-columns-5 p-3">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-container">
          <img
            src={photo.image}
            alt={photo.description}
            className="photo"
            onClick={() => handleLikeClick(photo.id)}
          />
          <div className="heart-container">
            <IconHeart filled={likedPhotos.includes(photo.id)} />
          </div>
          <p className="description">{photo.description}</p>
        </div>
      ))}
    </div>
  )
};
export default Gallery;
