const LoadingIndicator = (props) => {
  const { text, type } = props;

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className={`spinner-border ml-auto ${type || 'text-primary'}`}
        role="status"
        aria-hidden="true"
      ></div>
      <h1 className="display-6 ms-2 mb-0">{text || 'Yükleniyor...'}</h1>
    </div>
  );
};

export default LoadingIndicator;
