// ─────────────────────────────────────────────────────────────
// DATOS GENERALES DEL REGALO
// Todo lo que aparece acá se puede editar sin tocar los componentes.
// ─────────────────────────────────────────────────────────────

export const site = {
  // Nombre de la destinataria (aparece en el sobre y en toda la experiencia)
  nombre: "Kamila",

  // Inicial para el sello de cera de la portada
  inicialSello: "K",

  // Frase introductoria de la portada
  fraseIntro: "Hay cosas que quizás no te digo tan seguido como debería...",

  // Texto del botón de apertura del regalo
  textoBoton: "Abrir tu regalo",

  // Título de la sección de recuerdos
  tituloMemorias: "Nuestro pequeño universo",

  // Subtítulo de la sección de recuerdos
  subtituloMemorias: "Una caja llena de momentos que me guardé con cariño.",

  // Título de la sección de agradecimientos
  tituloAgradecimiento: "Cosas que quizás no te digo",

  // Subtítulo de la sección de agradecimientos
  subtituloAgradecimiento: "Abrí cada nota: hay una por cada cosa que agradezco en silencio.",

  // Carta principal
  tituloCarta: "Una carta para vos",

  // Cierre
  tituloCierre: "Feliz cumpleaños",

  // Frase emotiva de cierre
  fraseCierre:
    "Ojalá la vida te devuelva, multiplicado, todo lo lindo que alguna vez le diste a las personas que tuvimos la suerte de conocerte.",

  // Firma personal al final (aparece manuscrita)
  firma: "Con todo el cariño, tu amigo de siempre, te amo amiga",

  // Mensaje secreto del último sobre
  mensajeSecreto: [
    "Este era el último secreto de la caja:",
    "no todo se puede escribir en una página. Pero todo lo que falta te lo susurro la próxima vez que nos veamos.",
    "Feliz cumpleaños. Te amo amiga",
  ],
}

// Orden de las secciones para la navegación lateral
export const secciones = [
  { id: "invitacion", etiqueta: "La invitación" },
  { id: "memorias", etiqueta: "Nuestro pequeño universo" },
  { id: "agradecimiento", etiqueta: "Cosas que quizás no te digo" },
  { id: "carta", etiqueta: "Una carta para vos" },
  { id: "cierre", etiqueta: "Feliz cumpleaños" },
]
