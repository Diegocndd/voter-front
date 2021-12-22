import './styles.css';

function InputText(props) {
  const {value, onChange, titleInput, width, type = 'text', titleBold, placeholder} = props;

  return (
    <div id="container-input">
      <p className="title-input" style={{fontWeight: titleBold ? 'bold' : 0}}>{titleInput}</p>
      <input
        type={type}
        className="input-text"
        value={value}
        onChange={onChange}
        style={{width: width ? width : '100%'}}
        placeholder={placeholder ? placeholder : value}
      />
    </div>
  );
}

export default InputText;
