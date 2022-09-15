document.querySelector('.menu').addEventListener('click', showSideBar)

function showSideBar() {
    document.querySelector('.menu').classList.toggle('opened')
    
    if(document.querySelector('#sidebarMenu').classList.contains('show')){
        document.querySelector('#sidebarMenu').classList.remove('show')
        document.querySelector('nav').classList.remove('noRadius')
        // document.querySelector('#dark').classList.remove('show')

    } else {
        document.querySelector('#sidebarMenu').classList.add('show')
        // document.querySelector('#dark').classList.add('show')
        document.querySelector('nav').classList.add('noRadius')
    }
}