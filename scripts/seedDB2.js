const mongoose = require("mongoose")
const db = require("../models")

// This file empties the collection and inserts

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/labdb")

const ramasSeed = [
  {
    claverama: "AR",
    nombrerama: "Aguas Residuales",
    tipodeestudio: ["01", "02", "03"]
  },
  {
    claverama: "FF",
    nombrerama: "Fuentes Fijas",
    tipodeestudio: ["01", "02", "03"]
  }
]

const tiposdeestudioSeed = [
  {
    clave: "200",
    nombretipodeestudio:
      "Estudio Isocinético de partículas. NOM-043-SEMARNAT-1993",
    descripcion: "Estudio isocinético de partículas",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993, SCFI",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978"
    ]
  },
  {
    clave: "201",
    nombretipodeestudio:
      "Estudio Isocinético de patículas y Voc's por cromatografía de gases NOM-043-SEMARNAT-1993 y EPA METODO 18",
    descripcion:
      "Estudio Isocinético de patículas y Voc's por cromatografía de gases",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 18"
    ]
  },
  {
    clave: "202",
    nombretipodeestudio:
      "Estudio Isocinético de patícUlas y Voc's por ionización de flama NOM-043-SEMARNAT-1993 y EPA METODO 25-A",
    descripcion:
      "Estudio Isocinético de patícUlas y Voc's por ionización de flama",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 25A"
    ]
  },
  {
    clave: "203",
    nombretipodeestudio:
      "Estudio de gases de combustión para equipos menores a 150 C.C., Combustible Gas, según la NOM-085-SEMARNAT-2011",
    descripcion:
      "Estudio de gases de combustión para equipos menores a 150 C.C., Combustible Gas",
    nombrerama: "Fuentes Fijas",
    metodos: ["EPA METODO 3A-2008", "EPA METODO 10-2008"]
  },
  {
    clave: "204",
    nombretipodeestudio:
      "Estudio de gases de combustión para equipos menores a 150 C.C., Combustible Líquido, según la NOM-085-SEMARNAT-2011",
    descripcion:
      "Estudio de gases de combustión para equipos menores a 150 C.C., Combustible Liquido",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "EPA METODO 3A-2008",
      "EPA METODO 10-2008",
      "EPA METODO 6C-2008",
      "NMX-AA-114-1991"
    ]
  },
  {
    clave: "205",
    nombretipodeestudio:
      "Estudio de gases de combustión para equipos mayores a 150 C.C., Combustible Gas, según la NOM-085-SEMARNAT-2011",
    descripcion:
      "Estudio de gases de combustión para equipos mayores a 150 C.C., Combustible Gas",
    nombrerama: "Fuentes Fijas",
    metodos: ["EPA METODO 3A-2008", "EPA METODO 10-2008", "EPA METODO 7 E-2008"]
  },
  {
    clave: "206",
    nombretipodeestudio:
      "Estudio de gases de combustión para equipos mayores a 150 C.C., Combustible Líquido, según la NOM-085-SEMARNAT-2011",
    descripcion:
      "Estudio de gases de combustión para equipos mayores a 150 C.C., Combustible Líquido",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 3A-2008",
      "EPA METODO 6C-2008",
      "EPA METODO 7E-2008",
      "EPA METODO 10-2008"
    ]
  },
  {
    clave: "207",
    nombretipodeestudio:
      "Estudio de gases de combustión para equipos de 5 C.C. a 15 C.C, en la CDMX NADF-016-AMBT-2016",
    descripcion:
      "Estudio de gases de combustión para equipos de 5 C.C. a 15 C.C",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 3A-2008",
      "EPA METODO 10-2008",
      "EPA METODO 6C-2008",
      "NMX-AA-114-1991",
      "NMX-AA-055-1979"
    ]
  },
  {
    clave: "208",
    nombretipodeestudio:
      "Estudio de emisiones de hornos crematorios e incineración de cadáveres en la CDMX NADF-017-AIRE-2017",
    descripcion:
      "Estudio de emisiones de hornos crematorios e incineración de cadáveres en la CDMX",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 3A-2008",
      "EPA METODO 10-2008",
      "NMX-AA-055-1979"
    ]
  },
  {
    clave: "209",
    nombretipodeestudio:
      "Estudio isocinético de partículas condensables como grasas y aceites NOM-043-SEMARNAT-1993 EPA METODO 202",
    descripcion:
      "Estudio isocinético de partículas condensables como grasas y aceites",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 202"
    ]
  },
  {
    clave: "210",
    nombretipodeestudio:
      "Estudio isocinético de partículas menores a 10 µm NOM-043-SEMARNAT-1993 EPA METODO 201-A",
    descripcion: "Estudio isocinético de partículas menores a 10 µm",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 201 A"
    ]
  },
  {
    clave: "211",
    nombretipodeestudio:
      "Estudio para determinar neblinas de Bíoxido de Azufre NMX-AA-055-1979",
    descripcion: "Estudio para determinar neblinas de Bíoxido de Azufre",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "NMX-AA-055-1979"
    ]
  },
  {
    clave: "212",
    nombretipodeestudio:
      "Estudio para determinar neblinas de Bíoxido de Azufre y Ácido Sulfúrico NMX-AA-056-1980",
    descripcion:
      "Estudio para determinar neblinas de Bíoxido de Azufre y Ácido Sulfúrico",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "NMX-AA-056-1980"
    ]
  },
  {
    clave: "213",
    nombretipodeestudio:
      "Estudio para determinar neblinas de Cloro y Cloruros NMX-AA-070-1980",
    descripcion: "Estudio para determinar neblinas de Cloro y Cloruros",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "NMX-AA-070-1980"
    ]
  },
  {
    clave: "214",
    nombretipodeestudio:
      "Estudio para determinar neblinas de Ácido Fosfórico NMX-AA-090-1986",
    descripcion: "Estudio para determinar neblinas de Ácido Fosfórico",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-010-SCFI-2001",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "NMX-AA-090-1986"
    ]
  },
  {
    clave: "215",
    nombretipodeestudio:
      "Estudio para determinar neblinas de Amoniaco NMX-AA-097-1986",
    descripcion: "Estudio para determinar neblinas de Amoniaco",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "NMX-AA-097-1986"
    ]
  },
  {
    clave: "216",
    nombretipodeestudio:
      "Estudio para determinár compuestos orgánicos volátiles por cromatografía de gases EPA METODO 18",
    descripcion:
      "Estudio para determinár compuestos orgánicos volátiles por cromatografía de gases",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 18"
    ]
  },
  {
    clave: "217",
    nombretipodeestudio:
      "Estudio para determinár compuestos orgánicos volétiles por ionización de flama EPA METODO 25-A",
    descripcion:
      "Estudio para determinár compuestos orgánicos volétiles por ionización de flama",
    nombrerama: "Fuentes Fijas",
    metodos: [
      "NMX-AA-009-1993-SCFI",
      "NMX-AA-035-1976",
      "NMX-AA-054-1978",
      "EPA METODO 25-A"
    ]
  },
  {
    clave: "218",
    nombretipodeestudio:
      "Ruido perimetral de fuente fija NOM-081-SEMARNAT-1994",
    descripcion: "Ruido perimetral de fuente fija",
    nombrerama: "Fuentes Fijas",
    metodos: ["NOM-081-SEMARNAT-1994"]
  },
  {
    clave: "219",
    nombretipodeestudio:
      "Ruido perimetral de fuente fija en la CDMX NADF-005-AMBT-2013",
    descripcion: "Ruido perimetral de fuente fija en la CDMX",
    nombrerama: "Fuentes Fijas",
    metodos: ["NADF-005-AMBT-2013"]
  },
  {
    clave: "400",
    nombretipodeestudio: "NOM-002-SEMARNAT-1996",
    descripcion: "NOM-002-SEMARNAT-1996",
    nombrerama: "Aguas Residuales",
    metodos: [
      "Estudio de aguas residuales con descarga a drenaje de red municipal"
    ]
  },
  {
    clave: "401",
    nombretipodeestudio: "NADF-015-AGUA-2015",
    descripcion: "NADF-015-AGUA-2015",
    nombrerama: "Aguas Residuales",
    metodos: [
      "Estudio de aguas residuales con descarga a drenaje de la Ciudad de México"
    ]
  },
  {
    clave: "402",
    nombretipodeestudio: "CONDICIONES PARTICULARES DE DESCARGA",
    descripcion: "CONDICIONES PARTICULARES DE DESCARGA",
    nombrerama: "Aguas Residuales",
    metodos: ["CONDICIONES PARTICULARES DE DESCARGA"]
  }
]

