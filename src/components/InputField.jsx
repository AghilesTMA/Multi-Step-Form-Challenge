
function InputField({type,label,placeHolder,id,value,handleChange,missing,validInp}) {
  return (
    <div className={`inputField ${!missing?"":"missing"} ${validInp?"":"notValid"}`}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeHolder} value={value} onChange={handleChange}/>
    </div>
  )
}

export default InputField