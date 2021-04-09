export const TYPES_CONTACTS = {
  corp_email: "Correo coorporativo",
  personal_email: "Correo personal",
  corp_phone: "Telefono coorporativo",
  personal_phone: "Telefono personal",
  address: "Dirección",
};

export const STATES_PUBLICATION = {
  published: {value:"Publicado",css:{color:'white',background:'#86FF00'}},
  unpublished: {value:"No publicado",css:{color:'white',background:'#808080'}},
  incomplete: {value:"Incompleto",css:{color:'white',background:'#023D4C'}},
  queue: {value:"En cola",css:{color:'black',background:'#AAD6FF'}},
  processing: {value:"Procesando",css:{color:'white',background:'#0086FF'}},
  updating: {value:"Actualizando",css:{color:'white',background:'#0059AA'}},
  partially_processed: {value:"Parcialmente procesado",css:{color:'white',background:'#2C5500'}},
  deleting_unselected_items: {value:"Borrando item",css:{color:'white',background:'#FF2000'}},
  error: {value:"Con error",css:{color:'black',background:'#E1E11E'}},
}

export const STATE_ML_INFO ={
active : {value:"Activo",css:{color:'white',background:'#86FF00'}},
paused : {value:"Pausado",css:{color:'white',background:'#808080'}},
closed : {value:"Cerrado",css:{color:'black',background:'#E1E11E'}},
payment_required : {value:"Pago Requerido",css:{color:'black',background:'#E1E11E'}},
under_review : {value:"Bajo revisión",css:{color:'black',background:'#AAD6FF'}},
inactive : {value:"Inactivo",css:{color:'white',background:'#023D4C'}},
not_yet_active : {value:"Aún no activo",css:{color:'black',background:'#E1E11E'}},
}
