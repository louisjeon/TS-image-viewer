import Img from "react-cool-img";

interface CoolImageProps {
  src: string;
  alt: string;
}

const CoolImage: React.FC<CoolImageProps> = ({ src, alt }) => {
  return (
    <Img
      src={src}
      alt={alt}
      placeholder="https://s3.envato.com/files/9360c2bf-70db-44fd-95e6-2f8f6bf78d79/inline_image_preview.jpg"
      error="https://media.istockphoto.com/photos/computer-error-picture-id1222806141?k=20&m=1222806141&s=612x612&w=0&h=GoODCHnR0mSefDBLWJpnqVnfRKH9ttdYPO0-KEYbb7w="
      loading="lazy"
      style={{ width: "100%" }}
    />
  );
};

export default CoolImage;
