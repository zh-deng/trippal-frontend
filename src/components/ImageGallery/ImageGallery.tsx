import { ImageData } from "../../services/imageService"
import "./ImageGallery.scss"

type ImageGalleryProps = {
  images: ImageData[]
}

export const ImageGallery = ({images}: ImageGalleryProps) => {

  return (
    <div className="image-gallery">
      <div className="image-gallery-container">
        {images.map((image) => (
          <div key={image.id} className="image-gallery-item">
            <img
              src={image.urlSmall}
              alt={image.altDescription || 'Unsplash Image'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}