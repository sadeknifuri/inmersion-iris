import Diaframma from '../vv2oiTgrXepkpbKfQhbGi7.frame'
import Lente from '../369JdySm2rpCjHSXRoYys1.frame'
import Provino from '../9puTTHqFtC276AJA9F641e.frame'

export const placements = [
  note({ id: 'title', x: 0, y: -620, width: 4240 }, '¿Hasta dónde puede llegar la mirada de Contatto?', { fontSize: 72, fontWeight: 'bold' }),
  note({ id: 'intro', x: 0, y: -500, width: 4240 }, 'Cada opción convierte el ojo en un instrumento fotográfico distinto: un obturador, una lupa y una hoja de contactos de cuarto oscuro. Haz scroll y mueve el puntero dentro de cada una.', { fontSize: 32, color: '#60646C' }),
  note({ id: 'a-label', x: 0, y: -260, width: 1280 }, 'A · Diaframma', { fontSize: 44, fontWeight: 'semibold' }),
  note({ id: 'a-about', x: 0, y: -190, width: 1280 }, 'Ocho láminas de diafragma se abren de estenopeico a f/1.4 con el scroll, con lectura de exposición en vivo. La página es la cámara.', { fontSize: 28, color: '#60646C' }),
  place(Diaframma, { id: 'a', x: 0, y: 0 }),
  note({ id: 'b-label', x: 1480, y: -260, width: 1280 }, 'B · Lente', { fontSize: 44, fontWeight: 'semibold' }),
  note({ id: 'b-about', x: 1480, y: -190, width: 1280 }, 'Una copia en plata donde una lupa sigue al puntero y revela el iris a color y ampliado. Explorar en vez de mirar.', { fontSize: 28, color: '#60646C' }),
  place(Lente, { id: 'b', x: 1480, y: 0 }),
  note({ id: 'c-label', x: 2960, y: -260, width: 1280 }, 'C · Provino', { fontSize: 44, fontWeight: 'semibold' }),
  note({ id: 'c-about', x: 2960, y: -190, width: 1280 }, 'Tiras de película en negativo que se revelan al hacer scroll bajo luz roja, y un lápiz graso marca el elegido. Juega con el doble sentido de "contatto".', { fontSize: 28, color: '#60646C' }),
  place(Provino, { id: 'c', x: 2960, y: 0 }),
]
