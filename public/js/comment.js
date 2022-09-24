document.querySelector('.commentBtn').addEventListener('click', showAddPost)
document.querySelector('.cancel').addEventListener('click', showAddPost)


function showAddPost() {
    console.log('clicked')

    if(document.querySelector('#addComment').classList.contains('hide')) {
        document.querySelector('#addComment').classList.remove('hide')
        document.querySelector('#commentInput').value = ''
        // document.querySelector('nav').style.position = 'fixed'
        document.querySelector('nav').style.opacity = '100%'
    } else {
        document.querySelector('#addComment').classList.add('hide')
        document.querySelector('nav').style.opacity = '90%'
        // document.querySelector('nav').style.position = 'relative'

    }
}