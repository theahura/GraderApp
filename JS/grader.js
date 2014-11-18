var ClassData = {};

//counter to add things to the class table
var add_class_counter = 0; 
//homework types counter
var add_assignment_counter = 0;

/*
    Function iterates over a given form and creates an object out of it;
    uses the .name in each html input to create the keys, and the value of
    the html input to create the value pairing. 
*/
$.fn.serializeObject = function()
{
    //to use, iterate over both assignment name and points with the same
    //index value

    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*
    Creates a copy of a div and places it somewhere in a list/table.
    @param: base; String id; used to determine what is being cloned 
    @param: start; String id; id of starting location of div
    @param: id; String; id to give new div
    @param: class_name; class to give new div
    @param: counter; counter to use to create unique IDs, placements
*/
function createCopy(base, start, id, class_name, name, counter)
{
    var $temp = $(base).clone(); 
    var new_id = id + counter; 

    $temp.attr("id", new_id);
    $temp.attr("class", class_name + " " + name);

    if(counter == 1)
    {
        $temp.insertAfter("div."+ start);
    }
    else
    {
        $temp.insertAfter("div." + class_name +":last");
    }

    return $temp; 
}


//add homework type button
$('#Add_Homework_Type').click(function(){
    $('#Add_Homework_Type').animate({"padding-top":"150px"}, 600, function(){
           
            add_assignment_counter++;

            var temp = createCopy(".add-homework-container-base",
            "homework-starting-placeholder", "Homework_Container_",
            "add-homework-container", "", add_assignment_counter);

            temp.fadeIn(800);

            $('#Add_Homework_Type').css({"padding-top":"0px"});
    });
});


/*
    Submits the form for a new class object
    Serializes the form into an object; stores that object into ClassData
*/
document.getElementById("Submit-Class").onclick = function()
{
    add_class_counter++;
    var form = $('form').serializeObject();  
  
    if(!ClassData[form.ClassName])
    {
        ClassData[form.ClassName] = form; 
        var temp = createCopy(".class-table-container-base",
        "class-data-starting-placeholder", "Class_Container_",
        "class-table-container", form.ClassName, add_class_counter);
         
         temp.find("div").html(form.ClassName);

         temp.fadeIn(800);
    }

    add_assignment_counter = 0;
};

/*
    Click event on dynamically generated object
    Creates editing field for a given clasis
*/
$("body").on("click", ".class-table-container", function(){
    
    var classList = $(this).attr('class').split(/\s+/);
    for (var i = 0; i < classList.length; i++) 
    {
       if (classList[i] !== 'class-table-container') 
       {
           generateClassEditForm(classList[i]);
           break;
       }
    }     

    $('#classes-panel').animate({"left":"-25%"}, 600); 
    $('#edit-classes-panel').animate({"left":"37.5%"}, 600); 
});

var temp_counter = 1;

function generateClassEditForm(key)
{      
     var temp_div = createCopy(".edit-class-container-base",
     "edit-homework-starting-placeholder", "Edit_Container_",
     "edit-class-container", "", temp_counter); 

     temp_div.find(".text").html(ClassData[key].ClassName);

     temp_div.fadeIn(800);
    
     if(ClassData[key].AssignmentName)
     {
         for(i = 0; i < ClassData[key].AssignmentName.length; i++)
         {
             temp_counter++;
             var temp_div_assignments = createCopy(".edit-class-container-base",
             "edit-homework-starting-placeholder", "Edit_Container_",
             "edit-class-container", "", temp_counter); 

             temp_div_assignments.find(".text").html(ClassData[key].AssignmentName[i]);
             temp_div_assignments.fadeIn(800);
         }
     }

     temp_counter = 0;
}
