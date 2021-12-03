import './styles.css';

function Checkbox(props) {
  const {titleInput} = props;
  const options = [
    {
      name: 'Opção um',
      isChecked: false,
    }
  ]
  return (
    <div id="container-input">
      <p className="title-input">{titleInput}</p>
        {options.map(option => {
          return (
            <div id="option-checkbox">
              <input
                type="checkbox"
                name={option.name}
                style={{marginRight: 10}}
              />
              <p>{option.name}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Checkbox;
