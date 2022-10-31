(() => {

const url = 'http://localhost:1109/products'
const titletable = ['ID', 'PRODUCTO', 'PRECIO', 'TIPO', 'STOCK', 'PRESC.' ,'ACCIONES'];
const tbody = document.querySelector('tbody')
const thead = document.querySelector('thead')
const titulomodal = document.getElementById('titulomodalproduct')
const modalproducto = new bootstrap.Modal(document.getElementById('modalproducto'))
const formproducto = document.getElementById('formproducto')
const nameproducto = document.getElementById('nameproducto')
const formprecio = document.getElementById('formprecio')
const formstock = document.getElementById('formstock')
const formanalgesico = document.getElementById('analgesico')
const formantibiotico = document.getElementById('antibiotico')
const formavitaminas = document.getElementById('vitamina')
let opcion = ''


document.getElementById('productos').addEventListener('click', () => {   
    let resultados = ''
    thead.innerHTML = '<tr>' + titletable.map(th => `<th>${th}</th>`).join('') + '</tr>'
    const mostrar = (productos) => {
        productos.forEach(product => {

            resultados += `
            <tr>
            <td>${product.product_id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.type}</td>
            <td>${product.stock}</td>
            <td>${product.sellable ? 'no' : 'si'}</td>
            <td class="text-center"><a class="btneditp btn btn-outline-success "><i class="bi bi-pencil-square"></i></a> <a class="btnborrarp btn btn-outline-danger "><i class="bi bi-trash"></i></a></td>           
            </tr> 
            `
        });
        tbody.innerHTML = resultados
    }
    addproducto.removeAttribute('hidden')
    addcliente.setAttribute('hidden' , 'hidden')

    fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

})

addproducto.addEventListener('click' , () => {
    nameproducto.value=''
    formprecio.value=''
    formstock.value=''
    opcion="crear"
    modalproducto.show()
})

on ( document , 'click' , '.btnborrarp' , e =>{
    const fila = e.target.parentNode.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm(`Seguro que quiere borrar el producto`,
        function () {
            fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => location.reload())
            alertify.success('Producto Eliminado');
        },
        function () {
            alertify.error('Cancel');
        });
})

let idform = 0

on(document, 'click', '.btneditp', e => {
    const fila = e.target.parentNode.parentNode.parentNode
    const idform = fila.children[0].innerHTML
    const nombre = fila.children[1].innerHTML
    const precio = fila.children[2].innerHTML
    const stock = fila.children[4].innerHTML
    let tipo =document.querySelector('input[name="radio"]:checked')   
    if ( fila.children[3].innerHTML == 'analgesico'){
        formanalgesico.stat
    } 

    nameproducto.value=nombre
    formprecio.value=precio
    formstock.value=stock
    console.log(idform)
    console.log(tipo)
    modalproducto.show()
    opcion='editar'
    
})

formproducto.addEventListener('submit' , (e) => {
    const fila = e.target.parentNode.parentNode.parentNode
    const idform = fila.children[0].innerHTML
})

})()