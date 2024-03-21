const AddInputFieldButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setFormState((prevState) => [...prevState, {
            label: 'New Input Field',
            type: 'text',
            value: '',
          }]);
        }}
      >
        Add Input Field
      </button>
    );
  };

export default AddInputFieldButton