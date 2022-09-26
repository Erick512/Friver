document.querySelector('.commentBtn').addEventListener('click', showAddPost)
document.querySelector('.cancel').addEventListener('click', showAddPost)
document.querySelector('.cancelReply').addEventListener('click', showReply)
document.querySelector('.replyToComment').addEventListener('click', showReply)


function showAddPost() {

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

function showReply() {

    if(document.querySelector('#replyToComment').classList.contains('hide')) {
        document.querySelector('#replyToComment').classList.remove('hide')
        document.querySelector('#commentInput').value = ''
        // document.querySelector('nav').style.position = 'fixed'
        document.querySelector('nav').style.opacity = '100%'
    } else {
        document.querySelector('#replyToComment').classList.add('hide')
        document.querySelector('nav').style.opacity = '90%'
        // document.querySelector('nav').style.position = 'relative'

    }
}