const metodosSeed = [
  {
    clave: "MTD-001",
    nombremetodo: "EPA METODO 10-2008"
  },
  {
    clave: "MTD-002",
    nombremetodo: "EPA METODO 18"
  },
  {
    clave: "MTD-003",
    nombremetodo: "EPA METODO 201 A"
  },
  {
    clave: "MTD-004",
    nombremetodo: "EPA METODO 202"
  },
  {
    clave: "MTD-005",
    nombremetodo: "EPA METODO 25-A"
  },
  {
    clave: "MTD-006",
    nombremetodo: "EPA METODO 3A-2008"
  },
  {
    clave: "MTD-007",
    nombremetodo: "EPA METODO 6C-2008"
  },
  {
    clave: "MTD-008",
    nombremetodo: "EPA METODO 7E-2008"
  },
  {
    clave: "MTD-009",
    nombremetodo: "NADF-005-AMBT-2013"
  },
  {
    clave: "MTD-010",
    nombremetodo: "NMX-AA-009-1993-SCFI"
  },
  {
    clave: "MTD-011",
    nombremetodo: "NMX-AA-010-SCFI-2001"
  },
  {
    clave: "MTD-012",
    nombremetodo: "NMX-AA-035-1976"
  },
  {
    clave: "MTD-013",
    nombremetodo: "NMX-AA-054-1978"
  },
  {
    clave: "MTD-014",
    nombremetodo: "NMX-AA-055-1979"
  },
  {
    clave: "MTD-015",
    nombremetodo: "NMX-AA-056-1980"
  },
  {
    clave: "MTD-016",
    nombremetodo: "NMX-AA-070-1980"
  },
  {
    clave: "MTD-017",
    nombremetodo: "NMX-AA-090-1986"
  },
  {
    clave: "MTD-018",
    nombremetodo: "NMX-AA-097-1986"
  },
  {
    clave: "MTD-019",
    nombremetodo: "NMX-AA-114-1991"
  },
  {
    clave: "MTD-020",
    nombremetodo: "NOM-081-SEMARNAT-1994"
  },
  {
    clave: "MTD-021",
    nombremetodo:
      "Estudio de aguas residuales con descarga a drenaje de red municipal"
  },
  {
    clave: "MTD-022",
    nombremetodo:
      "Estudio de aguas residuales con descarga a drenaje de la Ciudad de México"
  },
  {
    clave: "MTD-023",
    nombremetodo: "Condiciones Particulares de Descarga"
  }
]

