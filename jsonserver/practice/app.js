var courseAPI = 'http://localhost:3000/courses'



function start(){
    getCourses(renderCourses);
    /* 
    getCourses(function(courses) {
        renderCourses(courses);
    }); 
    Doan code tren gon cua cai nay, goi ham cua ham*/
    handleCreateForm();
}

start();

//function

function getCourses(callback){
    fetch(courseAPI)
    .then(function(respone)
    {
        return respone.json();
    })
    .then(callback);
}

function creataCourse(data){
    var options = {
        method: 'POST',
        header: {
            'Content-type':'application/json'
            },
        body: JSON.stringify(data)


    }
    fetch(courseAPI, options)
        .then(function(respone){
            respone.json();
        })
        .then(callback);
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        header: {
            'Content-type':'application/json'
            }

    }
    fetch(courseAPI + '/' + id, options)
        .then(function(respone){
            respone.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-' + id);
            if (courseItem) {
                courseItem.remove(); // cach xoa phan tu di ma khong can goi lai API, giup hieu nang cao hon
            }
        });
}

function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses')
    var htmls = courses.map(function(course){
        return ` 
            <li class ="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick = "handleDeleteCourse(${course.id})">Xoá</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('')
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function(){
        var name = document.querySelector('input[name = "name"]').Value;
        var description = document.querySelector('input[name = "description"]').Value;


        var formData = {
            name: name,
            description: description
        }
        creataCourse(formData, function() {
            getCourses(renderCourses);
        });
    }
}