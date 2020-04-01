import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var nombre = document.getElementById("nombre");
var codigo = document.getElementById("codigo");
var cedula = document.getElementById("cedula");
var edad = document.getElementById("edad");
var direccion = document.getElementById("direccion");
var telefono = document.getElementById("telefono");
var imagen = document.getElementById("imagen");
var buscarPorRango = document.getElementById("rango");
var alto = document.getElementById("alto");
var bajo = document.getElementById("bajo");
buscarPorRango.onclick = function () { return applyFilterByRango(); };
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
nombre.innerHTML = dataStudent.nombre;
codigo.innerHTML = "" + dataStudent.codigo;
cedula.innerHTML = "" + dataStudent.cedula;
edad.innerHTML = dataStudent.edad;
direccion.innerHTML = dataStudent.direccion;
telefono.innerHTML = "" + dataStudent.telefono;
imagen.innerHTML = dataStudent.imagen;
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByRango() {
    var valoralto = alto.value;
    var valorbajo = bajo.value;
    valoralto = (valoralto == null) ? '' : valoralto;
    valorbajo = (valorbajo == null) ? '' : valorbajo;
    clearCoursesInTable();
    var jalto = +valoralto;
    var jbajo = +valorbajo;
    var coursesFiltered = searchCourseRangoAlto(jalto, dataCourses);
    var coursesFiltered2 = searchCourseRangoBajo(jbajo, coursesFiltered);
    renderCoursesInTable(coursesFiltered2);
}
function searchCourseRangoAlto(palto, courses) {
    return courses.filter(function (c) { return c.credits <= palto; });
}
function searchCourseRangoBajo(pbajo, courses) {
    return courses.filter(function (c) { return c.credits >= pbajo; });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