const signatariosSeed = [
  {
    clave: "JOMJ",
    nombresignatario: "BIOL. JOSE OLIVER MIRANDA JURADO",
    contrasena: "lab1234"
  },
  // {
  //   clave: "JLCC",
  //   nombresignatario: "C.P. JOSE LUIS CASTILLO CARBAJAL",
  //   contrasena: "lab1234"
  // },
  {
    clave: "EMP",
    nombresignatario: "EDITH MOJICA PEREZ",
    contrasena: "lab1234"
  },
  {
    clave: "AYB",
    nombresignatario: "ING. ALFREDO YAÑEZ BAEZ",
    contrasena: "lab1234"
  },
  {
    clave: "AMH",
    nombresignatario: "ING. ALVARO MENDEZ HERNANDEZ",
    contrasena: "lab1234"
  },
  {
    clave: "MLML",
    nombresignatario: "ING. MARÍA LIZBETH MANZANO LARA",
    contrasena: "lab1234"
  },
  {
    clave: "JAA",
    nombresignatario: "JORGE ARMENTA ALMONACID",
    contrasena: "lab1234"
  },
  {
    clave: "JMGA",
    nombresignatario: "JOSE MAURO GONZALEZ ALCÁNTARA",
    contrasena: "lab1234"
  },
  {
    clave: "JOMJ2",
    nombresignatario: "JOSE OLIVER MIRANDA JURADO",
    contrasena: "lab1234"
  },
  {
    clave: "JRGC",
    nombresignatario: "JOSE RICARDO GONZALEZ CASTILLO",
    contrasena: "lab1234"
  },
  {
    clave: "RLJM",
    nombresignatario: "ROCIO LIDIA JUAREZ MORAN",
    contrasena: "lab1234"
  },
  {
    clave: "RRG",
    nombresignatario: "RUBI REYNOSO GALLEGOS",
    contrasena: "lab1234"
  },
  {
    clave: "JMGA2",
    nombresignatario: "SR. JOSE MAURO GONZALEZ ALCANTARA",
    contrasena: "lab1234"
  },
  {
    clave: "SLLP",
    nombresignatario: "TSU STEPHANY LETICIA LEON PILOTZI",
    contrasena: "lab1234"
  }
]

