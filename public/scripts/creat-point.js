function populateUfs(){
    const ufSelect = document
    .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()})
    .then( states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}


populateUfs()

function getCities(event){
    const citySelect = document
    .querySelector("select[name=city]")
    const stateInput = document
    .querySelector("input[name=state]")

    const ufvalue = event.target.value

    const indexOfSelectdState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectdState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then((res) => {return res.json()})
    .then( cities => {
        
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
   .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

//itens de coleta
//pefartodod os li

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma class co java script
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)



    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId //isso sera true ou false
        return itemFound
    })
    
    //se ja estiver selecionado
    if(alreadySelected >= 0){
        //tira da selecao
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item !=itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else {
        //se nao estiver selecionado
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)
    
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}