document.querySelector('.postBtn').addEventListener('click', showAddPost)
document.querySelector('.cancel').addEventListener('click', showAddPost)

document.querySelector('.showSurgePost').addEventListener('click', showSurgePost)
document.querySelector('.cancelSurgePost').addEventListener('click', showSurgePost)

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
        document.querySelector('#title').focus()
        document.querySelector('nav').style.opacity = '100%'
    } else {
        document.querySelector('#postSection').classList.add('hide')
        document.querySelector('.postBtn').classList.remove('rotate')
        document.querySelector('nav').style.opacity = '90%'

    }
}

function showSurgePost() {
    if(document.querySelector('#surgeSection').classList.contains('hide')) {
        document.querySelector('#surgeSection').classList.remove('hide')
        document.querySelector('#amount').value = ''
        document.querySelector('#location').value = ''
        document.querySelector('#amount').focus()
    } else {
        document.querySelector('#surgeSection').classList.add('hide')
    }
}