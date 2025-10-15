const EditFertilizer = () => {
    return (
      <div
        className="details mx-auto p-3"
        style={{
          width: "80vh",
          maxWidth: "100%",
          boxSizing: "border-box",
          minHeight: "calc(100vh - 2rem)",
        }}
      >
        <h2 className="text-xl font-semibold mb-3">Add Animal</h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="email1">Crop Type</label>
            <input
              type="email"
              className="form-control"
              id="email1"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email2">Planting Date</label>
            <input
              type="email"
              className="form-control"
              id="email2"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email3">Harveting Date</label>
            <input
              type="email"
              className="form-control"
              id="email3"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email4">Yield</label>
            <input
              type="email"
              className="form-control"
              id="email4"
              placeholder="name@example.com"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 mt-2"
          >
            Save 
          </button>
        </form>
      </div>
    );
  };
  
  export default EditFertilizer;
  