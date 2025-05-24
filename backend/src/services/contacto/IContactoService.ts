interface IMessage {
    Msg_email: string;
    Msg_texto: string;
}

interface IContactoService{
    createMessage( message:IMessage ):Promise<any>;
}

export{
    IMessage,
    IContactoService
}

