const AddFertilizer = () => {
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
        <h2 className="text-xl font-semibold mb-3">Add Fertilizer</h2>
        <form>
        <div className="form-group mb-3">
            <label htmlFor="email4">Name</label>
            <input
              type="email"
              className="form-control"
              id="email4"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email4">Bought Date</label>
            <input
              type="email"
              className="form-control"
              id="email4"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email1">Quantity</label>
            <input
              type="email"
              className="form-control"
              id="email1"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email2">Applied Quantity</label>
            <input
              type="email"
              className="form-control"
              id="email2"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email3">Application Date</label>
            <input
              type="email"
              className="form-control"
              id="email3"
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
  
  export default AddFertilizer;
  