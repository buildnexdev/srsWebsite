import { useState, useEffect } from 'react';
import './SurveyPhotos.css'; // We'll create some styles for this

interface SurveyPhoto {
  id: number | string;
  coverImage: string;
  images: string[];
  location?: string;
  description?: string;
  title?: string;
}

export default function SurveyPhotos() {
  const [photos, setPhotos] = useState<SurveyPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<SurveyPhoto | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Using the user's provided API URL
        const apiUrl = 'https://bulidnex.xyz/srs-images/all';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch survey photos');
        }
        const data = await response.json();

        // Handle nested images array from the new response format
        let parsedPhotos: SurveyPhoto[] = [];
        const items = data.data || data; // Handle if wrapped in "data" or just array

        if (Array.isArray(items)) {
          items.forEach((item: any) => {
            let coverImg = '';
            let allImgs: string[] = [];

            if (item.images && Array.isArray(item.images) && item.images.length > 0) {
              allImgs = item.images.map((imgPath: string) =>
                imgPath.startsWith('http') ? imgPath : `https://s3.eu-north-1.amazonaws.com/buildnex-dev-bucket/${imgPath}`
              );
              coverImg = allImgs[0] || '';
            } else if (item.imageUrl || item.image || item.url) {
              const singleImg = item.imageUrl || item.image || item.url;
              allImgs = [singleImg];
              coverImg = singleImg;
            }

            parsedPhotos.push({
              id: item.id || String(Math.random()),
              coverImage: coverImg,
              images: allImgs,
              title: item.title,
              location: item.location,
              description: item.disc || item.description
            });
          });
        }
        setPhotos(parsedPhotos);
      } catch (err: any) {
        // Fallback for demo if API is down or 404
        console.error('Error fetching photos:', err);
        setError('Unable to load survey photos at this time. Please make sure the API is running correctly.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <section id="survey-photos" className="section gallery-section">
      <div className="container">
        <h2 className="section-title">Survey Photos & Locations</h2>
        <p className="gallery-intro">
          Explore our field teams in action across various regional monitoring and data collection projects.
        </p>

        {loading ? (
          <div className="gallery-loading">
            <div className="spinner"></div>
            <p>Loading survey photos...</p>
          </div>
        ) : error ? (
          <div className="gallery-error">
            <p>{error}</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="gallery-empty">
            <p>No survey photos available currently.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {photos.map((photo, index) => (
              <div
                key={photo.id || index}
                className="gallery-card glass-card animate-fade-in gallery-card-clickable"
                style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="gallery-img-wrapper">
                  <img
                    src={photo.coverImage || '/placeholder.jpg'}
                    alt={photo.title || photo.location || 'Survey Photo'}
                    className="gallery-img"
                    onError={(e) => {
                      // Fallback image if broken
                      (e.target as HTMLImageElement).src = '/logo.jpg';
                    }}
                  />
                  {photo.images.length > 1 && (
                    <div className="gallery-img-badge">
                      +{photo.images.length - 1} More
                    </div>
                  )}
                </div>
                <div className="gallery-info">
                  {photo.location && (
                    <p className="gallery-location">
                      <span aria-hidden="true">📍</span> {photo.location}
                    </p>
                  )}
                  {photo.description && <p className="gallery-desc">{photo.description}</p>}
                  {photo.title && <h4 className="gallery-photo-title">{photo.title}</h4>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="lightbox-overlay"
          onClick={() => { setSelectedPhoto(null); setActiveImageIndex(0); }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            className="lightbox-close"
            onClick={() => { setSelectedPhoto(null); setActiveImageIndex(0); }}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* Arrows */}
          {selectedPhoto.images.length > 1 && (
            <>
              <button
                className="lightbox-arrow lightbox-arrow-left"
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev - 1 + selectedPhoto.images.length) % selectedPhoto.images.length); }}
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button
                className="lightbox-arrow lightbox-arrow-right"
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev + 1) % selectedPhoto.images.length); }}
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="lightbox-image-area" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.images[activeImageIndex]}
              alt={`${selectedPhoto.title || 'Survey'} - Image ${activeImageIndex + 1}`}
              className="lightbox-img"
              onError={(e) => { (e.target as HTMLImageElement).src = '/logo.jpg'; }}
            />
          </div>

          {/* Thumbnail Strip */}
          {selectedPhoto.images.length > 1 && (
            <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
              {selectedPhoto.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`lightbox-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} onError={(e) => { (e.target as HTMLImageElement).src = '/logo.jpg'; }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
