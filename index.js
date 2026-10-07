// ==========================================================================
// 1. BASE DE DATOS DE USUARIOS (CONTROL DE ESTUDIO Y PROFESORES)
// ==========================================================================

/*Esta es la parte en donde el usuario va a colocar sus datos para poder ingresar*/
const usuariosIniciales = [
  {
    id: 1,
    usuario: "control de estudio",
    password: "ColegioSimonBolivar",
    nombre: "control de estudio",
    cedula: "V-00000000",
    rol: "control_estudio",
    materia: "Administración / Dirección",
    estado: "activo"
  }
];

// Base de datos local inicial de estudiantes

const estudiantesIniciales = [

  { id: 1, cedula: "V-34694229", nombre: "Maryoris Sarahi Portilla Soomai", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 2, cedula: "V-3482822", nombre: "Zahir Uziel Leon Salazar", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 3, cedula: "V-34828931", nombre: "Howard Isaac Escalona Gonzalez", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 4, cedula: "V-34855119", nombre: "Maria Valentina Romero Herrera", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 5, cedula: "V-34894853", nombre: "Abraham Josue Call Marcano", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 6, cedula: "V-35009788", nombre: "Dhilan Jose Calderon Boyce", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 7, cedula: "V-35039769", nombre: "Maria Fernanda Cedeño Cortez", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 8, cedula: "V-35093006", nombre: "Astin's Gabriel Muñoz Morales", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 9, cedula: "V-35131815", nombre: "Keyler Daniel Wells Palomares", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 10, cedula: "V-36230054", nombre: "Jacyel Walezka Bettermin Bolwine", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 11, cedula: "V-36237587", nombre: "Anthonella Juliett Ortega Bolwine", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 12, cedula: "V-36298646", nombre: "Kheilyn Alejandra Marquez Carreño", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 13, cedula: "V-36394939", nombre: "Adrian David Gutierrez Baeza", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 14, cedula: "V-36396897", nombre: "Geimilys Karisbel Gascon Polo", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 15, cedula: "V-36765014", nombre: "Yeikert Alejandro Brito Valderrey", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 16, cedula: "V-36765646", nombre: "Aletza Jiovanna Kochmansky Contreras", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 17, cedula: "V-36849555", nombre: "Mabel Paola Ramonys Jimenez", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 18, cedula: "V-36940752", nombre: "Jorgelis Valentina Rodriguez Palomo", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 19, cedula: "V-37044134", nombre: "Marianela Jose Davalillo Leon", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 20, cedula: "V-37341117", nombre: "Eudismarys Esther Mata Palomares", seccion: "Primer año seccion A", genero: "Femenino", asistencias: {} },

  { id: 21, cedula: "V-37460645", nombre: "Aroon Sebastian Guevara Ramirez", seccion: "Primer año seccion A", genero: "Masculino", asistencias: {} },

  { id: 22, cedula: "V-33866403", nombre: "Nicolas Alberto Salazar Rondon", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 23, cedula: "V-34794396", nombre: "Diosmar Alexander Arteaga Marcano", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 24, cedula: "V-35020454", nombre: "Javierlys Josefina Salazar Mayo", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 25, cedula: "V-35084536", nombre: "Jhuliannys Eliamar Valentina", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 26, cedula: "V-35113889", nombre: "Williams Alberto Mendonza Marcano", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 27, cedula: "V-35155676", nombre: "Jose Miguel Idrogo Moreno", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 28, cedula: "V-36104817", nombre: "Robert Jose Rodriguez Brito", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 29, cedula: "V-36203616", nombre: "Isaias Daniel Reyes Giovetti", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 30, cedula: "V-36247886", nombre: "Yoimar Sofia Marcano Torres", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 31, cedula: "V-36249573", nombre: "Ronnibeth Sharlot Urquia Brito", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 32, cedula: "V-36251674", nombre: "Rogervis Nicoll Brito Brito", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 33, cedula: "V-36421276", nombre: "Miranda Edecia Colina Moya", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 34, cedula: "V-36432829", nombre: "Andreilismar Valentina Tocore Tocore", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 35, cedula: "V-36907540", nombre: "Yarley Carolina Zabala Diaz", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 36, cedula: "V-36959322", nombre: "Mauricio Javier Dominguez Rojas", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 37, cedula: "V-37015246", nombre: "Rosibania Trudis Ivette Gonzalez Zapata", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 38, cedula: "V-37142192", nombre: "Anabella Sofia Leon Lima", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 39, cedula: "V-11318658489", nombre: "Jose Angel Urrieta Gonzalez", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 40, cedula: "V-11324119398", nombre: "Nicole Gisell Lopez Martinez", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 41, cedula: "V-11325512624", nombre: "Angel Adrian Dimas Luces", seccion: "Primer año seccion B", genero: "Masculino", asistencias: {} },

  { id: 42, cedula: "V-11425125753", nombre: "Karlis Alejandra Ferman Rosquel", seccion: "Primer año seccion B", genero: "Femenino", asistencias: {} },

  { id: 43, cedula: "V-34780516", nombre: "Maria Fernanda Rodriguez Moreno", seccion: "Primer año seccion C", genero: "Femenino", asistencias: {} },

  { id: 44, cedula: "V-34780553", nombre: "Jannelys Gabriela Lopez Perez", seccion: "Primer año seccion C", genero: "Femenino", asistencias: {} },

  { id: 45, cedula: "V-36100826", nombre: "Henry Ramon Velasquez Perez", seccion: "Primer año seccion C", genero: "Masculino", asistencias: {} },

  { id: 46, cedula: "V-36108035", nombre: "Isaac David Santoyo Danzer", seccion: "Primer año seccion C", genero: "Masculino", asistencias: {} },

  { id: 47, cedula: "V-36606089", nombre: "Zulismar Gabriela Palomo Silva", seccion: "Primer año seccion C", genero: "Femenino", asistencias: {} },

  { id: 48, cedula: "V-37556308", nombre: "Leoskarly Nikol Cabral Sarmiento", seccion: "Primer año seccion C", genero: "Femenino", asistencias: {} },

  { id: 49, cedula: "V-11319858390", nombre: "Fabian Alejandro Frutille Baquero", seccion: "Primer año seccion C", genero: "Masculino", asistencias: {} },

  { id: 50, cedula: "V-11321385005", nombre: "Samira Sthefania Olivares Gurra", seccion: "Primer año seccion C", genero: "Femenino", asistencias: {} },

  { id: 51, cedula: "V-34154240", nombre: "Jasep Alcangel Idrogo Moreno", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 52, cedula: "V-34285119", nombre: "Jhonny Alejandro Rendayyo Montenegro", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 53, cedula: "V-34285130", nombre: "Melanis Anthonella Mata Farfan", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 54, cedula: "V-34296539", nombre: "Deixy Alejandra Urquia Bermudez", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 55, cedula: "V-34423362", nombre: "Orangel Jose Urrieta Gonzalez", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 56, cedula: "V-34423390", nombre: "Jhojan Orlando Albeiro Rodriguez Rodriguez", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 57, cedula: "V-34470400", nombre: "Querub Jocabeth Guzman Beria", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 58, cedula: "V-34470441", nombre: "Moises Samuel Valenzuela Casanova", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 59, cedula: "V-34474342", nombre: "Samme Del Jesus Gonzalez Celis", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 60, cedula: "V-34484470", nombre: "Randy Josue Jimenez Reyna", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 61, cedula: "V-34544429", nombre: "Dianlet Gabriela Rondon Wells", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 62, cedula: "V-34553656", nombre: "Robert Daniels Zambrano Baeza", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 63, cedula: "V-34692249", nombre: "Efranluis Jesus Silva Guzman", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 64, cedula: "V-34710852", nombre: "Belinda Johanna Verde Rodriguez", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 65, cedula: "V-34721159", nombre: "Jesus Santiago Velazquez Marcano", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 66, cedula: "V-34781031", nombre: "Jesuliangel Del Valle Carrion Zulueta", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 67, cedula: "V-34794381", nombre: "Ana Victoria Cedeño Zapata", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 68, cedula: "V-34858038", nombre: "Emily Cardona Lopez Romero", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 69, cedula: "V-34942003", nombre: "Luciano Jonas Medina Muñoz", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 70, cedula: "V-35000728", nombre: "Dariannys Sharaid Bolivar Rondon", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 71, cedula: "V-35039776", nombre: "Ana Cristina Bompart Figuera", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 72, cedula: "V-35131810", nombre: "Arianna Sophia Marcano Garrido", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },
  
  { id: 73, cedula: "V-35146248", nombre: "Chairitt Vanessa Figuera Robles", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 74, cedula: "V-35180052", nombre: "Dairismar Cirianny Gonzalez Serrano", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 75, cedula: "V-36129816", nombre: "Leonardo Elias Rodriguez Mendoza", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 76, cedula: "V-36180114", nombre: "Lisandrys Del Valle Colina Gomez", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 77, cedula: "V-36296168", nombre: "Sonismar Sofia Gomez Gonzalez", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 78, cedula: "V-36358208", nombre: "Greidys Victoria Calderon Flores", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 79, cedula: "V-36504998", nombre: "Pedro Jose Manuel Bermudez Rivero", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 80, cedula: "V-36531595", nombre: "Elias Gabriel Davalillo Rivero", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 81, cedula: "V-36550624", nombre: "Anthonella Giovanna Del Valle Avila Narvaez", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 82, cedula: "V-36638448", nombre: "Isaac Enrique Martinez Borrome", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 83, cedula: "V-36965689", nombre: "Joseliandrys Del Valle Almea Mata", seccion: "Segundo año seccion A", genero: "Femenino", asistencias: {} },

  { id: 84, cedula: "V-11120160984", nombre: "Reyber Alejandro Rojas Leon", seccion: "Segundo año seccion A", genero: "Masculino", asistencias: {} },

  { id: 85, cedula: "V-34023375", nombre: "Leisly Desire Velasquez Perez", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 86, cedula: "V-34141266", nombre: "Cleudomal Jose Guariguata Davalillo", seccion: "Segundo año seccion B", genero: "Masculino", asistencias: {} },

  { id: 87, cedula: "V-34196928", nombre: "Frederick Gabriel Marcano Jaimez", seccion: "Segundo año seccion B", genero: "Masculino", asistencias: {} },

  { id: 88, cedula: "V-34561305", nombre: "Andreilys Elizabeth Nolasco Bonaldy", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 89, cedula: "V-34778147", nombre: "Erick John Jaime Gonzalez", seccion: "Segundo año seccion B", genero: "Masculino", asistencias: {} },

  { id: 90, cedula: "V-34905697", nombre: "Ashley Sophia Obdola Naranjo", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 91, cedula: "V-36018351", nombre: "Fabian Alejandro Hernandez Martinez", seccion: "Segundo año seccion B", genero: "Masculino", asistencias: {} },

  { id: 92, cedula: "V-36145249", nombre: "William Jose Rojas Danzer", seccion: "Segundo año seccion B", genero: "Masculino", asistencias: {} },

  { id: 93, cedula: "V-36153186", nombre: "Jesseannys Gabriela Diaz Moreno", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 94, cedula: "V-36565395", nombre: "Roxana Valentina Pacheco Palomo", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 95, cedula: "V-37132564", nombre: "Camilo Eduardo Araque Herrera", seccion: "Segundo año seccion B", genero: "Masculino", asistencias: {} },

  { id: 96, cedula: "V-37507591", nombre: "Mary Alejandra Carrero Diaz", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 97, cedula: "V-11115335862", nombre: "Anthonella Jonielys Flores Giralda", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 98, cedula: "V-11218073541", nombre: "Kleviannys Avila Palomares Martinez", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 99, cedula: "V-11219859622", nombre: "Michell Liliannys Meza Leon", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 100, cedula: "V-11221096890", nombre: "Josman Octavio Bermudez Acosta", seccion: "Segundo año seccion B", genero: "Masculino", asistencias: {} },

  { id: 101, cedula: "V-11221385005", nombre: "Kamila Sofia Olivares Guerras", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 102, cedula: "V-11320160059", nombre: "Jhade Danilys Milanos Diaz", seccion: "Segundo año seccion B", genero: "Femenino", asistencias: {} },

  { id: 103, cedula: "V-33729393", nombre: "Ivana Jeanaly Jimenez Purgarita", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 104, cedula: "V-33941112", nombre: "Rene Alejandro Delgado Pinto", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 105, cedula: "V-33949632", nombre: "Jose Alejandro Correa Martinez", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 106, cedula: "V-34023386", nombre: "Darignis Carixa Marcano Hernandez", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 107, cedula: "V-34023390", nombre: "Natasha Ashleannys Del Valle", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 108, cedula: "V-34029368", nombre: "Alejandro Josue Carrion Bolaños", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 109, cedula: "V-34029377", nombre: "Gabriela Alexandra Herrera Ramirez", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 110, cedula: "V-34029384", nombre: "Lisyeli Eluney Brito Morillo", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 111, cedula: "V-34036725", nombre: "Dionnys Emiliano Salguera Prada", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 112, cedula: "V-34056469", nombre: "Jessi Del Jesus Carrasquel Berra", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 113, cedula: "V-34056487", nombre: "Mayha Victoria Lopez Ramirez", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 114, cedula: "V-34056489", nombre: "Jean Franco Reyes Malpica", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 115, cedula: "V-34070313", nombre: "Jesus Manuel Pacheco Palomo", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 116, cedula: "V-34070345", nombre: "Lucio Jonas Medina Muñoz", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 117, cedula: "V-34112968", nombre: "Anthony Davier Robles Quintero", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 118, cedula: "V-34127348", nombre: "Yadmerys Celiannys Mata Benavides", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 119, cedula: "V-34149656", nombre: "Carlos Beltran Vasquez Gonzalez", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 120, cedula: "V-34189234", nombre: "Aida Rosangela Malave Gonzalez", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 121, cedula: "V-34207682", nombre: "Yorger Jose Martinez Rodriguez", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 122, cedula: "V-34211059", nombre: "Gabriel Emilio Gomez Jimenez", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 123, cedula: "V-34211065", nombre: "Bibiannys Del Jesus Brito Gutierrez", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 124, cedula: "V-34474299", nombre: "Miguel Henrique Estaba Figuera", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 125, cedula: "V-34593527", nombre: "Josue David Rivera Romero", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 126, cedula: "V-34601810", nombre: "Daniel Antonio Rivero Gomez", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 127, cedula: "V-34650113", nombre: "Jesus Antonio Silva Lopez", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 128, cedula: "V-34852479", nombre: "Yoselin Anahelys Heredia Valenzuela", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 129, cedula: "V-35151722", nombre: "Emiliano Rafael Zambrano Celis", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

  { id: 130, cedula: "V-11116215202", nombre: "Litjania De Los Angeles Gonzalez Sarabia", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 131, cedula: "V-11125672992", nombre: "Jexulys Ariannys Fernandez Perez", seccion: "Tercer año seccion U", genero: "Femenino", asistencias: {} },

  { id: 132, cedula: "V-11221082784", nombre: "Sebastian Jose Moreno Mendoza", seccion: "Tercer año seccion U", genero: "Masculino", asistencias: {} },

];

// Persistencia en LocalStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios_simonbolivar')) || usuariosIniciales;
let solicitudesRegistro = JSON.parse(localStorage.getItem('solicitudes_registro_sb')) || [];
let solicitudesRecuperacion = JSON.parse(localStorage.getItem('solicitudes_recuperacion_sb')) || [];
let estudiantes = JSON.parse(localStorage.getItem('registroEstudiantes')) || estudiantesIniciales;
let usuarioAutenticado = null;

function guardarUsuarios() {
  localStorage.setItem('usuarios_simonbolivar', JSON.stringify(usuarios));
}

function guardarSolicitudesRegistro() {
  localStorage.setItem('solicitudes_registro_sb', JSON.stringify(solicitudesRegistro));
}

function guardarSolicitudesRecuperacion() {
  localStorage.setItem('solicitudes_recuperacion_sb', JSON.stringify(solicitudesRecuperacion));
}

function guardarEstudiantes() {
  localStorage.setItem('registroEstudiantes', JSON.stringify(estudiantes));
}

// ==========================================================================
// 2. CONTROLADOR PRINCIPAL Y NAVEGACIÓN
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const pantallaLogin = document.getElementById("pantalla-login");
  const sistemaPrincipal = document.getElementById("sistema-principal");
  const loginForm = document.getElementById("login-form");
  const regDocenteForm = document.getElementById("registro-docente-form");
  const recuperarForm = document.getElementById("recuperar-form");
  const cambiarPassForm = document.getElementById("cambiar-pass-form");

  const linkRegistro = document.getElementById("link-registro");
  const linkOlvido = document.getElementById("link-olvido");
  const linksVolver = document.querySelectorAll(".link-volver-login");
  const btnAbrirCambioPass = document.getElementById("btn-abrir-cambio-pass");
  const btnLogout = document.getElementById("btn-logout");

  const panelControlEstudio = document.getElementById("panel-control-estudio");
  const infoSesionUsuario = document.getElementById("info-sesion-usuario");
  const registroEstudianteForm = document.getElementById("registro-estudiante-form");
  const inputBuscar = document.getElementById("input-buscar");
  const btnPasarAno = document.getElementById("btn-pasar-ano");
  const btnCambiarSeccion = document.getElementById("btn-cambiar-seccion");
  const btnImprimir = document.getElementById("btn-imprimir-main");

  // Crear e insertar el selector de colores de asistencia arriba de la tabla
  insertarSelectorAsistenciaUI();

  function ocultarAuthForms() {
    loginForm.classList.add("oculto");
    regDocenteForm.classList.add("oculto");
    recuperarForm.classList.add("oculto");
    cambiarPassForm.classList.add("oculto");
    limpiarMensajes();
  }

  function limpiarMensajes() {
    document.querySelectorAll(".mensaje-error, .mensaje-exito").forEach(div => div.textContent = "");
  }

  linkRegistro.addEventListener("click", (e) => {
    e.preventDefault();
    ocultarAuthForms();
    regDocenteForm.classList.remove("oculto");
  });

  linkOlvido.addEventListener("click", (e) => {
    e.preventDefault();
    ocultarAuthForms();
    recuperarForm.classList.remove("oculto");
  });

  linksVolver.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      ocultarAuthForms();
      loginForm.classList.remove("oculto");
    });
  });

  btnAbrirCambioPass.addEventListener("click", () => {
    sistemaPrincipal.classList.add("oculto");
    pantallaLogin.classList.remove("oculto");
    ocultarAuthForms();
    cambiarPassForm.classList.remove("oculto");
    document.getElementById("chg-usuario").value = usuarioAutenticado ? usuarioAutenticado.usuario : "";
  });

  // ==========================================================================
  // 3. LOGICA DE AUTENTICACIÓN Y ROLES
  // ==========================================================================

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = document.getElementById("usuario").value.trim().toLowerCase();
    const passInput = document.getElementById("password").value.trim();
    const errorDiv = document.getElementById("login-error");

    const usuarioEncontrado = usuarios.find(u => 
      (u.usuario.toLowerCase() === userInput || u.cedula.toLowerCase() === userInput) && 
      u.password === passInput
    );

    if (!usuarioEncontrado) {
      errorDiv.textContent = "Credenciales incorrectas o usuario no registrado.";
      return;
    }

    if (usuarioEncontrado.estado === "pendiente") {
      errorDiv.textContent = "Su cuenta está pendiente de aprobación por Control de Estudio.";
      return;
    }

    if (usuarioEncontrado.estado === "bloqueado") {
      errorDiv.textContent = "Su cuenta ha sido inhabilitada por Control de Estudio.";
      return;
    }

    usuarioAutenticado = usuarioEncontrado;
    iniciarSesionSistema();
  });

  function iniciarSesionSistema() {
    pantallaLogin.classList.add("oculto");
    sistemaPrincipal.classList.remove("oculto");

    infoSesionUsuario.textContent = `Docente: ${usuarioAutenticado.nombre} | Rol: ${usuarioAutenticado.rol === 'control_estudio' ? 'Control de Estudio (Administrador)' : 'Profesor de ' + usuarioAutenticado.materia}`;

    if (usuarioAutenticado.rol === "control_estudio") {
      panelControlEstudio.classList.remove("oculto");
      renderizarPanelControlEstudio();
    } else {
      panelControlEstudio.classList.add("oculto");
    }

    renderizarTabla();
  }

  btnLogout.addEventListener("click", () => {
    usuarioAutenticado = null;
    sistemaPrincipal.classList.add("oculto");
    pantallaLogin.classList.remove("oculto");
    ocultarAuthForms();
    loginForm.classList.remove("oculto");
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
  });

  regDocenteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("reg-nombre").value.trim();
    const cedula = document.getElementById("reg-cedula").value.trim();
    const usuarioStr = document.getElementById("reg-usuario").value.trim().toLowerCase();
    const materia = document.getElementById("reg-materia").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const errorDiv = document.getElementById("registro-error");

    const existe = usuarios.some(u => u.usuario.toLowerCase() === usuarioStr || u.cedula.toLowerCase() === cedula.toLowerCase());
    if (existe) {
      errorDiv.textContent = "El usuario o cédula ya se encuentra registrado.";
      return;
    }

    solicitudesRegistro.push({
      id: Date.now(),
      nombre,
      cedula,
      usuario: usuarioStr,
      materia,
      password,
      fecha: new Date().toLocaleDateString()
    });
    guardarSolicitudesRegistro();

    regDocenteForm.reset();
    alert("Solicitud de registro enviada con éxito. Control de Estudio debe verificar su cuenta.");
    ocultarAuthForms();
    loginForm.classList.remove("oculto");
  });

  recuperarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = document.getElementById("rec-usuario").value.trim().toLowerCase();
    const errorDiv = document.getElementById("recuperar-error");
    const exitoDiv = document.getElementById("recuperar-exito");

    const usuarioExiste = usuarios.find(u => u.usuario.toLowerCase() === userInput || u.cedula.toLowerCase() === userInput);

    if (!usuarioExiste) {
      errorDiv.textContent = "No existe un usuario registrado con esos datos.";
      return;
    }

    const yaSolicitado = solicitudesRecuperacion.some(s => s.usuarioId === usuarioExiste.id);
    if (yaSolicitado) {
      exitoDiv.textContent = "Ya existe una solicitud pendiente para este usuario.";
      return;
    }

    solicitudesRecuperacion.push({
      id: Date.now(),
      usuarioId: usuarioExiste.id,
      nombre: usuarioExiste.nombre,
      cedula: usuarioExiste.cedula,
      usuario: usuarioExiste.usuario
    });
    guardarSolicitudesRecuperacion();

    recuperarForm.reset();
    exitoDiv.textContent = "Solicitud enviada a Control de Estudio.";
  });

  cambiarPassForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = document.getElementById("chg-usuario").value.trim().toLowerCase();
    const passActual = document.getElementById("chg-actual").value.trim();
    const passNueva = document.getElementById("chg-nueva").value.trim();
    const errorDiv = document.getElementById("cambiar-error");
    const exitoDiv = document.getElementById("cambiar-exito");

    const userObj = usuarios.find(u => u.usuario.toLowerCase() === userInput && u.password === passActual);

    if (!userObj) {
      errorDiv.textContent = "El usuario o la contraseña actual son incorrectos.";
      return;
    }

    userObj.password = passNueva;
    guardarUsuarios();

    cambiarPassForm.reset();
    exitoDiv.textContent = "Contraseña actualizada exitosamente.";
  });

  // ==========================================================================
  // 4. FUNCIONALIDADES ADMINISTRATIVAS (CONTROL DE ESTUDIO)
  // ==========================================================================

  window.renderizarPanelControlEstudio = function() {
    const tbodyReg = document.getElementById("tabla-solicitudes-cuerpo");
    const tbodyRec = document.getElementById("tabla-recuperaciones-cuerpo");

    tbodyReg.innerHTML = "";
    tbodyRec.innerHTML = "";

    if (solicitudesRegistro.length === 0) {
      tbodyReg.innerHTML = `<tr><td colspan="4" style="color:#777;">No hay registros pendientes.</td></tr>`;
    } else {
      solicitudesRegistro.forEach(sol => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${sol.nombre}</strong></td>
          <td>${sol.cedula}</td>
          <td>${sol.materia}</td>
          <td>
            <button class="btn-aprobar" onclick="aprobarRegistro(${sol.id})">Aprobar</button>
            <button class="btn-rechazar" onclick="rechazarRegistro(${sol.id})">Rechazar</button>
          </td>
        `;
        tbodyReg.appendChild(tr);
      });
    }

    if (solicitudesRecuperacion.length === 0) {
      tbodyRec.innerHTML = `<tr><td colspan="3" style="color:#777;">No hay solicitudes de clave.</td></tr>`;
    } else {
      solicitudesRecuperacion.forEach(rec => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${rec.nombre}</strong></td>
          <td>${rec.cedula}</td>
          <td>
            <button class="btn-aprobar" onclick="restablecerClave(${rec.id})">Resetear Clave</button>
          </td>
        `;
        tbodyRec.appendChild(tr);
      });
    }
  };

  window.aprobarRegistro = function(id) {
    const solicitud = solicitudesRegistro.find(s => s.id === id);
    if (!solicitud) return;

    usuarios.push({
      id: Date.now(),
      usuario: solicitud.usuario,
      password: solicitud.password,
      nombre: solicitud.nombre,
      cedula: solicitud.cedula,
      rol: "profesor",
      materia: solicitud.materia,
      estado: "activo"
    });

    solicitudesRegistro = solicitudesRegistro.filter(s => s.id !== id);
    guardarUsuarios();
    guardarSolicitudesRegistro();
    renderizarPanelControlEstudio();
    alert(`Docente ${solicitud.nombre} aprobado con éxito.`);
  };

  window.rechazarRegistro = function(id) {
    if (confirm("¿Desea rechazar esta solicitud?")) {
      solicitudesRegistro = solicitudesRegistro.filter(s => s.id !== id);
      guardarSolicitudesRegistro();
      renderizarPanelControlEstudio();
    }
  };

  window.restablecerClave = function(id) {
    const solicitud = solicitudesRecuperacion.find(s => s.id === id);
    if (!solicitud) return;

    const nuevaClave = prompt(`Ingrese la NUEVA contraseña para el docente ${solicitud.nombre}:`, "Bolivar2026");
    if (!nuevaClave) return;

    const uObj = usuarios.find(u => u.id === solicitud.usuarioId);
    if (uObj) {
      uObj.password = nuevaClave.trim();
      guardarUsuarios();
    }

    solicitudesRecuperacion = solicitudesRecuperacion.filter(s => s.id !== id);
    guardarSolicitudesRecuperacion();
    renderizarPanelControlEstudio();
    alert(`Contraseña restablecida exitosamente.`);
  };

  // ==========================================================================
  // 5. GESTIÓN DE ESTUDIANTES Y ASISTENCIA
  // ==========================================================================

  registroEstudianteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const seccion = document.getElementById("seccion").value.trim();

    estudiantes.push({
      id: Date.now(),
      cedula,
      nombre,
      seccion,
      asistencias: {}
    });

    guardarEstudiantes();
    registroEstudianteForm.reset();
    renderizarTabla(inputBuscar.value);
  });

  inputBuscar.addEventListener("input", () => {
    renderizarTabla(inputBuscar.value);
  });

  btnPasarAno.addEventListener("click", () => {
    const secciones = [...new Set(estudiantes.map(e => e.seccion))];
    if (secciones.length === 0) return alert("No hay secciones.");

    const seccionElegida = prompt(`¿De cuál sección desea pasar estudiantes de año?\nSecciones:\n- ${secciones.join("\n- ")}`);
    if (!seccionElegida) return;

    const listaSeccion = estudiantes.filter(e => e.seccion.toLowerCase() === seccionElegida.trim().toLowerCase());
    if (listaSeccion.length === 0) return alert("Sin estudiantes en esa sección.");

    const nuevoAnoGlobal = prompt("Ingrese la NUEVA sección/año asignada:");
    if (!nuevoAnoGlobal) return;

    listaSeccion.forEach(est => {
      est.seccion = nuevoAnoGlobal;
    });

    guardarEstudiantes();
    renderizarTabla(inputBuscar.value);
    alert("Estudiantes actualizados de año exitosamente.");
  });

  btnCambiarSeccion.addEventListener("click", () => {
    const secciones = [...new Set(estudiantes.map(e => e.seccion))];
    if (secciones.length === 0) return alert("No hay secciones.");

    const seccionOrigen = prompt(`Sección actual a modificar:\n- ${secciones.join("\n- ")}`);
    if (!seccionOrigen) return;

    const listaSeccion = estudiantes.filter(e => e.seccion.toLowerCase() === seccionOrigen.trim().toLowerCase());
    if (listaSeccion.length === 0) return alert("Sin resultados.");

    const nuevaSec = prompt("Nueva Sección para estos estudiantes:");
    if (!nuevaSec) return;

    listaSeccion.forEach(est => {
      est.seccion = nuevaSec;
    });

    guardarEstudiantes();
    renderizarTabla(inputBuscar.value);
    alert("Sección cambiada exitosamente.");
  });

  btnImprimir.addEventListener("click", () => {
    window.print();
  });
});

