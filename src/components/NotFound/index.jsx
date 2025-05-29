const NotFound = () => (
  <div className="bg-[#121212] h-screen flex flex-col justify-center items-center">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="w-[400px]"
    />
    <h1 className="text-white text-4xl font-bold font-roboto mt-5">Page Not Found</h1>
    <p className="text-white text-lg font-roboto mt-5">
      we're sorry, the page you requested could not be found
    </p>
  </div>
);

export default NotFound;