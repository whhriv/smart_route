const Input = ({ label, type, value }) => {
    return (
      <div className="mb-3">
        <label htmlFor={label}>{label}</label>
        <input
          type={type}
          className="form-control"
          id={label}
          value={value}
          onChange={(e) => setFormState((prevState) => {
            const updatedFormState = [...prevState];
            updatedFormState[0].value = e.target.value;
            return updatedFormState;
          })}
        />
      </div>
    );
  };

  const DeleteInputField = (index) => {
    setFormState((prevState) => {
      const updatedFormState = [...prevState];
      updatedFormState.splice(index, 1);
      return updatedFormState;
    });
  };

export default DeleteInputField && Input

const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
  
    // Submit the form data to your backend server
  };




  <form onSubmit={handleSubmit}>
  {formState.map((inputField, index) => (
    <Input
      key={index}
      label={inputField.label}
      type={inputField.type}
      value={inputField.value}
    />
  ))}
  <AddInputFieldButton />
</form>