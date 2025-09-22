import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      <p className="preloader__text">Searching for exercises...</p>
    </div>
  );
}

export default Preloader;
