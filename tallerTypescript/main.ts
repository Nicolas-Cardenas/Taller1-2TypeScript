import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';


import{ dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const nombre: HTMLElement = document.getElementById("nombre")!;
const codigo: HTMLElement = document.getElementById("codigo")!;
const cedula: HTMLElement = document.getElementById("cedula")!;
const edad: HTMLElement = document.getElementById("edad")!;
const direccion: HTMLElement = document.getElementById("direccion")!;
const telefono: HTMLElement = document.getElementById("telefono")!;
const imagen: HTMLElement = document.getElementById("imagen")!;
const buscarPorRango: HTMLInputElement = <HTMLInputElement> document.getElementById("rango")!;
const alto: HTMLInputElement = <HTMLInputElement> document.getElementById("alto")!;
const bajo: HTMLInputElement = <HTMLInputElement> document.getElementById("bajo")!;


buscarPorRango.onclick = () => applyFilterByRango();
btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

nombre.innerHTML = dataStudent.nombre;
codigo.innerHTML = `${dataStudent.codigo}`
cedula.innerHTML = `${dataStudent.cedula}`
edad.innerHTML = dataStudent.edad;
direccion.innerHTML = dataStudent.direccion;
telefono.innerHTML = `${dataStudent.telefono}`
imagen.innerHTML = dataStudent.imagen;




function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByRango() {
  let valoralto = alto.value;
  let valorbajo = bajo.value;
  

  valoralto = (valoralto == null) ? '' : valoralto;
  valorbajo = (valorbajo == null) ? '' : valorbajo;
  clearCoursesInTable();

  var jalto = +valoralto;
  var jbajo = +valorbajo;

  let coursesFiltered: Course[] = searchCourseRangoAlto(jalto,dataCourses);
  let coursesFiltered2: Course[] = searchCourseRangoBajo(jbajo, coursesFiltered);
  renderCoursesInTable(coursesFiltered2);
}
function searchCourseRangoAlto(palto:number, courses: Course[])
{ 
   return courses.filter (c => c.credits <= palto);
}
function searchCourseRangoBajo(pbajo:number, courses: Course[])
{
   return courses.filter (c => c.credits >= pbajo);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
 
}