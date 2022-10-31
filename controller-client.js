const url = 'http://localhost:1109/clients'
const titletable = ['ID', 'NOMBRE', ' EMAIL', 'CI', 'PHONE', 'ACCIONES'];
const tbody = document.querySelector('tbody')
const thead = document.querySelector('thead')
const titulomodal = document.getElementById('titulomodal')
const modalcliente = new bootstrap.Modal(document.getElementById('modalcliente'))
const formcliente = document.getElementById('formclient')
const formnombre = document.getElementById('formnombre')
const formemail = document.getElementById('formemail')
const formphone = document.getElementById('formphone')
const formci = document.getElementById('formci')
let opcion = ''




document.getElementById('clientes').addEventListener('click', () => {
    thead.innerHTML = '<tr>' + titletable.map(th => `<th>${th}</th>`).join('') + '</tr>'
    let resultados = ''
    const mostrar = (clientes) => {
        clientes.forEach(cliente => {
            resultados += `
            <tr>
            <td>${cliente.client_id}</td>
            <td>${cliente.name}</td>
            <td>${cliente.email}</td>
            <td>${cliente.ci}</td>
            <td>${cliente.phone}</td>
            <td class="text-center"><a class="btneditc btn btn-outline-success "><i class="bi bi-pencil-square"></i></a> | <a class="btnborrarc btn btn-outline-danger "><i class="bi bi-trash"></i></a> </td>           
            </tr> 
            `
        });
        tbody.innerHTML = resultados
    }
    addcliente.removeAttribute('hidden')
    addproducto.setAttribute('hidden' , 'hidden')


    fetch(url)
        .then(response => response.json())
        .then(data => mostrar(data))
        .catch(error => console.log(error))

})

addcliente.addEventListener('click', () => {
    titulomodal.value = 'Ingreso nuevo cliente'
    formcliente.value = ''
    formnombre.value = ''
    formemail.value = ''
    formphone.value = ''
    formci.value = ''
    modalcliente.show()
    opcion ="crear"

})
const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

on(document, 'click', '.btnborrarc', e => {
    const fila = e.target.parentNode.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML

    alertify.confirm("This is a confirm dialog.",
        function () {
            fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => location.reload())
            alertify.success('Ok');
        },
        function () {
            alertify.error('Cancel');
        });
})

let idform = 0

on(document, 'click', '.btneditc', e => {
    const fila = e.target.parentNode.parentNode
    const idform = fila.children[0].innerHTML
    const nombre = fila.children[1].innerHTML
    const email = fila.children[2].innerHTML
    const phone = fila.children[3].innerHTML
    const ci = fila.children[4].innerHTML
    formnombre.value=nombre
    formemail.value=email
    formphone.value=phone
    formci.value=ci
    console.log(idform)
    modalcliente.show()
    opcion='editar'
    
})

formcliente.addEventListener('submit' , (e)=>{
    const fila = e.target.parentNode.parentNode.parentNode
    const idform = fila.children[0].innerHTML
    e.preventDefault()
    if(opcion == 'crear'){
     fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'      
        },
        body:JSON.stringify({
            "name":formnombre.value,
            "email":formemail.value,
            "ci":formci.value,
            "phone":formphone.value
        })
     })
     .then(response => response.json())
     .then( data =>{
        const nuevocliente = []
        nuevocliente.push(data)
        location.reload()
        tablacliente.show()

    
     })
    }
    if(opcion =='editar'){
        fetch(`${url}/${idform}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'      
            },
            body:JSON.stringify({
                "name":formnombre.value,
                "email":formemail.value,
                "ci":formci.value,
                "phone":formphone.value
            })
         })
         .then(response=>response())
         .then(response => location.reload())
    }
    modalcliente.hide()
})

