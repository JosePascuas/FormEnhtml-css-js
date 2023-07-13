  export function valida(input){
  const tipoDeInput= input.dataset.tipo;
  if(validadores[tipoDeInput]){
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML="";

  } else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores= [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
]

const mensajesDeError= {
  nombre: {
    valueMissing: "Este campo no puede estar vacio",
  },
  email : {
    valueMissing:"Este campo no puede estar vacio",
    typeMismatch:"El correo no es válido",
  },
  password : {
    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"al menos 6 caracteres, maximo 12, debe contener una letras mayúscula, una minúscula, un número y no puede contener caracteres especiales",
  },
  nacimiento :{
    valueMissing:"Este campo no puede estar vacio",
    customError:"Debes tener almenos 18 años de edad",
  },
  number :{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El formato requerido es XXXXXXXXXX es 10 números",
  },
  direccion :{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La direccion debe tener entre 10 y 40 caracteres",
  },
  ciudad :{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La Ciudad debe tener entre 4 y 20 caracteres",
  },
  departamento :{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El departamento debe tener entre 4 y 20 caracteres",
  }
}

const validadores={
  nacimiento: input=> validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje="";
  tipoDeErrores.forEach( (error) =>{
    if(input.validity[error]){
      mensaje=mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje
}

function validarNacimiento(input){
  const fechaCliente= new Date(input.value)
  let mensaje= ""
  if(!mayorEdad(fechaCliente)){
    mensaje= "debes tener al menos 18 años de edad para registrarte"
  }

  input.setCustomValidity(mensaje)
}

function mayorEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFecha= new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
  return diferenciaFecha <= fechaActual
  
}