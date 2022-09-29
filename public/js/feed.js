document.querySelector('.postBtn').addEventListener('click', showAddPost)
document.querySelector('.cancel').addEventListener('click', showAddPost)

document.querySelector('#imageUpload').addEventListener('change', (event) => {
    const [file] = document.querySelector('#imageUpload').files

    if(file) {
        document.querySelector('#selectedImage').src = URL.createObjectURL(file)
        document.querySelector('#selectedImage').classList.add('active')
    }
})

function showAddPost() {

    if(document.querySelector('#postSection').classList.contains('hide')) {
        document.querySelector('.postBtn').classList.add('rotate')
        document.querySelector('#postSection').classList.remove('hide')
        document.querySelector('#title').value = ''
        document.querySelector('textarea').value = ''
        document.querySelector('nav').style.opacity = '100%'
    } else {
        document.querySelector('#postSection').classList.add('hide')
        document.querySelector('.postBtn').classList.remove('rotate')
        document.querySelector('nav').style.opacity = '90%'

    }
}
