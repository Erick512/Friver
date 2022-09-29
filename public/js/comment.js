document.querySelector('.commentBtn').addEventListener('click', showAddPost)
document.querySelector('.cancel').addEventListener('click', showAddPost)
document.querySelector('.postImage').addEventListener('click', showImage)
document.querySelector('.enlargedImage').addEventListener('click', showImage)

let replyBtns = document.querySelectorAll('.replyToComment')

function showAddPost() {

    if(document.querySelector('#addComment').classList.contains('hide')) {
        document.querySelector('#addComment').classList.remove('hide')
        document.querySelector('#commentInput').value = ''
        document.querySelector('nav').style.opacity = '100%'
    } else {
        document.querySelector('#addComment').classList.add('hide')
        document.querySelector('nav').style.opacity = '90%'

    }
}

function showImage() {

    let src = document.querySelector('.postImage').src
    let div = document.querySelector('.enlargedImage')

    div.style.background = `rgb(0, 0, 0, .8) url('${src}') no-repeat`
    div.style.position = 'fixed'
    div.style.width = '100%'
    div.style.height = '100%'
    div.style.backgroundSize = 'contain'
    div.style.backgroundPosition = 'center'
    div.style.zIndex = '99'


    if(document.querySelector('.enlargedImage').classList.contains('hide')) {
        document.querySelector('.enlargedImage').classList.remove('hide')
    } else {
        document.querySelector('.enlargedImage').classList.add('hide')
    }
    
}