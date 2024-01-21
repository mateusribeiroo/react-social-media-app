export const usernameValidate = {
    required: {
        value: true,
        message: "Por favor insira seu nome de usuário"
    },
    minLength: {
        value: 6,
        message: "Seu nome de usuário deve possui mais de 6 caracteres"
    },
    pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: "Nome de usuário deve ser alfanumérico"
    }
}

export const emailValidate = {
    required: {
        value: true,
        message: "Por favor insira seu email"
    },
    // pattern: {
    //     value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
    //     message: "Endereço de email inválido"
    // }
};

export const passwordValidate = {
    required: {
        value: true,
        message: "Por favor insira sua senha"
    },
    minLength: {
        value: 6,
        message: "Sua senha deve possuir mais de seis caracteres"
    }
}