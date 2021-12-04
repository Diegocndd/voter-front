import api from "../api";

const votePoll = (voteData) => {
    const {idPoll, idVisitor, idAlternative} = voteData;
    const data = {
        idPoll,
        idVisitor,
        idAlternative,
    };

    return api.post('/vote-poll', data);
}

export default votePoll;