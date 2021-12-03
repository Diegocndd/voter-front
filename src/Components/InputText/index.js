import './styles.css';

function InputText(props) {
  const {value, onChange, titleInput, width, type = 'text', titleBold} = props;

  return (
    <div id="container-input">
      <p className="title-input" style={{fontWeight: titleBold ? 'bold' : 0}}>{titleInput}</p>
      <input type={type} className="input-text" value={value} onChange={onChange} style={{width: width ? width : '100%'}} />
    </div>
  );
}

export default InputText;