db.Ramas.remove({})
  .then(() => db.Tipodeestudio.remove({}))
  .then(() => db.Metodos.remove({}))
  .then(() => db.Signatarios.remove({}))
  .then(() => db.Ramas.collection.insertMany(ramasSeed))
  .then(() => db.Tipodeestudio.collection.insertMany(tiposdeestudioSeed))
  .then(() => db.Metodos.collection.insertMany(metodosSeed))
  .then(() => db.Signatarios.collection.insertMany(signatariosSeed))

  .then(data => {
    console.log(data.result.n + " records inserted!")
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

// const mongoose = require("mongoose")
// const db = require("../models")

// // This file empties the collection and inserts

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/labdb")

// const ramasSeed = [
//   {
//     claverama: "AR",
//     nombrerama: "Aguas Residuales",
//     tipodeestudio: ["01", "02", "03"]
//   },
//   {
//     claverama: "FF",
//     nombrerama: "Fuentes Fijas",
//     tipodeestudio: ["01", "02", "03"]
//   },

// ]

// const tiposdeestudioSeed = [
//   {
//     clave: "200",
//     nombretipodeestudio:
//       "Estudio Isocinético de partículas. NOM-043-SEMARNAT-1993",
//     descripcion: "Estudio isocinético de partículas",
//     nombrerama: "Fuentes Fijas",
//     metodos: ["uno"]
//   },
//   {
//     clave: "201",
//     nombretipodeestudio: "NOM-043-SEMARNAT-1993",
//     descripcion:
//       "Estudio isocinético de partículas y Voc's por cromatografía de gases",
//     nombrerama: "Fuentes Fijas",
//     metodos: ["EPA MÉTODO 18"]
//   },
//   {
//     clave: "202",
//     nombretipodeestudio: "NOM-043-SEMARNAT-1993",
//     descripcion:
//       "Estudio isocinético de partículas y Voc's por ionización de flama",
//     nombrerama: "Fuentes Fijas",
//     metodos: ["EPA MÉTODO 25-A"]
//   },
//   {
//     clave: "01",
//     nombretipodeestudio: "primero",
//     descripcion: "primero descripcion",
//     nombrerama: "Aguas Residuales",
//     metodos: ["EPA MÉTODO 22"]
//   },
//   {
//     clave: "02",
//     nombretipodeestudio: "segundo",
//     descripcion: "segundo descripcion",
//     nombrerama: "Aguas Residuales",
//     metodos: ["EPA MÉTODO 44"]
//   },
//   {
//     clave: "03",
//     nombretipodeestudio: "tercero",
//     descripcion: "tercero descripcion",
//     nombrerama: "Aguas Residuales",
//     metodos: ["EPA MÉTODO 55"]
//   }
// ]

// const metodosSeed = [
//   {
//     clave: "uno",
//     nombremetodo: "uno",
//     signatario: ["Juan Perez", "Raul Juan"],
//     equipo: ["a"]
//   },
//   {
//     clave: "EPA MÉTODO 18",
//     nombremetodo: "EPA MÉTODO 18",
//     signatario: ["Rubi"],
//     equipo: ["b"]
//   },
//   {
//     clave: "EPA MÉTODO 25-A",
//     nombremetodo: "EPA MÉTODO 25-A",
//     signatario: ["Roberto", "Antonio"],
//     equipo: ["a"]
//   },
//   {
//     clave: "EPA MÉTODO 22",
//     nombremetodo: "EPA MÉTODO 22",
//     signatario: ["Luz"],
//     equipo: ["a"]
//   },
//   {
//     clave: "EPA MÉTODO 44",
//     nombremetodo: "EPA MÉTODO 44",
//     signatario: ["Mario"],
//     equipo: ["a"]
//   },
//   {
//     clave: "EPA MÉTODO 55",
//     nombremetodo: "EPA MÉTODO 55",
//     signatario: ["Tana"],
//     equipo: ["b"]
//   }
// ]

// const signatariosSeed = [
//   {
//     clave: "jp",
//     nombresignatario: "Juan Perez",
//     metodos: ["uno"],
//     contrasena: "jp2"
//   },
//   {
//     clave: "rj",
//     nombresignatario: "Raul Juan",
//     metodos: ["uno"],
//     contrasena: "rj2"
//   },
//   {
//     clave: "rb",
//     nombresignatario: "Rubi",
//     metodos: ["EPA MÉTODO 18"],
//     contrasena: "rb2"
//   },
//   {
//     clave: "rr",
//     nombresignatario: "Roberto",
//     metodos: ["EPA MÉTODO 25-A"],
//     contrasena: "rby2"
//   },
//   {
//     clave: "an",
//     nombresignatario: "Antonio",
//     metodos: ["uno"],
//     contrasena: "an2"
//   },
//   {
//     clave: "llv",
//     nombresignatario: "Luz",
//     metodos: ["EPA MÉTODO 22"],
//     contrasena: "ll"
//   },
//   {
//     clave: "mm",
//     nombresignatario: "Mario",
//     metodos: ["EPA MÉTODO 44"],
//     contrasena: "mm7"
//   },
//   {
//     clave: "tt",
//     nombresignatario: "Tana",
//     metodos: ["EPA MÉTODO 55"],
//     contrasena: "tt7"
//   }
// ]

// const equipoSeed = [
//   {
//     clave: "1a",
//     nombreequipo: "a",
//     marca: "losfera",
//     modelo: "55-b",
//     serie: "55"
//   },
//   {
//     clave: "1b",
//     nombreequipo: "b",
//     marca: "yuo",
//     modelo: "56-b",
//     serie: "56"
//   }
// ]

// db.Ramas.remove({})
//   .then(() => db.Tipodeestudio.remove({}))
//   .then(() => db.Metodos.remove({}))
//   .then(() => db.Signatarios.remove({}))
//   .then(() => db.Equipos.remove({}))
//   .then(() => db.Ramas.collection.insertMany(ramasSeed))
//   .then(() => db.Tipodeestudio.collection.insertMany(tiposdeestudioSeed))
//   .then(() => db.Metodos.collection.insertMany(metodosSeed))
//   .then(() => db.Signatarios.collection.insertMany(signatariosSeed))
//   .then(() => db.Equipos.collection.insertMany(equipoSeed))

//   .then(data => {
//     console.log(data.result.n + " records inserted!")
//     process.exit(0)
//   })
//   .catch(err => {
//     console.error(err)
//     process.exit(1)
//   })
