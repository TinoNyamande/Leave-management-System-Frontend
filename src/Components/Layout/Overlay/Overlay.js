import "./Overlay.css";
const Overlay = ({ isLoading, outlaymessage }) => {
  return (
    isLoading && (
      <div className="loading-overlay">
        <div className="spinner">
          <img className="overlay-img" src="/Untitled design.jpg" />
        </div>
        <p className="overlay-p">{outlaymessage}...</p>
      </div>
    )
  );
};

export default Overlay;
