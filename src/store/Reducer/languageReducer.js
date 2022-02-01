import * as types from '../types';

export const initialState = {
    id: localStorage.getItem("lang") ? parseInt(localStorage.getItem("lang")) : 1,
    language: "En",
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
        addContact: ["Ajouter un contact", "Add contact"],
        noMsg: ["Aucun messages à afficher dans votre boite de messages envoyés", "No sms to show on your sms sended"],
        sendSms: ["Envoyer un message", "Send new message"],
        receiver: ["Destinateur", "Receiver"],
        msg: ["Messages", "Messages"],
        sendedAt: ["Date d'envoie", "Sended at"],
        action: ["Actions", "Actions"],
        message: ["Messages envoyés", "SMS sended"],
        name: ["Noms", "Name"],
        phone: ["Telephone", "Phone"],
        email: ["Email", "Email"],
        emptyUsers: ["Vous n'avez aucun contacts à aficher dans votre repertoire !", "Contacts not found"],
        userList: ["Liste des utilisateurs", "Users list"],
        contactAddSuccess: ["Contact ajouté avec success", "Contact added succefulled"],
        contactAddErr: ["Erreur lors de l'ajout du contact", "Error !"],
        addGroup: ["Ajouter un groupe", "Add new group"],
        nameSingle: ["Nom", "Name"],
        surname: ["Prenom", "Surname"],
        paysId: ["Code du pays (ex:237)", "Country code(ex:237)"],
        numTel: ["Numero de telephone ", "Phone number"],
        selectGroupe: ["Selectionner un groupe ","Select one group"],
        userInfo: ["Veillez remplir minitieusement les informations, elle seront utilisées lors de l'envoi des messages.", "Enter corectly you're informations"],
        emailAdress: ["Adresse Email (optionel)", "Email adress(optional)"],
        prenom: ["Prenom", "Surname"],
        groupContact: ["Groupe des contacts", "Group of contacts"],
        groupName: ["Groupe des contacts", "contacts groups"],
        description:["Description", "Description"],
        nbContact:["Nombre de contact", "Number of contact"],
        notGroupeToShow: ["Vous n'avez aucun groupe à afficher !", "Not group to show !"],
        groupeAddSuccess: ["Groupe créer avec success !", "Groupe created success !"],
        groupeAddErr: ["Erreur lors de l'ajout du groupe", "Error !"],
        groupTitle: ["Titre du groupe ", "Title of group"],
        description: ["Description", "Description"],
        addTheGroup: ["Ajouter le groupe", "Add group"],
        profilUpdated: ["Profil mise à jour", "Profil updated"],
        avatarUpdated: ["Votre avatar à été mise à jour !", "Avatar updated"],
        board: ["Tableau de bord", "Dashboard"],
        empty: ["! Laisser vide si vous ne voulez pas modifier", ""],
        saving: ["Sauvegarde en cour...", "Save"],
        reset: ["Renitialiser", "Reset"],
        msg: ["Cette option auras pour effet de suprimer touts les messages que vouz avez envoyées, suprimer vos contacts & groupe", "This option will have to restore the usine option on you're app"],
        resetConfirm: ["Voulez vous restorer les parametres d'usines de votre application ?", "Do you want to restore the app ?"],
        dashboard: ["Tableau de bord", "Dashboard"],
        newMsg: ["Nouveau message", "New sms"],
        settings : ["paramêtres", "Settings"],
        addGroup: ["Ajouter un groupe", "Create new group"],
        notGroupToShow: ["Aucun groupe à afficher", "No group to show"],
        noSms: ["Aucun sms à afficher", "No sms to show on this page"],
        sendSms: ["Envoyer un nouveau sms", "Send new sms"],
        notInDir: ["saisir le contact", "write contact"],
        showAll: ["Afficher plus de contact", "Show more contact"],
        loadNewContact: ["chargement en cour..", "loading..."]

    }
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LANGUAGE:
            return { 
                ...state,
                id:action.id
            }
        default:
            return state;
    }
};

export default languageReducer;
