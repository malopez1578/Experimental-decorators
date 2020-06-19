// example atributos d eun objeto

let libro = Object.create({});

Object.defineProperty(libro, "titulo", {
  value: "La Ilíada",
  writable: false,
  enumerable: false,
  configurable: false
});

// console.log(libro.titulo);

interface Iexample {
  data: number;
}

// example decorador de un metodo

function trazar(target: Object, key: string, descriptor: any) {
  /* Cacheamos el método original para no perderlo */
  let descriptorOriginal = descriptor.value;
  descriptor.value = function(...args: any[]) {
    /* Aquí recuperamos el método original */
    let result = descriptorOriginal.apply(this, args);
    /* Trazamos lo que queramos */
    // console.log('Clase: ', target.constructor.name);
    // console.log('Método: ', key);
    // console.log('Características del método: ', descriptor);
    // console.log('Argumentos', args);
    args[0] = "mamita";
    /* Devolvemos el método original */
    return result;
  };

  return descriptor;
}

class Ejercicio {
  respuesta: string;
  constructor(respuesta: string) {
    this.respuesta = respuesta;
  }
  @trazar
  responder(respond: string, value?: Iexample) {
    this.respuesta = respond;
  }
  getRespuesta(): string {
    return this.respuesta;
  }
}
let ejercicio = new Ejercicio("hii");
ejercicio.responder("lol", { data: 2 });
// console.log(ejercicio.getRespuesta())

// example decorator Clase

function Specs(numGears: number, numWheels: number) {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      gears = numGears;
      wheels = numWheels;
    };
  };
}

@Specs(3, 4)
class Wagon {
  make: string;
  constructor(make: string) {
    this.make = make;
  }
}

console.log(new Wagon("Nissan"));
