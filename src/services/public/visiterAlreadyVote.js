import api from "../api";

const visiterAlreadyVote = (dataUser) => {
    const {idPoll, idVisitor} = dataUser;
    const data = {
        idPoll,
        idVisitor,
    };

    return api.post('/visiter-already-vote', data);
}

export default visiterAlreadyVote;