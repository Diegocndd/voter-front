import './styles.css';

function InputText(props) {
  const {value, onChange, titleInput, width, type = 'text'} = props;

  return (
    <div id="container-input">
      <p className="title-input">{titleInput}</p>
      <input type={type} className="input-text" value={value} onChange={onChange} style={{width: width ? width : '100%'}} />
    </div>
  );
}

export default InputText;
