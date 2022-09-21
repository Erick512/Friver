document.querySelector('.skillBtn').addEventListener('click', addItem)
document.querySelector('.nextDescription').addEventListener('click', showdescription)
document.querySelector('.nextContact').addEventListener('click', showContact)
document.querySelector('.nextSkills').addEventListener('click', showSkills)

document.querySelector('#imageUpload').addEventListener('change', (event) => {
    const [file] = document.querySelector('#imageUpload').files

    if(file) {
        document.querySelector('#selectedImage').src = URL.createObjectURL(file)
        document.querySelector('#selectedImage').classList.add('active')
    }
})

function addItem() {

    let item = document.querySelector('.skillInput').value
    let list = document.querySelector('.skillsList')

    if(item == '') {return}

    let newChild = document.createElement('i')
    newChild.innerText = item

    list.appendChild(newChild)

    document.querySelector('.skillInput').value = ""
}

function showSkills() {
    document.querySelector('.imageSection').classList.add('hide')
    document.querySelector('.skillsSection').classList.remove('hide')
}

function showdescription() {

    let skills = []

    let list = document.querySelector('.skillsList').children

    for(item of list) {
        skills.push(item.innerText)
    }

    document.querySelector('.skillInput').value = skills.join(',')
    document.querySelector('.skillsSection').classList.add('hide')
    document.querySelector('.descriptionSection').classList.remove('hide')
}

function showContact() {
    document.querySelector('.descriptionSection').classList.add('hide')
    document.querySelector('.contactSection').classList.remove('hide')
}