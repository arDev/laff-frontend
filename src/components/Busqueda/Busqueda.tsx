const Busqueda = ({ onKeyDownHandle, placeholder }: any) => {
    return (
      <>
        <div className="container">
          <div className="d-flex flex-row justify-content-center pb-5 pt-4">
            <input
              type="search"
              className="form-control form-control-lg border border-dark-subtle w-50"
              placeholder={placeholder}
              onKeyDown={onKeyDownHandle}
            />
          </div>
        </div>
      </>
    );
  };
  
  export default Busqueda;