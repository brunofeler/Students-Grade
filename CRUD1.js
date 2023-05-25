let form = document.getElementById("cadastro");
listarDados();

// definir array princial
form.addEventListener("submit", function (){
    let storage = (localStorage.MEDIAS) ? JSON.parse(localStorage.MEDIAS) : [];

    // pegar os dados do form
    let aluno = document.querySelector("#nome").value;
    let notas = document.querySelector("#notas").value;

    let mediaAluno = {
        
        "nome": aluno,
        "notas": notas
    }
    
    // adicionar informacoes no storage
    storage.push(mediaAluno);

    msgSuccess = "Cadastro efetuado com sucesso";

    // salvar no localstorage
    localStorage.setItem("MEDIAS", JSON.stringify(storage));

    alert(msgSuccess)

    // limpas os forms
    form.reset();
    listarDados();
    document.querySelector("button").value = "";

})
function listarDados(){
    let dados = JSON.parse(localStorage.getItem("MEDIAS"))
    let estrutura = "";

    console.log(dados);

    for (const key in dados) {

        let arrayNotas = dados[key].notas.split(",").map(n => parseFloat(n)) // transforma as notas em array

        let media = arrayNotas.reduce(function(total, nota){
            return total + nota
        },0) / arrayNotas.length

        // tabela 

        estrutura +=`
        <tr>
            <td>${dados[key].nome}</td>
            <td>${dados[key].notas}</td>
            <td>${media.toFixed(2)}</td>
            <td>${media > 7 ? "Aprovado" : "Reprovado"}</td>
            <td><a href="#" onclick="deleteItem(${key})"> Deletar </td>
        </tr>
        `;
    
    }
    document.querySelector("table tbody").innerHTML = estrutura;

}

//delete

function deleteItem(id) {
    let dados = (localStorage.MEDIAS) ? JSON.parse(localStorage.MEDIAS) : [];
    dados.splice(id, 1);
    if (dados.length > 0 ){
        localStorage.setItem("MEDIAS", JSON.stringify(dados));
    }else {
        localStorage.setItem("MEDIAS", "");
    }
    listarDados();

    return false
}

//controle de listagem
listarDados();
