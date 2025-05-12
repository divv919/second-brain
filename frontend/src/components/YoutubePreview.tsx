const YoutubePreview = ({ link }: { link: string }) => (
  <iframe
    className="w-full"
    src={link}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
);
export default YoutubePreview;
