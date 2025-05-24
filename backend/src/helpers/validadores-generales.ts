const validarEmail = (email: string) => {
  const caracteresValidos = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = caracteresValidos.test(email);

  if (!isValidEmail) {
    console.log('email 1 ')
    throw new Error("Este email no es valido");
  }
};

const validarMensaje = (mensaje: string):boolean => {
  const caracteresProhibidos= /[<>;'"()]/g;
  const estiquetasMaliciosas =
    /<(?:script|iframe|object|embed|link|style)\b[^>]*>/i;
  const isMaliciusTarget = estiquetasMaliciosas.test(mensaje);

  if (isMaliciusTarget) {
    console.log('texto 1 ')
    throw new Error("El mensaje no debe contener etiquetas HTML maliciosas");
  }

  const isMaliciusMessage = caracteresProhibidos.test(mensaje);

    if (isMaliciusMessage) {
    console.log('texto 2 ')
    throw new Error("El mensaje no debe contener caracteres maliciosos");
  }

return true;
};

export{
  validarEmail,
  validarMensaje
}
