import * as types from '../types';

export const initialState = {
    id: 0,
    language: "fr",
    textes: {
        admin:["Administrateur", "Administrator"],
        msgSend: ["Messages envoyés", "messages sended"],
        consultMsg: ["Consulter les messages", "Consult message"],
        statMsgSend: ["statistiques des messages envoyés", "stats of messages sended"],
        contact: ["Contacts", "Contacts"],
        groupe: ["Groupe", "Group"],
        statVente: ["statistiques d'envoie des sms", "Stat of sended sms"],
        groupByDay: ["Grouper par jour", "Group by day"],
        stat: ["statistiques", "Stats"],
        chortCut: ["Racourcis utiles", "Utils chortcuts"],
        reloadMsg: ["Recharger mes messages", "Reload my sms"],
        github: ["Depot github", "Github depot"],
        viewAllMsg: ["Voir tout les messages", "View All Messages"],
        allTime: ["Tous", "All time"],
        groupByMonth: ["Groupée par mois", "Group By Month"],
        thisYear: ["Cette année", "This year"],
        msgSaveSuccess: ["Message(s) sauvegardés avec success", "sms succefuled sended and saved"],
        errorSendSms: ["Ereur lors de l'envoi du message", "Error msg can not sended"],
        errorSendSmsNumber: ["Numero de téléphone incorrect ou erreur de reseau !", "The phone number is invalid or error network !"],
        titleNewMsg: ["Nouveau message", "New message"],
        sendMsg: ["Envoyer le message", "Send message"],
        allContact: ["Tout les Contacts","All contacts"],
        selectContact: ["Selectionner les contacts","Select contacts"],
        selectAllContact: ["Selectionner tout les contacts","Select all contacts"],
        unselectAllContact: ["Deselectionner tout les contacts", "Unselect all contact"],
        addContact: ["Ajouter un contact", "Add contact"]

    }
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LANGUAGE:
            return action.payload
        default:
            return state;
    }
};

export default languageReducer;
