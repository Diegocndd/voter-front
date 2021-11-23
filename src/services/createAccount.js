import api from "./api";

const reverseDate = date => {
    //DD/MM/YYYY -> YYYY-MM-DD
    var dia = date.split('/')[0];
    var mes = date.split('/')[1];
    var ano = date.split('/')[2];
  
    return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
};

const createAccount = (dataUser) => {
    const {name, username, surname, email, dateBirth, password} = dataUser;
    const birth = reverseDate(dateBirth);
    const data = {
        name: name,
        surname: surname,
        username: username,
        email: email,
        birth: birth,
        password: password,
    };

    return api.post('/register', data);
}

export default createAccount;