// ==========================================================================
// 6. SELECTOR DE ASISTENCIA Y RENDERIZADO DE CELDAS CON COLORES
// ==========================================================================

function insertarSelectorAsistenciaUI() {
  const contenedorBuscador = document.querySelector(".contenedor-buscador");
  if (!contenedorBuscador) return;

  const divSelector = document.createElement("div");
  divSelector.className = "selector-asistencia-container";
  divSelector.innerHTML = `
    <label for="select-color-asistencia">🎨 Seleccione el estatus a marcar:</label>
    <select id="select-color-asistencia">
      <option value="verde">🟢 Asistente (Verde)</option>
      <option value="rojo">🔴 Inasistente (Rojo)</option>
      <option value="morado">🟣 Ausente / Permiso (Morado)</option>
      <option value="vacio">⚪ Borrar / Sin marcar (Blanco)</option>
    </select>
  `;
  contenedorBuscador.parentNode.insertBefore(divSelector, contenedorBuscador.nextSibling);
}

function renderizarTabla(filtro = "") {
  const tbody = document.getElementById("tabla-cuerpo");
  tbody.innerHTML = "";

  const busqueda = filtro.toLowerCase().trim();
  const estudiantesFiltrados = estudiantes.filter(est => 
    est.nombre.toLowerCase().includes(busqueda) || 
    est.cedula.toLowerCase().includes(busqueda)
  );

  if (estudiantesFiltrados.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="66" class="sin-resultados">Estudiante no encontrado en el sistema.</td>`;
    tbody.appendChild(tr);
    return;
  }

  estudiantesFiltrados.forEach((est, index) => {
    const tr = document.createElement("tr");

    // Asegurar estructura de asistencias si no existe
    if (!est.asistencias) est.asistencias = {};

    let casillasHTML = "";
    for (let i = 1; i <= 60; i++) {
      const estadoColor = est.asistencias[i] || "vacio";
      casillasHTML += `<td class="celda-asistencia asistencia-${estadoColor}" data-estudiante-id="${est.id}" data-casilla-index="${i}" onclick="marcarAsistencia(this)"></td>`;
    }

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <input type="text" class="input-cedula-edit" value="${est.cedula}" onchange="actualizarCedula(${est.id}, this.value)">
      </td>
      <td>${est.nombre}</td>
      <td>${est.genero || 'N/D'}</td>
      <td>${est.seccion}</td>
      ${casillasHTML}
      <td class="col-acciones">
        <button class="btn-eliminar" onclick="eliminarEstudiante(${est.id})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Función interactiva al hacer clic en una casilla de la tabla
window.marcarAsistencia = function(celda) {
  const estudianteId = parseInt(celda.getAttribute("data-estudiante-id"));
  const casillaIndex = parseInt(celda.getAttribute("data-casilla-index"));
  
  const selectColor = document.getElementById("select-color-asistencia");
  const colorSeleccionado = selectColor ? selectColor.value : "verde";

  const estudiante = estudiantes.find(e => e.id === estudianteId);
  if (!estudiante) return;

  if (!estudiante.asistencias) {
    estudiante.asistencias = {};
  }

  // Actualizar o limpiar el estatus
  if (colorSeleccionado === "vacio") {
    delete estudiante.asistencias[casillaIndex];
    celda.className = "celda-asistencia asistencia-vacio";
  } else {
    estudiante.asistencias[casillaIndex] = colorSeleccionado;
    celda.className = `celda-asistencia asistencia-${colorSeleccionado}`;
  }

  // Guardar automáticamente en LocalStorage
  guardarEstudiantes();
};

window.actualizarCedula = function(id, nuevaCedula) {
  const estudiante = estudiantes.find(e => e.id === id);
  if (estudiante) {
    estudiante.cedula = nuevaCedula.trim();
    guardarEstudiantes();
  }
};

window.eliminarEstudiante = function(id) {
  if (confirm("¿Desea eliminar a este estudiante del listado oficial?")) {
    estudiantes = estudiantes.filter(e => e.id !== id);
    guardarEstudiantes();
    renderizarTabla(document.getElementById("input-buscar").value);
  }
};

//Esta es la parte para guardar todos los datos de los estudiantes

function marcarAsistencia(celda) {

  guardarDatos();
}