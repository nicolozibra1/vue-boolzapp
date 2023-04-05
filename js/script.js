/* 
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5 - opzionale
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

*/

// MYSCRIPT
const DateTime = luxon.DateTime;
const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts:[
            {
                id:1,
                name: 'Michele',
                avatar: './img/avatar_1.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '15:30',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '15:50',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '16:15',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                id:2,
                name: 'Fabio',
                avatar: './img/avatar_2.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '16:30',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '16:30',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '16:35',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                id:3,
                name: 'Samuele',
                avatar: './img/avatar_3.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '10:10',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '10:20',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '16:15',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                id:4,
                name: 'Alessandro B.',
                avatar: './img/avatar_4.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '15:30',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '15:50',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                id:5,
                name: 'Alessandro L.',
                avatar: './img/avatar_5.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '15:30',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '15:50',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                id:6,
                name: 'Claudia',
                avatar: './img/avatar_5.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '15:30',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '15:50',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '15:51',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                id:7,
                name: 'Federico',
                avatar: './img/avatar_7.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '15:30',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '15:50',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                id:8,
                name: 'Davide',
                avatar: './img/avatar_8.jpg',
                visible: false,
                active: false,
                messages: [
                    {
                        date: '15:30',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '15:50',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '15:51',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
            ],
            visible: false,
            active: false,
            chatId: 0,
            textContent: '',
            textMessage: '',
            response: null,
            liveTime: null,
            searchTerm: ''
        }
    },

    methods: {
        selectChat(index){
            this.chatId = index;
            for(let i=0; i < this.contacts.length; i++){
                if(i === index){
                    this.contacts[i].visible = true; // imposta il nuovo contatto su "true"
                } 
                else {
                    this.contacts[i].visible = false; // imposta tutti gli altri contatti su "false"
                    
                }
            }
            console.log(this.chatId)
            // console.log(this.contacts[index].visible)
            
        },
        filterContacts() {
            const filteredContacts = this.contacts.filter(contact => {
              return contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
            return filteredContacts
          },
        messageStatus(index){
            for(let i = 0; i < this.contacts[index].messages.length; i++) {
                this.currentStatus = this.contacts[index].messages[i].status
                this.textContent = this.contacts[index].messages[i].message
            }
        },
        sendMessage(){
            const getCurrentTime = () => {
                return DateTime.now().setLocale('it').toLocaleString(DateTime.TIME_SIMPLE);
              };
            this.liveTime = getCurrentTime()
            const newMessage = {
                date: this.liveTime,
                message: this.textMessage,
                status: 'sent'
            };
            this.contacts[this.chatId].messages.push(newMessage);
            this.textMessage = ''
            this.response = true;
            
            const botMessage = {
                date: this.liveTime,
                message: 'Ok!',
                status: 'received'
            };  
            setTimeout(() => {
                this.contacts[this.chatId].messages.push(botMessage);
                this.response = false;
                this.$nextTick(() => {
                    this.$refs.messages[this.$refs.messages.length - 1].scrollIntoView()
                })
                
            },1500)

        },
        
 },
    mounted() {
}
    
}).mount('#app');

