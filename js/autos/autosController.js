const url = "http://localhost:4000"
//el orden es importante
const getAutosById = async (id) => {
    return await $.ajax({
        type: 'GET',
        url: url + "/autos/" + id
    }).done(res => res);
}

const getInfoAutos = async id =>{//details
    let autos = await getAutosById(id);
    document.getElementById('nombre_autos_info').value = autos.auto[0].nombre;
    document.getElementById('matricula_info').value = autos.auto[0].matricula;
    document.getElementById('anio_verificacion_info').value = autos.auto[0].anio_verificacion;
    document.getElementById('fecha_registro_info').value = autos.auto[0].fecha_registro;
    document.getElementById('fecha_actualizacion_info').value = autos.auto[0].fecha_actualizacion;
    document.getElementById('estado_info').value = autos.auto[0].estado;
    document.getElementById('id_marca_info').value = autos.auto[0].marca;
}

const getInfoUpdateAutos = async id =>{
    let autos = await getAutosById(id);
    document.getElementById("id_update_autos").value = id;
    document.getElementById('nombre_autos_update').value = autos.auto[0].nombre;
    document.getElementById('matricula_update').value = autos.auto[0].matricula;
    document.getElementById('anio_verificacion_update').value = autos.auto[0].anio_verificacion;
    document.getElementById('id_marca_update').value = autos.auto[0].marca;
}

const getIdDeleteAutos = async id =>{
    let autos = await getAutosById(id);
    document.getElementById("id_delete_autos").value = id;
}

const getAutos = async () => {
    await $.ajax({
        type: 'GET',
        url: url + '/autos'
    }).done(function (res) {
        let autos = res.listAutos;
        let content = "";
        $('#tableAutos > tbody').empty();
        if(res.listAutos.length>0){
            for (let i = 0; i < autos.length; i++) {
                content += `
                <tr>
                <th scope='row'>${i + 1}</th>
                <td>${autos[i].nombre}</td>
                <td>${autos[i].matricula}</td>
                <td>${autos[i].estado}</td>
                <td>${autos[i].marca}</td>
                <td>
                <button type='button' onclick="getInfoAutos(${autos[i].id});" class='btn btn-outline-info' data-bs-toggle='modal' data-bs-target='#detailsAutos' title="Detalles"><i class="fas fa-search"></i></button>
                <button type='button' onclick="getInfoUpdateAutos(${autos[i].id});" class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#updateAutos' title="Editar"><i class="far fa-edit"></i></button>
                <button type='button' onclick="getIdDeleteAutos(${autos[i].id});" class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#deleteAutos' title="Deshabilitar"><i class="far fa-trash-alt"></i></button>
                </td>
                </tr>
                `;
            }
        }else{
            content += `
            <tr>
            <td colspan=5>No se encontraron valores</td>
            </td>`
        }
        $("#tableAutos > tbody").html(content);
    });
}

const createAutos = () => {
    let nombre = document.getElementById('nombre_autos_register').value;
    let matricula = document.getElementById('matricula_register').value;
    let anio_verificacion = document.getElementById('anio_verificacion_register').value;
    let marca = document.getElementById('id_marca_register').value;

    $.ajax({
        type: 'POST',
        url: url + '/autos/create',
        data: {nombre, matricula, anio_verificacion, marca}
    }).done(function (res) {
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgRegisterAutos").html(content);
    })
}

const updateAutos = async ()=>{
    let id = document.getElementById("id_update_autos").value;
    let nombre = document.getElementById('nombre_autos_update').value;
    let matricula = document.getElementById('matricula_update').value;
    let anio_verificacion = document.getElementById('anio_verificacion_update').value;
    let marca = document.getElementById('id_marca_update').value;

    $.ajax({
        type:"POST",
        url: url + "/autos/update/" + id,
        data: {nombre, matricula, anio_verificacion, marca}
    }).done(function(res){
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgUpdateAutos").html(content);
    })
}

const deleteAutos = async () => {
    let id = document.getElementById("id_delete_autos").value;
    await $.ajax({
        type: 'POST',
        url: url + '/autos/delete/' + id
    }).done(res =>{
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgDeleteAutos").html(content);
    })
      
}
