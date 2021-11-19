
//el orden es importante
const getMarcaById = async (id) => {
    return await $.ajax({
        type: 'GET',
        url: url + "/marca/" + id
    }).done(res => res);
}

const getInfoMarca = async id =>{//details
    let marca = await getMarcaById(id);
    document.getElementById('nombre_marca_info').value = marca.marca[0].nombre;
}

const getInfoUpdateMarca = async id =>{
    let marca = await getMarcaById(id);
    document.getElementById("id_update_marca").value = id;
    document.getElementById('nombre_marca_update').value = marca.marca[0].nombre;
}

const getIdDeleteMarca = async id =>{
    let marca = await getMarcaById(id);
    document.getElementById("id_delete_marca").value = id;
}

const getMarcas = async () => {
    await $.ajax({
        type: 'GET',
        url: url + '/marca'
    }).done(function (res) {
        let marcas = res.listMarca;
        let content = "";
        $('#tableMarca > tbody').empty();
        if(res.listMarca.length>0){
            for (let i = 0; i < marcas.length; i++) {
                content += `
                <tr>
                <th scope='row'>${i + 1}</th>
                <td>${marcas[i].nombre}</td>
                <td>
                <button type='button' onclick="getInfoMarca(${marcas[i].id});" class='btn btn-outline-info' data-bs-toggle='modal' data-bs-target='#detailsMarca' title="Detalles"><i class="fas fa-search"></i></button>
                <button type='button' onclick="getInfoUpdateMarca(${marcas[i].id});" class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#updateMarca' title="Editar"><i class="far fa-edit"></i></button>
                <button type='button' onclick="getIdDeleteMarca(${marcas[i].id});" class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#deleteMarca' title="Deshabilitar"><i class="far fa-trash-alt"></i></button>
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
        $("#tableMarca > tbody").html(content);
    });
}

const createMarca = () => {
    let nombre = document.getElementById('nombre_marca_register').value;

    $.ajax({
        type: 'POST',
        url: url + '/marca/create',
        data: {nombre}
    }).done(function (res) {
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgRegisterMarca").html(content);
    })
}

const updateMarca = async ()=>{
    let id = document.getElementById("id_update_marca").value;
    let nombre = document.getElementById('nombre_marca_update').value;

    $.ajax({
        type:"POST",
        url: url + "/marca/update/" + id,
        data: {nombre}
    }).done(function(res){
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgUpdateMarca").html(content);
    })
}

const deleteMarca = async () => {
    let id = document.getElementById("id_delete_marca").value;
    await $.ajax({
        type: 'POST',
        url: url + '/marca/delete/' + id
    }).done(res =>{
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgDeleteMarca").html(content);
    })
      
}
